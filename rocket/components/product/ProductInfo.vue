<template>
    <div>
        <slot
            :sku="skuText"
            :availability="availability"
            :warranty="validProduct.warranty"
            :price="price"
            :formatted-price="currentFormattedPrice"
            :price-type-text="selectedPriceText"
            :loading-prices="loadingPrices"
        />

        <AddToCart />
    </div>
</template>

<script>
import _ from '~/lodash';
import productMixin from '@/mixins/product';
import pricesMixin from '@/mixins/prices';
import { createPriceObjects } from '@/mixins/helpers';

export default {
    name: 'ProductInfo',

    mixins: [
        productMixin,
        pricesMixin,
    ],

    props: {
        highlightTypePayment: {
            type: String,
            default: 'promotional',
        },
    },

    computed: {
        skuText() {
            if (this.validSku) {
                return this.validSku.sku;
            }

            if (this.validProduct) {
                return this.validProduct.sku.split(',', 1)[0];
            }

            return '';
        },

        price() {
            const item = this.validSku || this.validProduct;
            const staticPrices = _.get(item, 'prices.data', {});

            if (this.productPrices && !this.loadingPrices) {
                return this.productPrices;
            }

            return staticPrices;
        },

        priceObject() {
            if (!this.selectedPriceMeta || !this.selectedPriceMeta.path) {
                return {};
            }
            return _.get(this.price, this.selectedPriceMeta.path, {});
        },

        currentFormattedPrice() {
            if (Object.keys(this.priceObject).length) {
                return `${_.get(this.price, this.selectedPriceMeta.path, this.firstSku[0].prices.data.price_formated)}`;
            }

            return `${_.get(this.price, 'price_formated', this.firstSku[0].prices.data.price_formated)}`;
        },

        selectedPriceText() {
            if (Object.keys(this.priceObject).length) {
                return this.selectedPriceMeta.text;
            }

            return '';
        },

        selectedPriceMeta() {
            const priceObjects = createPriceObjects({ basePath: '', pricePath: 'price_formatted' });
            // Retorna o highlightTypePayment se existir, senão retorna 'promotional' como fallback
            return priceObjects[this.highlightTypePayment] || priceObjects.promotional;
        },

        availability() {
            return _.get(this.validSku, 'days_availability_formated');
        },
    },

    watch: {
        selectedSku(sku) {
            const productId = this.validProduct?.id || window.data?.product?.data.id;

            if (!productId) {
                return;
            }

            this.productPricesParams = sku?.id
                ? { product_id: productId, sku_id: sku.id }
                : { product_id: productId };
        },
    },
};
</script>
