<template>
    <div
        ref="content"
        :class="{ 'grid-list': !isMosaic }"
    >
        <div
            v-if="loading && firstLoadFinished"
            class="over-background -loader"
        >
            <i class="icon icon-general-loader" />
        </div>

        <slot
            :is-mosaic="isMosaic"
            :is-mobile="isMobile"
            :new-html="newHtml"
            :update-filters="updateFilters"
            :update-order-by="updateOrderBy"
            :update-current-page="updateCurrentPage"
            :update-grid="updateGrid"
            :selected-order="selectedOrder"
            :paginate="paginate"
            :search-data="searchData"
            :loading="loading"
            :query-params="queryParams"
        />

        <AddToCart />
    </div>
</template>

<script>
import _ from '~/lodash';
import { mapGetters } from '~/vuex';
import rocket from '@/modules/axios/rocket';
import api from '@/modules/axios/api';
import queryParamsMixin from '@/mixins/queryParams';
import mobileMixin from '@/mixins/mobile';
import search from '@/modules/axios/search';
import cacheMixin from '@/mixins/cache';
import trackingByApi from '@/mixins/tracking/api';
import { builderSearch, urlSearch } from '@/modules/search/searchHelpers';

export default {
    name: 'CategoryContent',

    mixins: [
        queryParamsMixin,
        mobileMixin,
        trackingByApi,
        cacheMixin,
    ],

    props: {
        productsPerPage: {
            type: [Number, String],
            default: 10,
        },
    },

    data: () => ({
        loading: true,
        newHtml: '',
        isMosaic: true,
        paginate: {
            loading: false,
            pageCount: 7,
            currentPage: 1,
        },
        searchData: [],
        firstLoadFinished: false,
    }),

    computed: {
        selectedOrder() {
            const validOptions = [
                'relevance',
                'best_sellers',
                'highest_price',
                'lowest_price',
                'newest',
                'rating',
                'name_asc',
                'name_desc',
            ];

            return validOptions.includes(this.queryParams.sort_by)
                ? this.queryParams.sort_by
                : 'relevance';
        },

        ...mapGetters('merchant', [
            'merchant',
        ]),

        ...mapGetters('filters', [
            'activeFilters',
        ]),
    },

    watch: {
        isMosaic() {
            this.handleGridCookie();

            if (this.isMosaic) {
                return this.displayMosaicGrid();
            }

            return this.displayListGrid();
        },

        isMobile() {
            if (this.isMobile && this.isMosaic) {
                return this.displayMosaicGrid();
            }

            return this.displayListGrid();
        },
    },

    async mounted() {
        this.loading = true;

        try {
            this.setGridType();

            await this.bootQueryParams();

            this.paginate.currentPage = this.queryParams.page || 1;

            await this.loadCountPaginate();

            this.$store.subscribe(({ type }) => {
                if (type !== 'queryParams/EVENT_URL_UPDATED') {
                    return;
                }

                if (!this.firstLoadFinished) {
                    return;
                }

                this.updateFilters();
                this.loadCountPaginate();
            });

            this.displayMosaicGrid();
        } catch (e) {
            console.error(e);
        } finally {
            if (document.readyState === 'complete') {
                // Page already loaded
                this.firstLoad();
            } else {
                window.addEventListener('load', this.firstLoad);
            }
        }
    },

    destroyed() {
        window.removeEventListener('load', this.firstLoad);
    },

    methods: {
        searchTrackings() {
            if (!this.shouldUseNewSearchStrategy) {
                return;
            }

            const cacheData = this.getLocalStorageCache({
                itemId: this.queryParams.q,
                itemAlias: 'search_query',
            });

            if (!this.firstLoadFinished && !!cacheData?.q) {
                this.handleTrackApi('store-search-returned', {
                    'store-search-returned': !!this.searchData.length,
                });

                this.removeLocalStorageCache({
                    itemId: this.queryParams.q,
                    itemAlias: 'search_query',
                });
            }
        },

        async firstLoad() {
            if (!this.shouldUseNewSearchStrategy) {
                this.firstLoadFinished = true;
                this.loading = false;
                return;
            }

            this.loading = true;

            await this.loadProductsStrategy();

            this.searchTrackings();

            this.firstLoadFinished = true;

            this.loading = false;
        },

        async loadProductsStrategy() {
            if (this.shouldUseNewSearchStrategy) {
                const urlStringParams = new URLSearchParams(window.location.search);
                const urlStringParamsKeys = Array.from(urlStringParams.keys()).filter(key => key !== 'q');

                this.queryParams.q = urlStringParams.get('q') || '';
                this.queryParams.limit = this.productsPerPage;
                this.queryParams.include = 'skus,url_path,image_url,tags,brand,name,slug,id,rating,attributes,categories,price';

                const searchData = await builderSearch.execute(
                    search,
                    this.queryParams,
                );

                this.paginate.pageCount = searchData?.data?.last_page || 1;

                this.searchData = searchData?.data.data;

                if (urlStringParamsKeys.length) {
                    return;
                }

                this.setLocalStorageCache({
                    itemId: this.queryParams.q,
                    itemAlias: 'search_aggs',
                    data: {
                        aggs: searchData?.aggs,
                    },
                });

                return;
            }

            this.newHtml = await urlSearch.execute(rocket, this.queryParams);
        },

        updateFilters: _.debounce(async function () {
            this.loading = true;

            const { queryParams } = this;
            queryParams.resultsOnly = true;

            if (this.paginate.currentPage !== this.queryParams.page) {
                this.paginate.currentPage = this.queryParams.page || 1;
            }

            try {
                await this.loadProductsStrategy();

                this.scrollToTop();
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }

            this.displayMosaicGrid();
        }),

        displayMosaicGrid() {
            if (this.shouldUseNewSearchStrategy) {
                return;
            }

            this.$nextTick(() => {
                if (!this.isMobile || !this.isMosaic) {
                    return;
                }

                const parent = this.getResultsElement();
                const holder = parent.getElementsByClassName('products-list')[0];
                const list = Array.from(parent.getElementsByClassName('box-product'));

                if (!holder) {
                    return;
                }

                const columnLeft = document.createElement('div');
                const columnRight = document.createElement('div');

                columnLeft.classList.add('mosaic-column');
                columnRight.classList.add('mosaic-column');

                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    const destiny = i % 2 === 0 ? columnLeft : columnRight;

                    if (element) {
                        destiny.appendChild(element);
                        element.setAttribute('order', i);
                    }
                }

                holder.append(columnLeft);
                holder.append(columnRight);

                if (this.newHtml) {
                    this.newHtml = parent.innerHTML;
                }
            });
        },

        displayListGrid() {
            if (this.shouldUseNewSearchStrategy) {
                return;
            }

            this.$nextTick(() => {
                const parent = this.getResultsElement();
                const holder = parent.getElementsByClassName('products-list')[0];
                const totalProducts = parent.getElementsByClassName('box-product').length;
                const getMosaicColumn = () => parent.querySelector('.mosaic-column');

                for (let i = 0; i < totalProducts; i++) {
                    const element = parent.querySelector(`.box-product[order="${i}"]`);

                    if (element) {
                        holder.append(element);
                    }
                }

                let mosaicColumn = getMosaicColumn();

                while (mosaicColumn) {
                    mosaicColumn.remove();
                    mosaicColumn = getMosaicColumn();
                }

                this.newHtml = parent.innerHTML;
            });
        },

        getResultsElement() {
            let element = document;

            if (this.newHtml) {
                element = document.createElement('div');
                element.innerHTML = this.newHtml;
            }

            return element;
        },

        handleGridCookie() {
            const name = this.getCookieName();
            const today = new Date();
            const expiration = new Date(today.setMonth(today.getMonth() + 1));
            const selectedGrid = this.isMosaic ? 'mosaic' : 'list';

            document.cookie = `${name}=${selectedGrid}; expires=${expiration}`;
        },

        getGridCookie() {
            const name = this.getCookieName();
            const cookies = `; ${document.cookie}`;
            const splitedCookies = cookies.split(`; ${name}=`);

            if (splitedCookies.length === 2) {
                return splitedCookies.pop().split(';').shift();
            }

            this.handleGridCookie();
            return null;
        },

        getCookieName() {
            return `grid_${this.merchant.alias}`;
        },

        setGridType() {
            const gridCookie = this.getGridCookie();

            if (gridCookie) {
                this.isMosaic = gridCookie === 'mosaic';
            }
        },

        async loadCountPaginate() {
            if (this.shouldUseNewSearchStrategy) {
                return;
            }

            this.paginate.loading = true;

            const { queryParams } = this;
            queryParams.limit = this.productsPerPage;

            try {
                const url = this.$applyQueriesToUrl('search/products/count', queryParams);
                const { data } = await api.get(url);

                this.paginate.pageCount = _.get(data, 'data.total_pages', 1);
            } catch (e) {
                console.error(e);
            } finally {
                this.paginate.loading = false;
            }
        },

        updateOrderBy(value) {
            this.setQueryParams({
                sort_by: value,
            });
        },

        updateGrid() {
            this.isMosaic = !this.isMosaic;
        },

        updateCurrentPage(page) {
            this.paginate.currentPage = page;

            if (this.paginate.currentPage === 1) {
                this.removeQueryParams({ key: 'page' });

                return;
            }

            this.setQueryParams({
                page: this.paginate.currentPage,
            });
        },

        async scrollToTop() {
            await this.$nextTick();

            this.$refs.content.scrollIntoView({ behavior: 'smooth' });
        },
    },
};
</script>
