<template>
    <div
        class="buy-together-offer flex -between"
        :class="{ '-three': threeProducts, '-center-box': center }"
    >
        <template v-for="(product, index) in products">
            <div
                :key="product.id"
                class="buy-together-product"
            >
                <a
                    :href="product.url_path"
                    class="-clean"
                >
                    <div>
                        <CustomImage
                            :key="url[product.id] ? url[product.id] : $get(product, 'images.data.0.url')"
                            class="-loading"
                            :src="url[product.id] ? url[product.id] : $get(product, 'images.data.0.url')"
                            :alt="product.name"
                            :thumbor="thumborFilters"
                        />
                    </div>

                    <div class="buy-together-quantity">
                        1 unidade
                    </div>

                    <div class="buy-together-product-name"><p>{{ product.name }}</p></div>
                </a>

                <SelectSku
                    ref="SelectSkuRef"
                    :product="product"
                    @update="updateSelectedSkus(index, $event)"
                    @updateVariation="changeVariationImage"
                />
            </div>

            <div
                :key="`${product.id}-icon`"
                :class="`buy-together-${getIcon(index)}`"
            >
                <i
                    class="icon"
                    :class="`icon-big-${getIcon(index)}`"
                />
            </div>
        </template>

        <div class="buy-together-total">
            <div
                v-if="discountTotal > 0"
                class="total-value"
            >
                Valor total:

                <span class="old-price">
                    {{ fullPrice | formatMoney }}
                </span>
            </div>

            <div class="final-value price">
                {{ priceWithDiscount | formatMoney }} <br>
                <span
                    v-if="!invalidSelectedPrice"
                    class="payment-type"
                > {{ price.text }}</span>
            </div>

            <div
                v-if="discountTotal > 0"
                class="discount-value"
            >
                Economize {{ discountTotal | formatMoney }}
            </div>

            <BuyTogetherCustomization
                v-if="productsForCustomization.length && combo.id === currentCombo"
                ref="BuyTogether"
                class="ma-2"
                @click="handleBuyTogetherCustomization"
                @save="handleSave"
            />

            <LoaderButton
                class="btn btn-primary mt-14"
                style="width: 100%;"
                :sending="loading"
                :title="buyButtonText"
                @click="addToCart()"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from '~/vuex';
import _ from '~/lodash';
import Vue from '~/vue';
import trackingByApi from '@/mixins/tracking/api';
import { createPriceObjects } from '@/mixins/helpers';

export default {
    name: 'ProductCombo',

    mixins: [trackingByApi],

    props: {
        combo: {
            type: Object,
            required: true,
        },

        buyButtonText: {
            type: String,
            default: 'Comprar',
        },

        showModalAfterPurchase: {
            type: Boolean,
            default: false,
        },

        center: {
            type: Boolean,
            default: false,
        },

        highlightTypePayment: {
            type: String,
            default: 'promotional',
        },
    },

    data() {
        return {
            loading: false,
            selectedSkus: [],
            invalidFormClass: false,
            invalidSelectedPrice: false,
            imageUrl: Vue.observable({}),
            productId: false,
        };
    },

    computed: {
        ...mapGetters('buyTogether', [
            'productsForCustomization',
            'customizedProducts',
            'currentCombo',
        ]),

        url() {
            if (!this.imageUrl) {
                return this.products[0].skus.data[0].images.data[0].url;
            }

            return this.imageUrl;
        },

        products() {
            return _.get(this.combo, 'products.data', []);
        },

        threeProducts() {
            return this.products.length === 3;
        },

        thumborFilters() {
            return {
                resize: this.threeProducts ? '215x215' : '275x275',
            };
        },

        allSkusAreValid() {
            return (
                this.products.length === this.selectedSkus.length
                && this.selectedSkus.every(sku => sku)
            );
        },

        price() {
            return createPriceObjects({ basePath: 'prices.data.', pricePath: 'price' })[this.highlightTypePayment];
        },

        fullPrice() {
            return this.selectedSkus.reduce((acc, sku, index) => {
                let tempSku = sku;

                if (!tempSku) {
                    tempSku = _.get(this.products, `${index}.skus.data.0`);
                }

                const defaultPrice = _.get(tempSku, 'prices.data.price', 0);
                const selectedPrice = _.get(tempSku, this.price.path, false);

                if (!selectedPrice) {
                    this.invalidSelectedPrice = true;
                }

                return acc + _.get(tempSku, this.price.path, defaultPrice);
            }, 0);
        },

        priceWithDiscount() {
            const discountValue = _.get(this.combo, 'discount_value', 0);
            const discountType = _.get(this.combo, 'discount_type', 'v');
            const factors = {
                p: this.fullPrice / 100,
                v: 1,
            };

            return this.fullPrice - discountValue * factors[discountType];
        },

        discountTotal() {
            return this.fullPrice - this.priceWithDiscount;
        },

        buyTogetherError() {
            let error;

            this.$refs.SelectSkuRef.forEach(el => {
                if (el.$refs.customSelect) {
                    error = el.verifySelect();
                }
            });

            if (this.$refs.BuyTogether) {
                this.$refs.BuyTogether.checkError();
                return this.$refs.BuyTogether.customizationError || error;
            }

            return error;
        },

        filteredCustomizations() {
            let customized = {};

            Object.keys(this.customizedProducts).forEach(key => {
                if (this.customizedProducts[key].isMandatory
                    || this.customizedProducts[key].isPersonalized) {
                    customized = {
                        ...customized,
                        [key]: _.omit(this.customizedProducts[key], ['isPersonalized', 'isMandatory']),
                    };
                }
            });

            return customized;
        },
    },

    watch: {
        currentCombo(newValue) {
            if (newValue !== this.combo.id) {
                this.$refs.SelectSkuRef.forEach(el => {
                    el.bootSelected();
                });
            }
        },
    },

    mounted() {
        this.setSelectedSkus();
    },

    methods: {
        ...mapActions('cart', ['addProductsToCart']),

        ...mapActions('buyTogether', [
            'addSkuToCustomize',
            'updateSkusToCustomize',
            'setCombo',
            'reset',
        ]),

        changeVariationImage(imageUrl) {
            Vue.set(this.imageUrl, imageUrl.productId, imageUrl.imageUrl);
        },

        handleSave() {
            this.$refs.SelectSkuRef.forEach(el => {
                if (el.$refs.customSelect) {
                    el.verifySelect();
                }
            });

            this.$refs.BuyTogether.checkError();
        },

        getIcon(index) {
            return index + 1 === this.products.length ? 'equal' : 'plus';
        },

        updateSelectedSkus(index, selectedSku) {
            const { images } = selectedSku;

            if (images.data[0] === undefined) {
                return;
            }

            this.$set(this.imageUrl, selectedSku.product_id, images.data[0].url);

            this.setCombo(this.combo.id);

            this.$emit('updateCurrentComboKey', this.combo.id);

            this.$set(this.selectedSkus, index, selectedSku);

            this.updateSkusToCustomize({
                index,
                skus: this.selectedSkus.filter(sku => sku && sku.customizations.data.length),
            });
        },

        setSelectedSkus() {
            this.selectedSkus = this.products.map(product => _.get(product, 'skus.data.0'));
        },

        handleBuyTogetherCustomization() {
            if (!this.allSkusAreValid) {
                this.$refs.SelectSkuRef.forEach(el => {
                    if (el.$refs.customSelect) el.verifySelect();
                });
            } else {
                this.$refs.BuyTogether.handleCustomization();
            }
        },

        async addToCart() {
            this.loading = true;

            if (!this.buyTogetherError && this.allSkusAreValid) {
                await this.addProductsToCart({
                    skus: this.selectedSkus,
                    products: this.products,
                    showModal: this.showModalAfterPurchase,
                    value: this.priceWithDiscount,
                    extras: {
                        kit_id: this.combo.id,
                        customization: this.filteredCustomizations || {},
                    },
                });

                const themeParams = window.themeConfig.theme.params;

                this.handleTrackApi('purchase-intended', {
                    location: 'buy-together',
                    quick_buy_button_enabled: themeParams.show_add_to_cart_button,
                    items: _.map(this.products, 'name'),
                    amount: this.priceWithDiscount,
                });
            }

            this.loading = false;
        },
    },
};
</script>
