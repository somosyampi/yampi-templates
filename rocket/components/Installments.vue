<template>
    <div>
        <template v-if="installments.installments">
            <template v-if="showAllInstallments">
                <div
                    class="show-installments link-alike"
                    :class="{ '-loading': loading }"
                    @click="showInstallmentsModal()"
                >
                    Ver opções de parcelamento
                </div>
            </template>
        </template>

        <modal-installments
            v-if="showAllInstallments"
            ref="modalInstallments"
            :product="validSku"
        />
    </div>
</template>

<script>
import _ from '~lodash';
import { debounce } from '~vue-debounce';
import BaseInstallments from '@/components/product/BaseInstallments.vue';

export default {
    name: 'Installments',

    extends: BaseInstallments,

    props: {
        loaderHeight: {
            type: Number,
            default: null,
        },

        defaultInstallments: {
            type: Object,
            default: undefined,
        },

        showAllInstallments: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        lazyLoaded: false,
    }),

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

        showInstallmentsModal() {
            this.$refs.modalInstallments.showModal();
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
