<template>
    <Modal
        ref="baseModal"
        name="confirm-add-to-cart"
        :title="modalTitle"
        @close="resetComponent"
    >
        <template v-if="product && product.skus">
            <div class="pl-sm-40 pl-xs-24 mb-38">
                <div class="product">
                    <CustomImage
                        :key="imageUrl"
                        class="-loading"
                        :src="imageUrl"
                        :alt="product.name"
                        :thumbor="{ resize: '60x60' }"
                        width="60"
                        height="60"
                    />
                    <div class="text">
                        <p
                            class="name ellipsis-multiline"
                            :class="ellipsisClass"
                        >
                            {{ product.name }}
                        </p>

                        <ul v-if="selectedSku && selectedSku.variations.length">
                            <li
                                v-for="variation in selectedSku.variations"
                                :key="variation.name"
                            >
                                {{ variation.name }}:
                                {{ variation.value }}
                            </li>
                        </ul>

                        <div class="product-prices mt-8">
                            <span
                                v-if="skuPriceDiscount"
                                class="product-old-price old-price mr-6"
                                v-text="skuPriceSaleFormated"
                            />

                            <span class="product-actual-price price">
                                {{ skuPriceFormated }}
                                <span class="payment-type"> {{ price[selectedPrice].text }} </span>
                            </span>

                            <Installments
                                :key="JSON.stringify(validSku)"
                                :product="validSku"
                            />
                        </div>
                    </div>
                </div>

                <div
                    v-if="!firstValidSku"
                    class="alert -yellow"
                >
                    Produto indisponível.
                </div>

                <template v-else>
                    <SelectSku
                        v-show="product.has_variations && !showCustomization"
                        ref="selectSku"
                        :product="product"
                        @update="setSelectedSku($event)"
                    />

                    <template v-if="showCustomization">
                        <CustomizationContent
                            ref="customizationContent"
                            :sku="selectedSku"
                            @change="setCustomizations"
                        />
                    </template>

                    <template v-else>
                        <div class="holder-quantity mt-16">
                            <label for="product-quantity">Quantidade</label>
                            <QuantitySelector
                                id="product-quantity"
                                v-model="quantity"
                            />
                        </div>
                    </template>
                </template>
            </div>

            <template slot="footer">
                <hr>

                <div class="control-button pr-xs-14">
                    <button
                        class="btn btn-modal-secundary"
                        @click="handleSecondaryButton"
                    >
                        Voltar
                    </button>
                    <LoaderButton
                        class="btn btn-modal-primary"
                        :sending="sending"
                        :disabled="!canAddToCart"
                        @click="handlePrimaryButton"
                    >
                        {{ primaryButtonText }}
                    </LoaderButton>
                </div>
            </template>
        </template>
        <template v-else>
            <div class="pl-sm-40 pr-sm-40 pl-xs-24 pr-xs-24 mb-38">
                <div
                    class="-loading"
                    style="height: 70px"
                />
                <div
                    class="-loading mt-30"
                    style="height: 70px"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
import _ from '~/lodash';
import { mapActions, mapGetters } from '~/vuex';
import trackingByApi from '@/mixins/tracking/api';
import { createPriceObjects } from '@/mixins/helpers';

export default {
    name: 'ModalConfirmAddToCart',

    mixins: [trackingByApi],

    props: {
        product: {
            type: Object,
            required: true,
            default: () => ({}),
        },

        selectedPrice: {
            type: String,
            default: 'promotional',
        },
    },

    data() {
        return {
            error: false,
            quantity: 1,
            customizationValues: {},
            sending: false,
            showCustomization: false,
            selectedSku: undefined,
        };
    },

    computed: {
        ...mapGetters('environment', ['recomm']),

        ...mapGetters('preview', ['isIframe']),

        modalTitle() {
            if (this.showCustomization && this.customizations.length) {
                return 'Produto com personalização';
            }

            return 'Adicionar ao carrinho';
        },

        skuPriceDiscount() {
            if (this.selectedSku) return (this.selectedSku.prices.data.price_discount);

            return (this.product.prices.data.price_discount);
        },

        skuPriceSaleFormated() {
            if (this.selectedSku) return (this.selectedSku.prices.data.price_sale_formated);

            return (this.product.prices.data.price_sale_formated);
        },

        price() {
            return createPriceObjects({ basePath: 'prices.data.', pricePath: 'price_formatted' });
        },

        skuPriceFormated() {
            if (this.selectedSku) {
                return `${_.get(
                    this.selectedSku,
                    this.price[this.selectedPrice].path,
                    this.selectedSku.prices.data.price_formated,
                )}`;
            }

            return `${_.get(
                this.product,
                this.price[this.selectedPrice].path,
                this.product.prices.data.price_formated,
            )}`;
        },

        imageUrl() {
            if (this.selectedSku) return _.get(this.selectedSku, 'images.data.0.url', null);

            return _.get(this.product, 'images.data.0.url', null);
        },

        primaryButtonText() {
            if (!this.showCustomization && this.customizations.length) {
                return 'Próximo';
            }

            if (this.showCustomization && this.customizations.length > 1) {
                return 'Salvar';
            }

            return 'Adicionar';
        },

        customizations() {
            return _.get(this.selectedSku, 'customizations.data', []);
        },

        validSku() {
            return this.selectedSku || this.firstValidSku || this.firstSku;
        },

        firstValidSku() {
            return _.get(this.product, 'skus.data', []).find(sku => !sku.blocked_sale);
        },

        firstSku() {
            return _.get(this.product, 'skus.data', []);
        },

        ellipsisClass() {
            if (!this.selectedSku) {
                return 'l3';
            }

            return {
                l3: !this.selectedSku.variations.length,
                l2: this.selectedSku.variations.length === 1,
                l1: this.selectedSku.variations.length >= 2,
            };
        },

        canAddToCart() {
            if (!this.firstValidSku) {
                return false;
            }

            return true;
        },
    },

    watch: {
        product() {
            this.bootSelectedSku();
            this.showCustomizationContent();
        },
    },

    methods: {
        ...mapActions('cart', ['addProductsToCart']),

        bootSelectedSku() {
            if (this.product.has_variations) {
                return;
            }

            this.setSelectedSku(this.firstValidSku);
        },

        setSelectedSku(sku) {
            this.selectedSku = sku;
        },

        async handlePrimaryButton() {
            if (!this.showCustomization && this.customizations.length) {
                if (this.$refs.selectSku.verifySelect()) {
                    return;
                }

                this.showCustomization = true;
                return;
            }

            if (this.isIframe) {
                return;
            }

            try {
                await this.addToCart();
            } catch (error) {
                console.error(error);
            }
        },

        handleSecondaryButton() {
            if (this.showCustomization && this.product.has_variations) {
                this.showCustomization = false;
                return;
            }

            this.closeModal();
        },

        showModal() {
            this.$refs.baseModal.showModal();
            this.bootSelectedSku();
            this.showCustomizationContent();
        },

        closeModal() {
            this.$refs.baseModal.closeModal();
        },

        setCustomizations(payload) {
            this.customizationValues = payload;
        },

        resetComponent() {
            if (this.product.has_variations) {
                this.$refs.selectSku.bootSelected();
            }

            this.setSelectedSku(undefined);
            this.quantity = 1;
            this.customizationValues = {};
            this.showCustomization = false;
        },

        customizationsAreValid() {
            if (!this.$refs.customizationContent) {
                return true;
            }

            const invalidCustomizations = this.customizations
                .filter(customization => !this.$refs.customizationContent
                    .checkValues(customization));

            return !invalidCustomizations.length;
        },

        showCustomizationContent() {
            if (!this.product.has_variations && this.customizations.length) {
                this.showCustomization = true;
                return;
            }

            this.showCustomization = false;
        },

        async addToCart() {
            if (!this.selectedSku) {
                this.$refs.selectSku.verifySelect();
                return;
            }

            if (!this.customizationsAreValid()) {
                return;
            }

            const customization = {};
            const validValues = _.omitBy(this.customizationValues, _.isEmpty);

            // if all customizations aren't required,
            // empty and the sku isn't allowed to be sold without a customization,
            // send them filled with empty values
            if (
                this.customizations.every(_customization => !_customization.required)
                && _.isEmpty(validValues)
                && !this.selectedSku.allow_sell_without_customization
            ) {
                customization[this.selectedSku.id] = this.customizationValues;
            }

            if (!_.isEmpty(validValues)) {
                customization[this.selectedSku.id] = validValues;
            }

            let has_recomm = false;
            const item_metadata = [];

            if (this.recomm) {
                has_recomm = true;
                item_metadata.push({ recomm_id: this.recomm });
            }

            this.sending = true;

            try {
                await this.addProductsToCart({
                    skus: this.selectedSku,
                    quantities: this.quantity,
                    products: this.product,
                    value: this.selectedSku.prices.data.price,
                    showModal: true,
                    extras: { has_recomm, customization, item_metadata },
                });

                this.handleTrackApi('purchase-intended', {
                    location: 'quick-buy-button-modal',
                    product_quantity_updated: this.quantity,
                    items: this.product.name,
                    amount: this.quantity * this.selectedSku.prices.data.price,
                });
            } catch (error) {
                this.error = error;
                console.error(error);
            } finally {
                this.sending = false;
                this.closeModal();
                this.resetComponent();
            }
        },
    },
};
</script>
