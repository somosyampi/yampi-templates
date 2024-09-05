<template>
    <section
        v-if="banners.length"
    >
        <div :class="getHolderClass()">
            <component
                :is="getComponent('splide')"
                v-if="ready"
                :class="classes"
                :slides="carousel ? banners : null"
                :options="carousel ? carouselOptions : null"
            >
                <template v-for="(banner, index) in banners">
                    <component
                        :is="getComponent('splide-slide')"
                        v-if="isValid(banner)"
                        :key="banner.id"
                        ref="holderBanners"
                        class="banner"
                    >
                        <div
                            v-if="banner.stopwatch"
                            class="relative-banner relative"
                            :class="{ container: section === 'main-banner' }"
                        >
                            <banner-stopwatch />
                        </div>

                        <Banner-Product
                            v-if="banner.type === 'product'"
                            :product="banner.product.data"
                            :is-mobile="isMobile"
                        />

                        <div
                            v-else
                            class="banner-image-holder"
                            :style="imageHolderStyle"
                        >
                            <!-- @TODO: Add Thumbor -->
                            <CustomImage
                                :src="getImage(banner)"
                                :alt="'Banner ' + index"
                                :thumbor-enabled="false"
                                :class="{'-loading': !isPreview}"
                                :lazyload="!isPreview"
                            />
                        </div>

                        <a
                            v-if="getLink(banner) !== 'http://'"
                            :href="getLink(banner)"
                            class="full-link"
                        >
                            <span class="-invisible">link</span>
                        </a>
                    </component>
                </template>
                <template v-if="!carousel && banners.length < quantity">
                    <div
                        v-for="i in (quantity - banners.length)"
                        :key="i"
                        class="banner -hack"
                    />
                </template>
            </component>
        </div>
    </section>
</template>

<script>
import { mapGetters } from '~vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'Banners',

    mixins: [
        mobileMixin,
    ],

    props: {
        section: {
            type: String,
            required: true,
        },

        container: {
            type: [Boolean, Number],
            default: true,
        },

        carousel: {
            type: Boolean,
            default: false,
        },

        ids: {
            type: Array,
            required: true,
            validator: values => values.every(Number.isFinite),
        },

        customClass: {
            type: String,
            default: '',
        },

        sliderDelay: {
            type: Number,
            default: 0,
        },

        quantity: {
            type: Number,
            default: 0,
        },

        dimensions: {
            type: [Array, Object],
            default: () => ({}),
        },

        firstBanner: {
            type: [Array, Object],
            default: null,
        },

        slug: {
            type: String,
            default: '',
        },

        autoHeight: {
            type: Boolean,
            default: false,
        },

        autoWidth: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        banners: [],
        loading: false,
        isMounted: false,
        ready: true,
        isPlaceholder: false,
    }),

    computed: {
        ...mapGetters('preview', ['isPreview']),

        carouselOptions() {
            return {
                rewind: true,
                arrows: true,
                autoplay: !!this.sliderDelay,
                interval: this.sliderDelay * 1000,
                pauseOnHover: true,
                updateOnMove: true,
                pagination: true,
                autoHeight: this.autoHeight,
                autoWidth: this.autoWidth,
            };
        },

        classes() {
            let { customClass } = this;

            if (this.banners.length <= 1) {
                customClass += ' -no-pagination';
            }

            return customClass;
        },

        imageHolderStyle() {
            if (!this.isMounted || !this.loading || !this.loaderRatio) {
                return '';
            }

            const element = this.$refs.holderBanners[0].$el || this.$refs.holderBanners[0];

            return `height: ${element.offsetWidth * this.loaderRatio}px; background-color: #d0d0d0;`;
        },

        loaderRatio() {
            let width = parseFloat(this.dimensions?.desktop?.width);
            let height = parseFloat(this.dimensions?.desktop?.height);

            if (this.isMobile) {
                width = parseFloat(this.dimensions?.mobile?.width) || width;
                height = parseFloat(this.dimensions?.mobile?.height) || height;
            }

            if (!width) {
                return 0;
            }

            return height / width;
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
        if (this.firstBanner) {
            const bannerModel = {
                id: this.firstBanner.id,
                type: '',
                link: this.firstBanner.link,
                image_url: this.firstBanner.image,
                mobile_image_url: this.firstBanner.mobile_image,
                stopwatch: this.firstBanner.stopwatch,
            };

            this.banners.push(bannerModel);
        } else {
            this.loadStaticBanners();
        }

        this.loadBanners();

        this.$nextTick(() => {
            this.isMounted = true;
        });
    },

    methods: {
        getLastSlug(slugString) {
            const [slug] = slugString.split('/').slice(-1);

            return slug;
        },

        getComponent(component) {
            return this.carousel ? component : 'div';
        },

        getHolderClass() {
            const container = this.container ? 'container' : '';
            const isPreview = this.isPreview ? 'preview' : '';

            return `holder-${this.section} ${container} ${isPreview} relative`;
        },

        isValid(banner) {
            if (banner.type === 'product') {
                return false; // not supporting banner product at the moment.
            }

            return !!banner.image_url;
        },

        getLink(banner) {
            return this.$safeCleanLink(
                banner.type === 'product'
                    ? banner.product.data.url
                    : banner.link,
            );
        },

        getImage(banner) {
            return this.isMobile
                ? banner.mobile_image_url || banner.image_url
                : banner.image_url;
        },

        loadStaticBanners() {
            const bannerModel = {
                id: 0,
                type: '',
                link: '',
                image_url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                mobile_image_url: '',
            };
            const mapQuantity = {
                'banner-2': 2,
                'banner-3': 3,
            };

            for (let i = 0; i < (mapQuantity[this.section] || 1); i++) {
                bannerModel.id = i;
                this.banners.push({ ...bannerModel });
            }
        },

        async loadBanners() {
            try {
                const ids = [...this.ids];

                this.loading = true;

                if (!ids.length && this.isPreview && !this.slug.length) {
                    await this.loadPlaceholders();

                    return;
                }

                if (this.firstBanner) {
                    const firstBannerIndex = this.ids.indexOf(this.firstBanner.id);

                    ids.splice(firstBannerIndex, 1);
                }

                if (!ids.length && !this.slug.length) {
                    return;
                }

                let params = this.slug.length
                    ? {
                        slug: this.getLastSlug(this.slug),
                    }
                    : {
                        id: ids,
                    };

                params = {
                    status: 'active',
                    ...params,
                };

                const { data } = await api.get('catalog/banners', {
                    params,
                });

                if (!data.data.length && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                if (this.firstBanner) {
                    this.banners = this.banners.concat(data.data);
                    return;
                }

                this.banners = data.data;
            } finally {
                this.loading = false;
            }
        },

        async loadPlaceholders() {
            const { data: payload } = await rocket({
                method: 'get',
                url: `/placeholders/${this.section}`,
            });

            this.banners = payload.data;
        },
    },
};
</script>
