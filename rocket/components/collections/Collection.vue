<template>
    <Grid
        :link="link"
        :show-link="showLink"
        :loading="loading"
        :title="collection.name"
        :products-per-line="productsPerLine"
        :carousel="isCarousel"
        :products="collectionProducts"
        :class="{ completed, 'has-carousel': isCarousel }"
    >
        <template slot-scope="{ product }">
            <slot :product="product" />
        </template>
    </Grid>
</template>

<script>
import _ from '~/lodash';
import { mapGetters } from '~/vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';

export default {
    name: 'Collection',

    props: {
        desktopLayout: {
            type: String,
            default: 'grid',
            validator: value => ['grid', 'carousel'].includes(value),
        },

        collectionId: {
            type: Number,
        },

        showLink: {
            type: Boolean,
            default: false,
        },

        productsPerLine: {
            type: Number,
            default: 2,
            validator: value => [1, 2].includes(value),
        },

        totalProducts: {
            type: Number,
            default: 4,
        },
    },

    data: () => ({
        collection: {
            products: {
                data: [],
            },
        },
        loading: true,
        completed: false,
    }),

    computed: {
        ...mapGetters('preview', ['isPreview']),

        link() {
            return this.showLink
                ? _.get(this.collection, 'url_path', '')
                : '';
        },

        collectionProducts() {
            if (this.loading) {
                const result = [];
                const productModel = {
                    brand: {
                        data: {
                            name: '.',
                        },
                    },
                    prices: {
                        data: {
                            price_formated: 0,
                            percent_discount: 0,
                            has_promotion: false,
                            price_sale_formated: 0,
                            pix: {
                                discount_percent: 0,
                                discount_text: 0,
                                discount_value: 0,
                                price: 0,
                                price_formatted: 0,
                            },
                            billet: {
                                discount_percent: 0,
                                discount_text: 0,
                                discount_value: 0,
                                price: 0,
                                price_formated: 5,
                            },
                        },
                    },
                    url_path: '.',
                };

                for (let i = 0; i < this.totalProducts; i++) {
                    result.push(productModel);
                }

                return result;
            }

            return _.get(this.collection, 'products.data', []);
        },

        isCarousel() {
            return this.desktopLayout === 'carousel';
        },
    },

    mounted() {
        this.loadCollection();

        this.completed = true;
    },

    methods: {
        async loadCollection() {
            try {
                this.loading = true;

                if (!this.collectionId && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                const url = this.$applyQueriesToUrl('catalog/collections', {
                    id: [this.collectionId],
                    limit: this.totalProducts,
                });

                const { data } = await api.get(url);

                this.collection = _.get(data, 'data.0', {});
            } finally {
                this.loading = false;
            }
        },

        async loadPlaceholders() {
            const { data: payload } = await rocket({
                method: 'get',
                url: '/placeholders/collections',
            });

            this.collection = _.get(payload, 'data.0', {});
        },
    },
};
</script>
