<template>
    <div>
        <slot
            :sku="skuText"
            :availability="availability"
            :warranty="validProduct.warranty"
            :price="price"
            :selected-price="selectedPrice"
            :price-text="priceText"
            :loading-prices="loadingPrices"
        />

        <AddToCart />
    </div>
</template>

<script>
import _ from '~/lodash';
import productMixin from '@/mixins/product';
import pricesMixin from '@/mixins/prices';

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
