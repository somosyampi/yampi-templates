<template>
    <div class="floating-button">
        <Transition name="fade">
            <div
                v-if="(sku && !sku.blocked_sale) && showFloatingButton"
                class="floating-button-container"
            >
                <div class="prices-container">
                    <p
                        v-if="price.has_promotion"
                        class="original-price-discount"
                    >
                        {{ price.price_sale_formated }}
                    </p>

                    <p class="original-price">
                        {{ price.price_formated }}
                    </p>

                    <div
                        v-if="price.installments_data"
                        class="installments"
                    >
                        <p v-text="price.installments_data.text" />
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

        price: {
            type: Object,
            required: true,
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

    },

    async created() {
        this.scroll();

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
