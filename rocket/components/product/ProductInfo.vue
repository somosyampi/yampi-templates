<template>
    <div>
        <slot
            :sku="skuText"
            :availability="availability"
            :warranty="validProduct.warranty"
            :price="price"
            :formatted-price="currentFormattedPrice"
            :price-type-text="selectedPriceText"
        />

        <AddToCart />
    </div>
</template>

<script>
import _ from '~/lodash';
import productMixin from '@/mixins/product';
import { createPriceObjects } from '@/mixins/helpers';

export default {
    name: 'ProductInfo',

    mixins: [
        productMixin,
    ],

    props: {
        selectedPrice: {
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

            return _.get(item, 'prices.data', {});
        },

        priceObject() {
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
            return createPriceObjects({ basePath: '', pricePath: 'price_formatted' })[this.selectedPrice];
        },

        availability() {
            return _.get(this.validSku, 'days_availability_formated');
        },
    },
};
</script>
