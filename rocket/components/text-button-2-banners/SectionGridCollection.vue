<template>
    <div
        v-if="ready"
        class="section-grid-collection--container container"
    >
        <div class="section-grid-collection--text">
            <h2
                class="theme-title title-text"
                v-html="titleText"
            />

            <p
                class="subtitle-text"
                v-html="subtitleText"
            />
        </div>

        <div
            class="section-grid-collection--content"
            :class="contentClasses"
        >
            <div
                class="section-grid-collection--banner"
            >
                <RocketAnchor
                    v-if="!loading"
                    label=""
                    v-bind="linkConfig"
                >
                    <BannerStopwatch v-if="hasBannerStopwatch" />

                    <CustomImage
                        :src="getImage(banner) || ''"
                        :alt="`${banner ? banner.name : ''}`"
                        :lazyload="true"
                        width="333"
                        height="406"
                    />
                </RocketAnchor>
            </div>

            <div
                class="section-grid-collection--products"
            >
                <GridCollectionBoxProduct
                    v-for="(productSlug, index) in resourceProducts"
                    :key="index"
                    :product-slug="productSlug"
                >
                    <template slot-scope="{ product }">
                        <slot :product="product" />
                    </template>
                </GridCollectionBoxProduct>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from '~/vuex';
import rocket from '@/modules/axios/rocket';
import api from '@/modules/axios/api';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'SectionGridCollection',

    mixins: [mobileMixin],

    props: {
        section: {
            type: String,
            required: true,
        },

        titleText: {
            type: String,
            required: true,
        },

        subtitleText: {
            type: String,
            required: true,
        },

        textPosition: {
            type: String,
            required: true,
            validator: value => [
                'left',
                'right',
            ].includes(value),
        },

        resourceBannerIds: {
            type: Array,
            required: true,
            default: () => [],
        },

        resourceProductsSlugs: {
            type: Array,
            required: true,
            default: () => [],
        },
    },

    data() {
        return {
            banner: {},
            products: [],
            loading: false,
            ready: true,
            placeholders: null,
        };
    },

    computed: {
        ...mapGetters('preview', ['isPreview']),

        contentClasses() {
            return [
                `--${this.textPosition}`,
                ` --count-${this.countResourceProducts}`,
            ];
        },

        resourceProducts() {
            if (!this.resourceProductsSlugs.length) {
                return Array(3).fill('');
            }

            return this.resourceProductsSlugs.filter(slug => slug !== null);
        },

        countResourceProducts() {
            const productPlaceholderCount = 3;

            return this.resourceProductsSlugs.length !== 0
                ? this.resourceProductsSlugs.length
                : productPlaceholderCount;
        },

        linkConfig() {
            if (!this.banner || !this.banner.link) return null;

            return {
                href: this.banner.link,
                'target-type': '_blank',
            };
        },

        isEmptyBannerList() {
            return this.resourceBannerIds.length === 0;
        },

        hasBannerStopwatch() {
            return this.banner && this.banner.stopwatch;
        },
    },

    watch: {
        isMobile() {
            this.ready = false;

            this.$nextTick(() => {
                this.ready = true;
            });
        },
    },

    mounted() {
        this.loadBanner();
    },

    methods: {
        async loadBanner() {
            try {
                this.loading = true;

                if (this.isEmptyBannerList && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                if (this.isEmptyBannerList) {
                    return;
                }

                const payload = await this.getBanner();

                if (this.isEmptyPayload(payload) && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                this.banner = payload;
            } catch (error) {
                if (error.response.status >= 400 && this.isPreview) {
                    await this.loadPlaceholders();
                }
            } finally {
                this.loading = false;
            }
        },

        async getBanner() {
            try {
                const { data: payload } = await api.get('catalog/banners', {
                    params: {
                        status: 'active',
                        id: this.resourceBannerIds,
                    },
                });

                const [response] = payload?.data;

                return response ?? null;
            } catch (error) {
                console.error('Erro ao obter banner -', error);
                throw error;
            }
        },

        async loadPlaceholders() {
            const { data: payload } = await rocket.get(
                `/placeholders/${this.section}`,
            );

            this.banner = payload?.data?.banner ?? null;
        },

        getImage(banner) {
            if (!banner) return '';

            return this.isMobile
                ? banner.mobile_image_url || banner.image_url
                : banner.image_url;
        },

        isEmptyPayload(payload) {
            return !payload || Object.keys(payload).length === 0;
        },
    },
};
</script>
