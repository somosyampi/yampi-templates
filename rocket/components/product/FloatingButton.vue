<template>
    <div class="floating-button">
        <Transition name="fade">
            <div
                v-if="(sku && !sku.blocked_sale) && showFloatingButton"
                class="floating-button-container"
            >
                <div class="prices-container">
                    <p :class="originalPriceClass">
                        {{ sku.prices.data.price_sale_formated }}
                    </p>

                    <p
                        v-if="sku.prices.data.price_discount > 0"
                        class="original-price"
                    >
                        {{ sku.prices.data.price_discount_formated }}
                    </p>

                    <div
                        v-if="lastInstallment"
                        class="installments"
                    >
                        <p>
                            {{ lastInstallment.installment }}x de
                            <span class="installment-price">
                                {{ lastInstallment.installment_value | formatMoney }}
                            </span>
                            <span v-if="lastInstallment.tax_value === 0">
                                sem juros
                            </span>
                        </p>
                    </div>
                </div>

                <div class="button-container">
                    <LoaderButton
                        class="btn btn-primary"
                        :sending="loadingButton"
                        :disabled="disabled"
                        @click="$emit('click')"
                    >
                        {{ buyButtonText }}
                    </LoaderButton>
                </div>
            </div>
            <div
                v-else-if="(sku && sku.blocked_sale) && showFloatingButton"
                class="pl-22 pr-22 pt-16 pb-16 floating-button-container"
            >
                <button
                    class="btn-stock-notifications btn btn-secundary -block uppercase flex -hcenter -vcenter"
                    @click="$emit('open-stock-notifications-modal')"
                >
                    <IconEmail class="fill-current" />
                    Avise-me quando chegar
                </button>
            </div>
        </Transition>
    </div>
</template>

<script>
import _ from '~/lodash';
import BaseInstallments from '@/components/product/installments/BaseInstallments.vue';
import buttonsMixin from '@/mixins/buttons';

export default {
    name: 'FloatingButton',

    extends: BaseInstallments,

    mixins: [buttonsMixin],

    props: {
        quantity: {
            type: Number,
            default: 1,
        },

        loadingButton: {
            type: Boolean,
            required: true,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            showFloatingButton: false,
        };
    },

    computed: {
        sku() {
            return this.selectedSku || this.firstValidSku;
        },

        buyButtonText() {
            return this.quantity > 1 ? `Comprar (${this.quantity})` : 'Comprar';
        },

        originalPriceClass() {
            return this.sku.prices.data.has_promotion || this.sku.prices.data.price_discount > 0
                ? 'original-price-discount'
                : 'original-price';
        },

        lastInstallment() {
            return _.last(this.installments.installments);
        },
    },

    async created() {
        this.scroll();

        this.installments = await this.handleInstallments();

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                this.showFloatingButton = !entry.isIntersecting;
            });
        }, { threshold: 0.4 });

        const buttonElement = document.querySelectorAll('.main-product-buy-button-holder, .btn-stock-notifications');

        buttonElement.forEach(element => {
            observer.observe(element);
        });
    },
};
</script>
