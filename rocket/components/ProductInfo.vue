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
import _get from 'lodash/get';
import productMixin from '@/mixins/product';
import AddToCart from './product/AddToCart';
import { createPriceObjects } from '@/mixins/helpers';

export default {
    name: 'ProductInfo',

    components: {
        AddToCart,
    },

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

            return _get(item, 'prices.data', {});
        },

        priceObject () {
            return _get(this.price, this.selectedPriceMeta.path, {});
        },

        currentFormattedPrice() {
            if (Object.keys(this.priceObject).length) {
                return `${_get(this.price, this.selectedPriceMeta.path, this.firstSku[0].prices.data.price_formated)}`;
            }

            return `${_get(this.price, 'price_formated', this.firstSku[0].prices.data.price_formated)}`;
        },

        selectedPriceText() {
            if (Object.keys(this.priceObject).length) {
                return this.selectedPriceMeta.text;
            }

            return "";
        },

        selectedPriceMeta() {
            return createPriceObjects({ basePath: '', pricePath: 'price_formatted'})[this.selectedPrice];
        },

        availability() {
            return _get(this.validSku, 'days_availability_formated');
        },
    },
};
</script>
