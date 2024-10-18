<template>
    <div
        class="installment-text"
        :class="{ '-loading': loading }"
        v-html="formattedInstallmentText()"></div>
</template>

<script>
import BaseInstallments from '@/components/product/BaseInstallments.vue';
import debounce from '~vue-debounce';
import _ from '~lodash';

export default  {
    name: 'InstallmentsText',

    extends: BaseInstallments,

    props: {
        price: {
            type: Number,
            default: null,
        },
    },

    computed: {
        isSku() {
            // if there is product.id, than we should not look into the validSku.
            // validSku is used only for the main product.
            return !this.product.id && !_.isNil(this.validSku);
        },
    },

    mounted() {
        if (this.validProduct) {
            if (this.showAllInstallments && this.validProduct.has_variations) {
                this.$watch('validSku', () => this.loadInstallments());
            }
        }

        if (this.isInViewport(this.$refs.installmentText) || !this.installments.installments) {
            this.loadInstallments();
        } else {
            this.lazyLoadInstallment();
        }
    },

    methods: {
        async loadInstallments(selectedCardAlias) {
            try {
                this.installments = await this.handleInstallments(selectedCardAlias);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },

        lazyLoadInstallment() {
            document.addEventListener(
                'scroll',
                debounce(() => {
                    if (!this.lazyLoaded && this.isInViewport(this.$refs.installmentText)) {
                        this.lazyLoaded = true;
                        this.loadInstallments();
                    }
                }, 40),
                { passive: true },
            );
        },

        formattedInstallmentText() {
            if (!this.installments.installments || !this.installments.installments.length) {
                return '_';
            }

            const lastInstallment = this.installments.installments[
            this.installments.installments.length - 1
                ];
            const formattedValue = lastInstallment.installment_value_formated
                || this.$formatMoney(lastInstallment.installment_value);
            let text = `${lastInstallment.installment}x de <span class="price">${formattedValue}</span>`;

            if (lastInstallment.text.includes('sem juros')) {
                text += ' <span class="-free-tax">sem juros</span>';
            }

            return text;
        },

        isInViewport(element) {
            if (!element) {
                return true;
            }

            const rect = element.getBoundingClientRect();
            const height = (window.innerHeight || document.documentElement.clientHeight) + 30;

            return rect.top >= 0 && rect.bottom <= height;
        },
    },
}
</script>
