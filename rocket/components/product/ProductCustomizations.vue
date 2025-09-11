<template>
    <div class="product-customizations">
        <SelectSku
            v-if="!validProduct.simple"
            ref="selectSku"
            :variations-style="variationsStyle"
            :show-error-message="false"
            @update="handleSelectSkuUpdate"
        />

        <SkuCustomizations
            v-if="selectedSku && showBuyButton"
            ref="skuCustomizations"
            :sku="selectedSku"
            @change="setCustomizations($event)"
        />

        <div
            v-if="showUnavailableMessage"
            class="main-product-unavailable alert -yellow"
        >
            Produto indisponível.
        </div>

        <template v-if="showBuyButton">
            <div
                class="main-product-buy-button-holder flex"
            >
                <QuantitySelector
                    v-if="showQuantitySelector"
                    v-model="quantity"
                    :disabled="!canAddToCart"
                />

                <LoaderButton
                    class="btn btn-primary"
                    :title="buyButtonText"
                    :sending="loading"
                    :disabled="!canAddToCart"
                    :listen-position="true"
                    @click="addToCart()"
                />

                <p
                    v-if="showErrorMessage"
                    class="helper-text -error"
                >
                    Selecione uma opção para comprar
                </p>
            </div>
        </template>

        <button
            v-if="!showBuyButton"
            class="btn-stock-notifications btn btn-secundary -block flex -hcenter -vcenter mt-23"
            @click="openStockNotificationsModal"
        >
            <IconEmail class="fill-current mr-3" />
            Avise-me quando chegar
        </button>

        <Cashback
            v-if="hasCashbackValid"
            class="mt-21 mb-21"
            :percent-amount="validCashback.percent_amount"
        />

        <InventoryCountdown v-if="firstValidSku && showInventoryCountdown" />

        <Zipcode
            v-if="showShippingForm"
            :quantity="quantity"
            :disabled="!firstValidSku"
        />

        <FloatingButton
            v-if="showMobileFloatingButton"
            :quantity="quantity"
            :loading-button="loading"
            :disabled="!canAddToCart"
            @click="addToCart('floating-button')"
            @open-stock-notifications-modal="openStockNotificationsModal"
        />

        <ModalStockNotifications
            v-if="selectedSku || validProduct.simple"
            ref="stockNotificationsModal"
            :sku="selectedSku || firstSku[0]"
            @success="$refs.stockNotificationsSuccessModal.showModal()"
        />

        <ModalStockNotificationsSuccess
            ref="stockNotificationsSuccessModal"
        />
    </div>
</template>

<script>
import { mapActions } from '~/vuex';
import _ from '~/lodash';
import productMixin from '@/mixins/product';
import cashbackMixin from '@/mixins/cashback';
import trackingByApi from '@/mixins/tracking/api';
import trackingBySDK from '@/mixins/tracking/sdk';

export default {
    name: 'ProductCustomizations',

    mixins: [
        productMixin,
        cashbackMixin,
        trackingByApi,
        trackingBySDK,
    ],

    props: {
        buyButtonText: {
            type: String,
            default: 'Comprar',
        },

        showQuantitySelector: {
            type: Boolean,
            default: false,
        },

        showInventoryCountdown: {
            type: Boolean,
            default: false,
        },

        showShippingForm: {
            type: Boolean,
            default: false,
        },

        showModalAfterPurchase: {
            type: Boolean,
            default: false,
        },

        showMobileFloatingButton: {
            type: Boolean,
            default: false,
        },

        cartType: {
            type: String,
            default: 'suspended',
        },

        variationsStyle: {
            type: String,
            default: 'list',
        },

        cashbacks: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        quantity: 1,
        loading: false,
        customizationValues: {},
        customizationHasErrors: false,
        showErrorMessage: false,
    }),

    computed: {
        canAddToCart() {
            if (!this.firstValidSku) {
                return false;
            }

            return true;
        },

        customizations() {
            return _.get(this.selectedSku, 'customizations.data', []);
        },

        areCustomizationsValid() {
            if (!this.selectedSku || this.customizations.length === 0) {
                return true;
            }

            if (this.selectedSku.allow_sell_without_customization) {
                return this.customizations
                    .every(customization => _.isEmpty(this.customizationValues[customization.id]));
            }

            return this.customizations.every(customization => {
                if (!customization.required) {
                    return true;
                }

                return !_.isEmpty(this.customizationValues[customization.id]);
            });
        },

        validCashback() {
            const {
                price_sale: salePrice,
                price_discount: discountPrice,
            } = this.validSku;

            let productPrice = salePrice;

            if (discountPrice > 0) {
                productPrice = discountPrice;
            }

            return this.getValidCashback(this.cashbacks, productPrice);
        },

        hasCashbackValid() {
            if (_.isEmpty(this.validCashback)) {
                return false;
            }

            return this.validCashback.percent_amount > 0;
        },

        showBuyButton() {
            if (this.selectedSku && this.selectedSku.blocked_sale) {
                return false;
            }

            if (this.validProduct.simple && this.validProduct.blocked_sale) {
                return false;
            }

            return true;
        },

        showUnavailableMessage() {
            return !this.firstValidSku || (this.selectedSku && this.selectedSku.blocked_sale);
        },
    },

    mounted() {
        this.bootSelectedSku();
        this.viewItem();
    },

    methods: {
        ...mapActions('cart', ['addProductsToCart']),

        ...mapActions('product', ['trackViewItem']),

        viewItem() {
            this.trackViewItem({
                skus: this.firstValidSku,
                products: this.validProduct,
                value: this.firstValidSku.prices.data.price * this.quantity,
                quantities: this.quantity,
            });
        },

        bootSelectedSku() {
            if (this.validProduct.has_variations) {
                return;
            }

            this.setSelectedSku(this.firstValidSku);
        },

        setCustomizations(payload) {
            this.customizationValues = payload;
        },

        handleSelectSkuUpdate(sku) {
            this.showErrorMessage = false;
            this.setSelectedSku(sku);
        },

        async addToCart(locationTrack = 'main-product-buy-button') {
            this.showErrorMessage = false;

            if (!this.selectedSku) {
                this.$refs.selectSku.verifySelect();
                this.showErrorMessage = true;
                return;
            }

            if (
                !this.$refs.skuCustomizations.checkValues(
                    this.$refs.skuCustomizations.values,
                )
            ) {
                return;
            }

            this.loading = true;

            const customization = {};
            const validValues = _.omitBy(this.customizationValues, _.isEmpty);

            // if all customizations aren't required, ]
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
            const { recomm_id } = window.Yampi.mago_config;
            const item_metadata = [];

            if (recomm_id) {
                has_recomm = true;
                item_metadata.push({ recomm_id });
            }

            await this.addProductsToCart({
                skus: this.selectedSku,
                quantities: this.quantity,
                products: this.validProduct,
                value: this.selectedSku.prices.data.price * this.quantity,
                showModal: this.showModalAfterPurchase,
                cartType: this.cartType,
                extras: { has_recomm, customization, item_metadata },
            });

            const themeParams = window.themeConfig.theme.params;

            this.handleTrackApi('purchase-intended', {
                location: locationTrack,
                quick_buy_button_enabled: themeParams.show_add_to_cart_button,
                product_quantity_updated: this.quantity,
                items: this.validProduct.name,
                amount: this.quantity * this.selectedSku.prices.data.price,
            });

            this.loading = false;
        },

        openStockNotificationsModal() {
            this.handleTrackSDK('notify_when_available_subscribed_intended');
            if (this.$refs.stockNotificationsModal) {
                this.$refs.stockNotificationsModal.showModal();
            }
        },
    },
};
</script>
