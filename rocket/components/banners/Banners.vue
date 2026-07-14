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
                        :class="{
                            '--first': index === 0
                        }"
                    >
                        <div
                            v-if="banner.stopwatch"
                            class="relative-banner relative"
                            :class="{ container: sectionIsMainBanner }"
                        >
                            <BannerStopwatch />
                        </div>

                        <div
                            class="banner-image-holder"
                            :style="imageHolderStyle"
                        >
                            <CustomImage
                                :src="getImage(banner)"
                                :alt="'Banner ' + index"
                                :thumbor-enabled="false"
                                :class="{'-loading': !isPreview}"
                                :lazyload="!isPreview"
                                :width="banner.mobile_image ? '1200' : '333'"
                                :height="banner.mobile_image ? '332' : '118'"
                                v-bind="getDimensionPlaceHolderSectionMainBanner(banner)"
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
import { mapGetters } from '~/vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import mobileMixin from '@/mixins/mobile';

const EMPTY_DIMENSIONS = () => ({
    desktop: { width: '0.00', height: '0.00' },
    mobile: { width: '0.00', height: '0.00' },
});

const EMPTY_FIRST_BANNER = () => ({
    id: null,
    link: null,
    image: null,
    mobile_image: null,
    stopwatch: null,
});

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
            type: Boolean,
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
            type: [Object, Array],
            default: EMPTY_DIMENSIONS,
        },

        firstBanner: {
            type: [Object, Array],
            default: EMPTY_FIRST_BANNER,
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
            const { desktop, mobile } = this.normalizedDimensions;
            const device = this.isMobile ? mobile : desktop;

            const width = parseFloat(device.width) || parseFloat(desktop.width);
            const height = parseFloat(device.height) || parseFloat(desktop.height);

            return width ? height / width : 0;
        },

        normalizedDimensions() {
            if (Array.isArray(this.dimensions) || !this.dimensions) {
                return EMPTY_DIMENSIONS();
            }

            return this.dimensions;
        },

        normalizedFirstBanner() {
            if (Array.isArray(this.firstBanner) || !this.firstBanner) {
                return EMPTY_FIRST_BANNER();
            }

            return this.firstBanner;
        },

        sectionIsMainBanner() {
            return this.section === 'main-banner';
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
        if (this.normalizedFirstBanner.id) {
            const bannerModel = {
                id: this.normalizedFirstBanner.id,
                type: '',
                link: this.normalizedFirstBanner.link,
                image_url: this.normalizedFirstBanner.image,
                mobile_image_url: this.normalizedFirstBanner.mobile_image,
                stopwatch: this.normalizedFirstBanner.stopwatch,
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

            return `holder-${this.section} ${container} relative`;
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

        getDimensionPlaceHolderSectionMainBanner(banner) {
            if (!this.sectionIsMainBanner) {
                return null;
            }

            const dimensionTypes = ['width', 'height'];

            const bannerDimensions = this.normalizedFirstBanner.id === banner.id
                ? this.normalizedDimensions
                : banner.dimensions;

            const device = this.isMobile
                ? bannerDimensions?.mobile
                : bannerDimensions?.desktop;

            const placeholderDimensions = {};

            dimensionTypes.forEach(type => {
                const dimension = device?.[type];

                if (dimension) {
                    placeholderDimensions[`placeholder-${type}`] = parseFloat(dimension);
                }
            });

            return placeholderDimensions;
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

                if (this.normalizedFirstBanner.id) {
                    const firstBannerIndex = this.ids.indexOf(this.normalizedFirstBanner.id);

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

                if (this.normalizedFirstBanner.id) {
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
