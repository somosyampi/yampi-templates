<template>
    <div
        ref="content"
        :class="{ 'grid-list': !isMosaic }"
    >
        <div
            v-if="loading"
            class="over-background -loader"
        >
            <i class="icon icon-general-loader" />
        </div>

        <slot
            :isMosaic="isMosaic"
            :isMobile="isMobile"
            :newHtml="newHtml"
            :updateFilters="updateFilters"
            :updateOrderBy="updateOrderBy"
            :updateCurrentPage="updateCurrentPage"
            :updateGrid="updateGrid"
            :selectedOrder="selectedOrder"
            :paginate="paginate"
        />

        <AddToCart />
    </div>
</template>

<script>
import _ from '~lodash';
import { mapGetters } from '~vuex';
import rocket from '@/modules/axios/rocket';
import api from '@/modules/axios/api';
import queryParamsMixin from '@/mixins/queryParams';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'CategoryContent',

    mixins: [
        queryParamsMixin,
        mobileMixin,
    ],

    props: {
        productsPerPage: {
            type: [Number, String],
            default: 10,
        },
    },

    data: () => ({
        loading: false,
        newHtml: '',
        isMosaic: true,
        paginate: {
            loading: false,
            pageCount: 7,
            currentPage: 1,
        },
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
        this.setGridType();

        await this.bootQueryParams();

        this.paginate.currentPage = this.queryParams.page || 1;

        await this.loadCountPaginate();

        this.$store.subscribe(({ type }) => {
            if (type !== 'queryParams/EVENT_URL_UPDATED') {
                return;
            }

            this.updateFilters();
            this.loadCountPaginate();
        });

        this.displayMosaicGrid();
    },

    methods: {
        updateFilters: _.debounce(async function () {
            this.loading = true;

            const { queryParams } = this;
            queryParams.resultsOnly = true;

            if (this.paginate.currentPage !== this.queryParams.page) {
                this.paginate.currentPage = this.queryParams.page || 1;
            }

            try {
                const url = this.$applyQueriesToUrl(window.location.pathname, queryParams);
                const { data } = await rocket.get(url);

                this.newHtml = `<div>${data}</div>`;

                // @TODO: Check if this will work
                // this.$store.dispatch('pixels/facebook/categoryPageEvent');

                this.scrollToTop();
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }

            this.displayMosaicGrid();
        }),

        displayMosaicGrid() {
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
                this.removeQueryParams('page');

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
