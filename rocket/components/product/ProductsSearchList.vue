<template>
    <div>
        <div
            v-if="products?.length"
            class="products-search-list flex"
            :class="{
                '-mosaic': isMosaic,
                '-list': !isMosaic,
            }"
            role="list"
        >
            <LazyVisibility
                v-for="product in products"
                :key="product.id"
                class="product-card"
            >
                <ProductCard
                    :product="product"
                    role="listitem"
                />
            </LazyVisibility>
        </div>
        <Loader
            v-else-if="loading"
            :width="100"
            :height="200"
            :margin="32"
        />
        <div
            v-else
            class="alert -yellow"
        >
            Nenhum produto foi encontrado.
        </div>
    </div>
</template>

<script>
import LazyVisibility from '@/components/LazyVisibility.vue';
import ProductCard from '@/components/product/ProductCard.vue';

export default {
    name: 'ProductsSearchList',

    components: {
        ProductCard,
        LazyVisibility,
    },

    props: {
        products: {
            type: Array,
            default: () => [],
        },

        isMosaic: {
            type: Boolean,
            default: true,
        },

        loading: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
