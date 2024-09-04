<template>
    <Grid
        v-observe-visibility="{
            callback: visibilityChanged,
            once: true,
        }"
        :title="title"
        :loading="loading"
        :products="payload"
        :products-per-line="productsPerLine"
        :carousel="isCarousel"
        :class="{ completed, 'has-carousel': isCarousel }"
    >
        <template slot-scope="{ product }">
            <slot :product="product" />
        </template>
    </Grid>
</template>

<script>
import BaseProduct from '@/components/product/BaseProduct';
import Grid from '@/components/generic/Grid';

export default {
    name: 'ProductSimilars',

    components: {
        Grid,
    },

    extends: BaseProduct,

    props: {
        desktopLayout: {
            type: String,
            default: 'grid',
            validator: value => ['grid', 'carousel'].includes(value),
        },

        title: {
            type: String,
            default: '',
        },

        productsPerLine: {
            type: Number,
            default: 2,
            validator: value => [1, 2].includes(value),
        },
    },

    data: () => ({
        route: 'similars',
        completed: false,
        queryParams: {
            cart_token: window.Yampi.cart_token,
        },
    }),

    computed: {
        isCarousel() {
            return this.desktopLayout === 'carousel';
        },
    },

    mounted() {
        this.completed = true;
    },
};
</script>
