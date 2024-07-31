<template>
    <section v-if="loading || products.length > 0">
        <div class="container holder-collection">
            <div class="flex -between">
                <div class="holder-left flex -vcenter">
                    <h2
                        class="theme-title collection-name"
                        :class="{ '-loading': loading }"
                        v-text="title || 'loading collection title'"
                    />

                    <a
                        v-if="(isMobile && showLink) || (!isMobile && link)"
                        :href="link"
                        class="collection-link"
                        :class="{ '-loading': loading }"
                    >
                        Ver todos
                    </a>
                </div>
            </div>
            <rocket-emitter
                emits="grids"
                label="Vitrine de produtos"
            >
                <products-list
                    v-if="products.length"
                    :products="products"
                    :class="{ '-carousel': carousel }"
                    :carousel="carousel"
                    :loading="loading"
                    :products-per-line="productsPerLine"
                    :is-mobile="isMobile"
                >
                    <template slot-scope="{ product }">
                        <slot :product="product" />
                    </template>
                </products-list>
            </rocket-emitter>
        </div>
    </section>
</template>

<script>
import ProductsList from './ProductsList';
import mobileMixin from '@/mixins/mobile';
import RocketEmitter from '../RocketEmitter.vue';

export default {
    name: 'Grid',

    components: {
        RocketEmitter,
        ProductsList,
    },

    mixins: [
        mobileMixin,
    ],

    props: {
        products: {
            type: Array,
            default: () => ([]),
        },

        carousel: {
            type: Boolean,
            default: false,
        },

        title: {
            type: String,
            default: '',
        },

        link: {
            type: String,
            default: null,
        },

        showLink: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },

        productsPerLine: {
            type: Number,
            default: 2,
            validator: value => [1, 2].includes(value),
        },
    },
};
</script>
