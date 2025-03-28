<template>
    <div
        v-if="ready"
        :class="customContainerClasses"
        class="section-text-button-2-banners--container container"
    >
        <div
            :class="customDescriptionClasses"
            class="section-text-button-2-banners--description"
        >
            <div
                class="title-text"
                v-html="titleText"
            />
            <div
                class="description-text"
                v-html="descriptionText"
            />
            <div>
                <RocketAnchor
                    v-if="!!buttonSwitch"
                    :custom-classes="`section--button --${buttonStyle} ellipsis-multiline`"
                    :label="textInButton"
                    :href="linkInButton"
                    v-bind="computedAttrs"
                />
            </div>
        </div>
        <div
            :class="customBannersClasses"
            class="section-text-button-2-banners--banners"
        >
            <CustomImage
                v-for="banner in computedBanners"
                :key="banner.id"
                :src="getImage(banner) || srcFirstPlaceholder"
                :alt="`${banners.name}`"
                :lazyload="true"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import mobileMixin from '@/mixins/mobile';
import { isLinkSameStoreDomain } from '@/mixins/helpers';

export default {
    name: 'SectionTextButton2Banners',

    mixins: [
        mobileMixin,
    ],

    props: {
        numberBanner: {
            type: Number,
            required: true,
        },

        resourceIds: {
            type: Array,
            required: true,
        },

        textAlign: {
            type: String,
            required: true,
        },

        titleText: {
            type: String,
            required: true,
        },

        descriptionText: {
            type: String,
            required: true,
        },

        textPosition: {
            type: String,
            required: true,
        },

        buttonStyle: {
            type: String,
            required: true,
        },

        buttonSwitch: {
            type: Boolean,
            required: true,
        },

        textInButton: {
            type: String,
            required: true,
        },

        linkInButton: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            banners: [],
            loading: false,
            isMounted: false,
            ready: true,
            isPlaceholder: false,
            placeholders: null,
        };
    },

    computed: {
        ...mapGetters('preview', ['isPreview']),

        customContainerClasses() {
            return [
                `--${this.textPosition}`,
                {
                    '--multiple-resources': this.numberBanner > 1,
                },
            ];
        },

        customBannersClasses() {
            return [
                {
                    '--multiple-resources': this.numberBanner > 1,
                },
            ];
        },

        customDescriptionClasses() {
            return [
                `--${this.textAlign}`,
            ];
        },

        computedAttrs() {
            const isVoidLink = this.linkInButton === 'javascript:void(0)';

            if (!this.linkInButton || isVoidLink) return {};

            const isLinkSameDomain = isLinkSameStoreDomain(this.linkInButton, window.merchant.domain);

            if (isLinkSameDomain) {
                return {
                    rel: 'noreferrer nofollow',
                    'target-type': '_blank',
                };
            }

            return {
                'target-type': '_blank',
            };
        },

        computedBanners() {
            if (!this.banners || this.banners.length === 0) {
                return [];
            }

            if (this.numberBanner > 1) {
                return this.banners;
            }

            return [this.banners[0]];
        },

        remainingBannersCount() {
            const totalUploadedBanners = this.resourceIds.length;
            const totalSelectedBanners = this.numberBanner;

            return totalSelectedBanners
            - totalUploadedBanners;
        },

        hasEnoughUploadedBanners() {
            return this.remainingBannersCount === 0;
        },

        srcFirstPlaceholder() {
            if (!this.placeholders || !this.isPreview) return '';

            return this.placeholders?.[0]?.image_url;
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
        this.loadBanners();
        this.loadPlaceholders();
    },

    methods: {
        async loadPlaceholders() {
            if (!this.isPreview) return;

            this.placeholders = await this.getPlaceholders();
        },

        async getPlaceholders() {
            const { data: payload } = await rocket({
                method: 'get',
                url: '/placeholders/text-button-2-banners',
            });

            return payload.data;
        },

        getImage(banner) {
            return this.isMobile
                ? banner.mobile_image_url || banner.image_url
                : banner.image_url;
        },

        async loadBanners() {
            try {
                const ids = this.resourceIds;

                this.loading = true;

                if (!ids.length && this.isPreview) {
                    this.banners = await this.getPlaceholders();

                    return;
                }

                if (!ids.length) {
                    return;
                }

                let params = {
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
                    this.banners = await this.getPlaceholders();

                    return;
                }

                if (!this.hasEnoughUploadedBanners && this.isPreview) {
                    let placeholders = await this.getPlaceholders();

                    placeholders = placeholders.slice(
                        0,
                        this.remainingBannersCount,
                    );

                    this.banners = [
                        ...data.data,
                        ...placeholders,
                    ];

                    return;
                }

                this.banners = data.data;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
