<template>
    <Modal
        ref="baseModal"
        :name="`ProductCustomization-${comboId}`"
        :title="`${$tc('common.count-product', productsForCustomization.length)} para personalizar`"
        :scrollable="false"
    >
        <Stepper
            v-if="productsForCustomization.length > 1"
            :items="productsForCustomization"
            :active="active"
            class="pl-40 pr-40 pl-xs-22 pr-xs-22 mt-30"
            @click="handleActive"
        />
        <div class="buy-together-modal-form mt-38">
            <div
                v-if="productsForCustomization.length"
                class="pl-40 pr-40 pl-xs-22 pr-xs-22 mb-38"
            >
                <div
                    v-for="product in productsForCustomization"
                    :key="product.id"
                >
                    <BuyTogetherCustomizationContent
                        v-if="currentProductId === product.id"
                        :ref="`CustomizationContent-${product.id}`"
                        :sku="product"
                        :customized-products="customizedProducts"
                    />
                </div>
            </div>
        </div>
        <hr>
        <div class="control-button">
            <button
                class="btn btn-modal-secundary"
                @click="handleSecundaryButton"
            >
                Voltar
            </button>
            <button
                class="btn btn-modal-primary"
                @click="handlePrimaryButton"
            >
                {{ primaryButtonText }}
            </button>
        </div>
    </Modal>
</template>

<script>
export default {
    name: 'ModalBuyTogetherCustomization',

    props: {
        productsForCustomization: {
            type: Array,
            required: true,
        },

        customizedProducts: {
            type: Object,
            required: true,
        },

        comboId: {
            type: [String, Number],
            required: true,
        },
    },

    data() {
        return {
            active: 0,
            allProductsCustomizations: {},
        };
    },

    computed: {
        isFirstProductActive() {
            return this.active === 0;
        },

        isLastProductActive() {
            return this.active + 1 === this.productsForCustomization.length;
        },

        primaryButtonText() {
            if (this.isLastProductActive) {
                return 'Salvar';
            }

            return 'Próximo';
        },

        currentProductRef() {
            return this.$refs[
                `CustomizationContent-${this.productsForCustomization[this.active].id}`
            ][0];
        },

        currentProductId() {
            return this.productsForCustomization[this.active].id;
        },
    },

    methods: {
        handleModal() {
            this.$refs.baseModal.handleModal();
        },

        handleActive(activeNum) {
            this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations();

            if (!this.currentProductRef.$refs.customizationContent.hasErrors) {
                this.$emit('addSkuCustomization', {
                    [this.currentProductRef.sku.id]: {
                        ...this.currentProductRef.$refs.customizationContent.values,
                        isPersonalized: this.currentProductRef.skuCustomized,
                    },
                });

                this.active = activeNum;
            }
        },

        handlePrimaryButton() {
            this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations();

            if (this.currentProductRef.$refs.customizationContent.hasErrors) return;

            this.$emit('addSkuCustomization', {
                [this.currentProductRef.sku.id]: {
                    isPersonalized: this.currentProductRef.$refs.customizationContent.skuCustomized,
                    isMandatory: !this.currentProductRef.sku.allow_sell_without_customization,
                    ...this.currentProductRef.$refs.customizationContent.values,
                },
            });

            if (this.isLastProductActive) {
                this.$emit('save');
                this.handleModal();
                this.active = 0;
            } else {
                this.active++;
            }
        },

        handleSecundaryButton() {
            if (this.active > 0) {
                this.active--;
                return;
            }

            if (this.isFirstProductActive) {
                this.$emit('resetCustomizations');
                this.handleModal();
            }
        },
    },
};
</script>
