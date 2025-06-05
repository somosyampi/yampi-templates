<template>
    <div
        v-if="!loading && categories.length"
        :key="screenWidth"
        class="container c-highlight-container"
    >
        <div
            v-if="sectionTitle"
            class="c-highlight-header"
        >
            <div
                class="theme-title c-highlight-header__title"
                :class="{
                    '--full-width': !useVueSplide,
                    '--mobile': isMobile
                }"
            >
                {{ sectionTitle }}
            </div>
        </div>
        <div class="c-highlight-content">
            <component
                :is="tagOrDiv('splide')"
                v-if="categories"
                ref="CarousselRef"
                :options="useVueSplide ? carousselOptions : null"
                :slides="useVueSplide ? categories : null"
                :class="{
                    '--grid': !showCaroussel && isMobile,
                    '--center': !isMobile,
                }"
            >
                <component
                    :is="tagOrDiv('splide-slide')"
                    v-for="item in filterAmountCategories"
                    :key="item.id"
                    :class="{
                        'category-item': !useVueSplide
                    }"
                >
                    <a
                        v-if="item.url_path && item.name"
                        :href="`${$baseUrl}${item.url_path}`"
                        class="c-highlight-content--slide"
                    >
                        <CustomImage
                            :src="getItemCover(item.category_cover)"
                            width="200"
                            height="200"
                            :alt="'Categoria ' + item.name"
                        />
                        <div v-if="showCategoriesNames">{{ item.name }}</div>
                    </a>
                </component>
            </component>
            <div
                v-if="showLoadMoreItems"
                class="load-more"
                @click="showAll = true"
            >
                Carregar mais
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from '~/vuex';
import mobileMixin from '@/mixins/mobile';
import rocket from '@/modules/axios/rocket';
import api from '@/modules/axios/api';

export default {
    name: 'CategoriesHighlight',

    mixins: [
        mobileMixin,
    ],

    props: {
        showCategoriesNames: {
            type: Boolean,
            default: true,
        },

        categoriesIds: {
            type: Array,
            default: () => [],
        },

        title: {
            type: String,
            default: '',
        },

        mobileLayout: {
            type: String,
            default: 'carousel',
        },
    },

    data() {
        return {
            categories: [],
            loading: true,
            showAll: false,
            screenWidth: window.innerWidth,
        };
    },

    computed: {
        ...mapGetters('preview', ['isPreview']),

        highlightedCategoriesIds() {
            try {
                return JSON.parse(this.categoriesIds);
            } catch (e) {
                return [];
            }
        },

        sectionTitle() {
            try {
                return this.title || (this.isPreview ? 'Categorias' : null);
            } catch (e) {
                return null;
            }
        },

        showCaroussel() {
            return this.mobileLayout === 'carousel';
        },

        carousselOptions() {
            return {
                perPage: 7,
                arrows: !this.isMobile,
                pagination: true,
                gap: 20,
                fixedWidth: '149px',
                breakpoints: {
                    700: {
                        perPage: 2,
                        fixedWidth: '160px',
                    },
                    900: {
                        perPage: 3,
                        fixedWidth: '300px',
                    },
                    1000: {
                        perPage: 4,
                        fixedWidth: '230px',
                    },
                    1220: {
                        perPage: 5,
                    },
                },
            };
        },

        useVueSplide() {
            const deviceRules = {
                [false]: categoriesLength => {
                    if (categoriesLength > 7) {
                        return true;
                    }

                    return false;
                },
                [true]: categoriesLength => {
                    if (categoriesLength > 2) {
                        return this.showCaroussel;
                    }

                    return false;
                },
            };

            return deviceRules[this.isMobile](this.categories.length);
        },

        filterAmountCategories() {
            if (this.useVueSplide || !this.isMobile) {
                return this.categories;
            }

            return this.showAll ? this.categories : this.categories.slice(0, 6);
        },

        showLoadMoreItems() {
            return !this.useVueSplide
                && this.isMobile && this.categories.length > 6 && !this.showAll;
        },
    },

    async mounted() {
        if (!this.categoriesIds.length) {
            this.categories = await this.loadPlaceholders();
            return;
        }

        this.categories = await this.loadCategories(this.categoriesIds);

        window.addEventListener('resize', () => {
            this.screenWidth = window.innerWidth;
        });
    },

    methods: {
        getItemCover(cover) {
            if (cover) {
                return cover;
            }

            if (!cover && this.isPreview) {
                return 'http://cdn.yampi.io/rocket/helpers/placeholders/banner-3.png';
            }

            return null;
        },

        tagOrDiv(tag) {
            return this.useVueSplide ? tag : 'div';
        },

        async loadCategories(ids) {
            try {
                this.loading = true;

                const { data } = await api.get('/catalog/categories', {
                    params: {
                        id: ids,
                    },
                });

                if (!data.data.length && this.isPreview) {
                    const placeholders = this.loadPlaceholders();
                    return placeholders;
                }

                return data.data;
            } finally {
                this.loading = false;
            }
        },

        async loadPlaceholders() {
            if (!this.isPreview) {
                return [];
            }

            try {
                this.loading = true;

                const { data: payload } = await rocket({
                    method: 'get',
                    url: '/placeholders/highlighted-categories',
                });

                return payload.data;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
