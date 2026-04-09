<template>
    <LazyVisibility class="installments-text">
        <div
            v-if="shouldShowInstallments"
            class="installment-text"
            v-html="installmentText"
        />

        <div
            v-else
            class="installment-text"
            :class="{ '-loading': loading }"
            v-html="formattedInstallmentText()"
        />
    </LazyVisibility>
</template>

<script>
import debounce from '~/vue-debounce';
import _ from '~/lodash';
import { mapGetters } from '~/vuex';
import BaseInstallments from '@/components/product/installments/BaseInstallments.vue';

export default {
    name: 'InstallmentsText',

    extends: BaseInstallments,

    props: {
        product: {
            type: Object,
            required: true,
        },

        productPrices: {
            type: Object,
            default: null,
        },
    },

    computed: {
        ...mapGetters('merchant', [
            'storeModules',
            'defaultCard',
        ]),

        isSku() {
            // if there is product.id, than we should not look into the validSku.
            // validSku is used only for the main product.
            return !this.product.id && !_.isNil(this.validSku);
        },

        installmentsData() {
            return this.productPrices?.installments_data;
        },

        shouldShowInstallments() {
            return !!this.installmentsData && !!this.defaultCard;
        },

        installmentText() {
            if (!this.installmentsData?.installments?.length) {
                return ' ';
            }

            const lastInstallment = this.installmentsData.installments[
                this.installmentsData.installments.length - 1
            ];

            return lastInstallment.text.replace('*', '').trim();
        },
    },

    mounted() {
        if (this.storeModules.new_search) {
            return;
        }

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
                if (this.installmentsData || this.loading) {
                    return;
                }

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
                return ' ';
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
};
</script>
