<template>
    <div class="product-customizations">
        <template v-if="firstValidSku">
            <SelectSku
                v-if="!validProduct.simple"
                ref="selectSku"
                :variations-style="variationsStyle"
                @update="setSelectedSku($event)"
            />

            <SkuCustomizations
                v-if="selectedSku"
                ref="skuCustomizations"
                :sku="selectedSku"
                @change="setCustomizations($event)"
            />
        </template>

        <div class="main-product-buy-button-holder flex">
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

            <FloatingButton
                v-if="showMobileFloatingButton"
                :quantity="quantity"
                :loading-button="loading"
                :disabled="!canAddToCart"
                @click="addToCart('floating-button')"
            />
        </div>

        <div
            v-if="!firstValidSku"
            class="main-product-unavailable alert -yellow"
        >
            Produto indisponível.
        </div>

        <InventoryCountdown v-if="firstValidSku && showInventoryCountdown" />

        <Zipcode
            v-if="showShippingForm"
            :quantity="quantity"
            :disabled="!firstValidSku"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import _get from 'lodash/get';
import _omitBy from 'lodash/omitBy';
import _isEmpty from 'lodash/isEmpty';
import productMixin from '@/mixins/product';
import Zipcode from '@/components/product/Zipcode';
import SelectSku from '@/components/product/SelectSku';
import LoaderButton from '@/components/generic/LoaderButton';
import QuantitySelector from '@/components/generic/QuantitySelector';
import SkuCustomizations from '@/components/product/SkuCustomizations';
import InventoryCountdown from '@/components/product/InventoryCountdown';
import FloatingButton from '@/components/generic/FloatingButton';
import trackingByApi from '@/mixins/tracking/api';

export default {
    name: 'ProductCustomizations',

    components: {
        Zipcode,
        SelectSku,
        LoaderButton,
        QuantitySelector,
        SkuCustomizations,
        InventoryCountdown,
        FloatingButton,
    },

    mixins: [
        productMixin,
        trackingByApi,
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
    },

    data: () => ({
        quantity: 1,
        loading: false,
        customizationValues: {},
        customizationHasErrors: false,
    }),

    computed: {
        canAddToCart() {
            if (!this.firstValidSku) {
                return false;
            }

            return true;
        },

        customizations() {
            return _get(this.selectedSku, 'customizations.data', []);
        },

        areCustomizationsValid() {
            if (!this.selectedSku || this.customizations.length === 0) {
                return true;
            }

            if (this.selectedSku.allow_sell_without_customization) {
                return this.customizations
                    .every(customization => _isEmpty(this.customizationValues[customization.id]));
            }

            return this.customizations.every(customization => {
                if (!customization.required) {
                    return true;
                }

                return !_isEmpty(this.customizationValues[customization.id]);
            });
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
            })
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

        async addToCart(locationTrack = 'main-product-buy-button') {
            if (!this.selectedSku) {
                this.$refs.selectSku.verifySelect();
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
            const validValues = _omitBy(this.customizationValues, _isEmpty);

            // if all customizations aren't required, ]
            // empty and the sku isn't allowed to be sold without a customization,
            // send them filled with empty values
            if (
                this.customizations.every(_customization => !_customization.required)
                && _isEmpty(validValues)
                && !this.selectedSku.allow_sell_without_customization
            ) {
                customization[this.selectedSku.id] = this.customizationValues;
            }

            if (!_isEmpty(validValues)) {
                customization[this.selectedSku.id] = validValues;
            }

            /* eslint-disable camelcase */
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
    },
};
</script>
