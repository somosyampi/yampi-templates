<template>
    <div
        v-if="allBrands?.length || !shouldUseNewSearchStrategy"
        class="filters-wrapper"
    >
        <div
            v-if="shouldShowFilters"
            class="filters"
        >
            <div>
                <FilterCategory
                    v-if="showCategories"
                    :show-checkbox="showCategoryCheckbox"
                    :active-category="activeCategory"
                    :all-categories="allCategories"
                />

                <FilterPrice
                    v-if="showPrice"
                    :all-prices="allPrices"
                />

                <FilterBrand
                    v-if="showBrand"
                    :all-brands="allBrands"
                />

                <FilterCustom :search-filters="allFilters" />

                <FilterPromotion
                    v-if="showPromotions"
                    :active-promotion="activePromotion"
                />

                <button
                    class="btn btn-secundary mobile -block"
                    @click="closeMobileFilters"
                >
                    VER PRODUTOS
                </button>
            </div>
        </div>
        <Loader
            v-else
            :width="100"
            :height="900"
            :margin="32"
        />
    </div>
</template>

<script>
import { mapActions } from '~/vuex';
import queryParams from '@/mixins/queryParams';
import cacheMixin from '@/mixins/cache';
import search from '@/modules/axios/search';

export default {
    name: 'Filters',

    mixins: [
        queryParams,
        cacheMixin,
    ],

    props: {
        showBrand: {
            type: Boolean,
            default: true,
        },

        showPrice: {
            type: Boolean,
            default: true,
        },

        showCategories: {
            type: Boolean,
            default: true,
        },

        showPromotions: {
            type: Boolean,
            default: false,
        },

        activeCategory: {
            type: String,
            default: '',
        },

        activePromotion: {
            type: String,
            default: '',
        },

        productsPerPage: {
            type: [Number, String],
            default: 10,
        },
    },

    data() {
        return {
            mounted: false,
            allCategories: [],
            allBrands: [],
            allPrices: [],
            allFilters: {},
            parsingFilters: false,
        };
    },

    computed: {
        showCategoryCheckbox() {
            return window.data.context !== 'category';
        },

        shouldShowFilters() {
            return !this.shouldUseNewSearchStrategy
                ? (this.mounted)
                : !!(this.mounted && !this.parsingFilters && this.allBrands?.length);
        },
    },

    async mounted() {
        await this.bootQueryParams();
        this.mounted = true;

        if (!this.shouldUseNewSearchStrategy) {
            return;
        }

        const cacheData = this.getLocalStorageCache({
            itemId: this.queryParams.q,
            itemAlias: 'search_aggs',
        });

        const urlStringParams = new URLSearchParams(window.location.search);

        this.syncUrlParamsWithActiveFilters(urlStringParams);

        if (cacheData && cacheData.aggs) {
            this.parseAggs({ elasticAggregations: cacheData.aggs });

            return;
        }

        const { builderSearch } = await import('@/modules/search/searchHelpers');

        const searchData = await builderSearch.execute(
            search,
            {
                q: urlStringParams.get('q'),
            },
        );

        this.setLocalStorageCache({
            itemId: this.queryParams.q,
            itemAlias: 'search_aggs',
            data: {
                aggs: searchData?.aggs,
            },
        });

        this.parseAggs({ elasticAggregations: searchData.aggs });
    },

    methods: {
        ...mapActions('filters', [
            'bootQueryParams',
        ]),

        syncUrlParamsWithActiveFilters(urlStringParams) {
            if (urlStringParams.has('max') || urlStringParams.has('min')) {
                const maxFormatted = urlStringParams.has('max')
                    ? Number(urlStringParams.get('max')).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
                    : Number(this.allPrices[1]).toLocaleString(undefined, { style: 'currency', currency: 'BRL' });

                const minFormatted = urlStringParams.has('min')
                    ? Number(urlStringParams.get('min')).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
                    : Number('0').toLocaleString(undefined, { style: 'currency', currency: 'BRL' });

                this.addActiveFilter({
                    alias: 'price',
                    id: this.$randomString(),
                    key: 'price',
                    name: `${minFormatted} - ${maxFormatted}`,
                    query: {
                        min: minFormatted,
                        max: maxFormatted,
                    },
                });
            }
            const undesiredQueryParams = ['q', 'min', 'max', 'attributes'];
            // 'attributes' é tratado separadamente em FilterCustom.vue por questões de reatividade

            urlStringParams.forEach((value, key) => {
                if (undesiredQueryParams.includes(key)) {
                    return;
                }

                const sanitizedKey = key.replace(/\[\]/g, '');

                this.addActiveFilter({
                    alias: `${sanitizedKey}-${value}`,
                    id: value,
                    key: sanitizedKey,
                    name: value,
                    query: {
                        [sanitizedKey]: value,
                    },
                });
            });
        },

        closeMobileFilters() {
            document.querySelector('.filters-trigger .over-background').dispatchEvent(new Event('mousedown'));
        },

        parseAggs({ elasticAggregations }) {
            if (!elasticAggregations || typeof elasticAggregations !== 'object') return;

            const brandsMap = new Map();
            if (elasticAggregations.brands && Array.isArray(elasticAggregations.brands.buckets)) {
                elasticAggregations.brands.buckets.forEach(bucket => {
                    if (bucket.key) {
                        brandsMap.set(bucket.key, { id: bucket.key, name: bucket.key, count: bucket.doc_count });
                    }
                });
            }

            const categoriesMap = new Map();
            if (Array.isArray(elasticAggregations.categories)) {
                elasticAggregations.categories.forEach(cat => {
                    if (cat.key) {
                        categoriesMap.set(cat.key, { id: cat.key, name: cat.key, count: cat.doc_count });
                    }
                });
            }

            const pricesSet = new Set();
            if (typeof elasticAggregations.min_price?.value === 'number') {
                pricesSet.add(elasticAggregations.min_price.value);
            }
            if (typeof elasticAggregations.max_price?.value === 'number') {
                pricesSet.add(elasticAggregations.max_price.value);
            }

            const attributesMap = {};
            if (Array.isArray(elasticAggregations.attributes)) {
                elasticAggregations.attributes.forEach(attr => {
                    if (!attr.key || !attr.values || !Array.isArray(attr.values.buckets)) return;
                    if (!attributesMap[attr.key]) {
                        attributesMap[attr.key] = new Set();
                    }
                    attr.values.buckets.forEach(val => {
                        if (val.key) {
                            attributesMap[attr.key].add({ key: val.key, count: val.doc_count });
                        }
                    });
                });
            }

            this.allBrands = Array.from(brandsMap.values());
            this.allCategories = Array.from(categoriesMap.values());
            this.allPrices = Array.from(pricesSet);
            this.allFilters = Object.keys(attributesMap).reduce((acc, name) => {
                acc[name] = Array.from(attributesMap[name]);
                return acc;
            }, {});
        },
    },
};
</script>
