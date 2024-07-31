<template>
    <div class="floating-button">
        <transition name="fade">
            <div
                v-if="sku && showFloatingButton"
                class="floating-button-container"
            >
                <div class="prices-container">
                    <p :class="originalPriceClass">
                        {{ sku.prices.data.price_sale_formated }}
                    </p>

                    <p
                        v-if="sku.prices.data.has_promotion"
                        class="original-price"
                    >
                        {{ sku.prices.data.price_formated }}
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
            <loader
                v-else
                :height="50"
                :margin="13"
            />
        </transition>
    </div>
</template>

<script>
import _last from 'lodash/last';
import BaseInstallments from '@/components/product/BaseInstallments';
import buttonsMixin from '../../mixins/buttons.js';
import LoaderButton from '@/components/generic/LoaderButton';

export default {
    name: 'FloatingButton',

    components: {
        LoaderButton,
    },

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

    computed: {
        sku() {
            return this.selectedSku || this.firstValidSku;
        },

        buyButtonText() {
            return this.quantity > 1 ? `Comprar (${this.quantity})` : 'Comprar';
        },

        originalPriceClass() {
            const cssClass = this.sku.prices.data.has_promotion
                ? 'original-price-discount'
                : 'original-price';

            return cssClass;
        },

        lastInstallment() {
            return _last(this.installments.installments);
        },

        showFloatingButton() {
            return !this.buttons.length;
        },
    },

    async created() {
        this.scroll();

        this.installments = await this.handleInstallments();
    },
};
</script>
