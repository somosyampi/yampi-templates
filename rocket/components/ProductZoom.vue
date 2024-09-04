<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="main-product-image-wrapper relative flex -between">
            <div class="main-product-images-nav">
                <div
                    v-if="hasVideo"
                    class="video-thumb"
                >
                    <smooth-scroll
                        element-id="holder-main-product-video"
                        :margin="80"
                    >
                        <template slot-scope="{ scroll }">
                            <div @click="scroll">
                                <i class="icon icon-video-play" />
                                <div class="-text">
                                    VÍDEO
                                </div>
                            </div>
                        </template>
                    </smooth-scroll>
                </div>

                <splide
                    ref="thumbnail"
                    :class="{ arrows: hasArrows }"
                    :options="carouselOption"
                    :slides="productImages"
                >
                    <splide-slide
                        v-for="(image, index) in productImages"
                        :key="'main-photo-thumb-' + index"
                    >
                        <CustomImage
                            :src="image.url"
                            :alt="`${validProduct.name} thumbnail`"
                            :lazyload="false"
                            :thumbor="{ resize: '75x75' }"
                        />
                    </splide-slide>
                </splide>
            </div>

            <div
                class="main-product-image"
                :class="{ mounted, '-loading' : !mounted }"
                :style="mainCarouselHolderStyle"
            >
                <splide
                    v-if="ready"
                    ref="mainImage"
                    :options="{
                        perPage: 1,
                        gap: '16px',
                        rewind: true,
                        lazyLoad: isMobile,
                        arrows: productImages.length > 1,
                        pagination: productImages.length > 1,
                    }"
                    :slides="productImages"
                    @splide:click="openZoomMobile"
                    @splide:lazyload:loaded="mountMainCarousel"
                    @splide:move="handleCarouselChange"
                    @splide:mounted="handleMinHeight"
                >
                    <splide-slide
                        v-for="(image, index) in productImages"
                        :key="'main-photo-' + index"
                    >
                        <zoom-on-hover
                            v-if="!isMobile"
                            :scale="1"
                            :alt-text="validProduct.name"
                            :img-zoom="imageIndicator === index
                                ? $thumborize(treatCustomImage(image.url), { resize: '1000x1000' })
                                : null"
                            :img-normal="loadedImages[index]
                                || [index - 1, index, index + 1].includes(imageIndicator)
                                ? $thumborize(treatCustomImage(image.url), { resize: '600x600' })
                                : imgPlaceholder"
                            @loaded="mountMainCarousel"
                        />

                        <img
                            v-else
                            class="mobile-zoom-image"
                            :data-splide-lazy="$thumborize(treatCustomImage(image.url), { resize: '700x700' })"
                            :data-zoom="$thumborize(treatCustomImage(image.url), { resize: '1000x1000' })"
                            :alt="validProduct.name"
                            width="700"
                            height="700"
                        >
                    </splide-slide>
                </splide>
                <template v-if="isMobile">
                    <div
                        v-if="isMobile"
                        class="zoom-hint"
                    >
                        Clique para zoom
                    </div>
                    <div
                        class="total-images-indicator"
                        v-html="imageIndicatorText"
                    />
                </template>
            </div>
        </div>

        <div
            v-if="isMobile"
            class="modal-zoom-mobile"
            :class="{'is-active': activeZoom}"
        >
            <div class="-header flex -between -vcenter">
                <div class="-message flex -vcenter">
                    <i class="icon icon-pinch-zoom" />
                    Arraste com os dedos
                </div>

                <div
                    class="-close flex -vcenter -hcenter"
                    @click="closeModalZoom"
                >
                    <i class="icon icon-close-modal-white" />
                </div>
            </div>

            <pinch-zoom
                :auto-zoom-out="false"
                :overflow="'visible'"
                :limit-pan="true"
                :min-scale="1"
            >
                <img
                    :src="zoomImage"
                    :alt="`${validProduct.name} zoom`"
                >
            </pinch-zoom>
        </div>
    </div>
</template>

<script>
/* eslint-disable max-len */
import _get from 'lodash/get';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import PinchZoom from 'vue-pinch-zoom';
import SmoothScroll from './SmoothScroll';
import mobileMixin from '@/mixins/mobile';
import productMixin from '@/mixins/product';
import CustomImage from '@/components/generic/CustomImage';

export default {
    name: 'ProductZoom',

    components: {
        CustomImage,
        SmoothScroll,
        SplideSlide,
        Splide,
        PinchZoom,
    },

    mixins: [
        mobileMixin,
        productMixin,
    ],

    props: {
        hasVideo: {
            type: Boolean,
            default: false,
        },

        thumbWidth: {
            type: Number,
            default: 0,
        },

        thumbHeight: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            defaultThumbSize: 75,
            imageIndicator: 0,
            activeZoom: false,
            zoomImage: '',
            isZooming: false,
            mounted: false,
            lastEvent: 0,
            xDown: null,
            yDown: null,
            ready: true,
            loadedImages: [],
            lastSku: null,
            carouselMinHeight: 0,
            imgPlaceholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        };
    },

    computed: {
        thumbnailWidth() {
            return this.thumbWidth || this.thumbHeight || this.defaultThumbSize;
        },

        thumbnailHeight() {
            return this.thumbHeight || this.thumbWidth || this.defaultThumbSize;
        },

        hasArrows() {
            return this.productImages.length > (this.hasVideo ? 5 : 6);
        },

        carouselHeight() {
            return this.hasVideo ? 445 : 530;
        },

        carouselOption() {
            return {
                gap: 16,
                height: this.carouselHeight,
                fixedWidth: this.thumbnailWidth,
                fixedHeight: this.thumbnailHeight,
                pagination: false,
                rewind: true,
                cover: true,
                direction: 'ttb',
                isNavigation: true,
                arrows: this.hasArrows,
            };
        },

        productImages() {
            const selected = _get(this.validProduct, 'use_different_images')
                ? (this.lastSku || this.validProduct)
                : this.validProduct;

            return _get(selected, 'images.data', []);
        },

        imageIndicatorText() {
            return `<span class='-active'>${this.imageIndicator + 1}</span><span class="-total">${this.productImages.length}</span>`;
        },

        mainCarouselHolderStyle() {
            if (!this.isMobile || !this.carouselMinHeight) {
                return null;
            }

            return `min-height: ${this.carouselMinHeight}px;`;
        },
    },

    watch: {
        isMobile() {
            this.ready = false;

            this.$nextTick(() => {
                this.ready = true;

                if (this.isMobile) {
                    this.syncZoomCarousel();
                } else {
                    this.setMobileMinHeight();
                    this.syncCarousel();
                }
            });
        },

        selectedSku() {
            if (this.selectedSku) {
                this.lastSku = { ...this.selectedSku };

                if (this.validProduct.use_different_images) {
                    this.loadedImages = [];
                    this.updateIndex(0);
                }

                if (this.isMobile) {
                    this.ready = false;

                    this.$nextTick(() => {
                        this.ready = true;
                    });
                }
            }
        },
    },

    mounted() {
        this.syncCarousel();
        this.syncZoomCarousel();
        this.handleZoomMobileGestures();
        this.loadInitialImages();
    },

    methods: {
        treatCustomImage(url) {
            const prefix = 'https://s3.sa-east-1.amazonaws.com/king';
            let img = url;

            if (img.startsWith(prefix)) {
                img = img.replace(prefix, 'https://king');
            }

            return img;
        },

        syncCarousel() {
            setTimeout(() => {
                const mainCarousel = this.$refs.mainImage;
                const thumbCarousel = this.$refs.thumbnail;

                if (!mainCarousel || !thumbCarousel) {
                    return;
                }

                mainCarousel.sync(thumbCarousel.splide);
            }, 0);
        },

        syncZoomCarousel() {
            setTimeout(() => {
                const mainCarousel = this.$refs.mainImage;
                const zoomCarousel = this.$refs.zoomMobile;

                if (!mainCarousel || !zoomCarousel) {
                    return;
                }

                mainCarousel.sync(zoomCarousel.splide);
            }, 0);
        },

        openZoomMobile(splide) {
            const image = splide.Components.Elements.list
                .querySelector('.splide__slide.is-active .mobile-zoom-image');
            const zoomImage = image ? image.getAttribute('data-zoom') : null;

            if (!zoomImage) {
                return;
            }

            this.zoomImage = zoomImage;
            this.activeZoom = true;
            document.body.classList.add('no-scroll');
        },

        handleTouchStart(evt) {
            const firstTouch = evt.touches[0];
            this.xDown = firstTouch.clientX;
            this.yDown = firstTouch.clientY;

            if (evt.touches.length > 1) {
                this.handleZooming();
            }
        },

        handleTouchMove(evt) {
            if (!this.xDown || !this.yDown || evt.touches.length > 1) {
                return;
            }

            const { transform } = document.querySelector('.pinch-zoom-content').style;

            if (transform && transform.match(/matrix.*\((.+)\)/)[1].split(', ')[0] > 1) {
                return;
            }

            const xUp = evt.touches[0].clientX;
            const yUp = evt.touches[0].clientY;
            const xDiff = this.xDown - xUp;
            const yDiff = this.yDown - yUp;

            if (Math.abs(xDiff) < Math.abs(yDiff) && yDiff < 0 && !this.isZooming) {
                this.closeModalZoom();
            }

            this.xDown = null;
            this.yDown = null;
        },

        handleZooming() {
            this.isZooming = true;
            this.lastEvent++;
            const { lastEvent } = this;

            setTimeout(() => {
                if (lastEvent === this.lastEvent) {
                    this.isZooming = false;
                }
            }, 500);
        },

        handleZoomMobileGestures() {
            const zoomModal = document.querySelector('.modal-zoom-mobile');

            if (zoomModal) {
                zoomModal.addEventListener('touchstart', this.handleTouchStart, false);
                zoomModal.addEventListener('touchmove', this.handleTouchMove, false);
            }
        },

        mountMainCarousel() {
            setTimeout(() => {
                this.mounted = true;
                this.handleMinHeight();
            }, 0);
        },

        closeModalZoom() {
            this.activeZoom = false;
            document.body.classList.remove('no-scroll');
        },

        updateIndex(index) {
            this.imageIndicator = index;
        },

        async handleCarouselChange(slide) {
            await this.$nextTick();

            const { index } = slide;

            if (!this.loadedImages[index] && this.productImages[index]) {
                this.loadedImages[index] = this.$thumborize(this.productImages[index].url, { resize: '600x600' });
            }

            this.updateIndex(index);
            this.setMobileMinHeight(this.$refs.mainImage.$el.offsetHeight);
        },

        handleMinHeight() {
            this.$nextTick(() => {
                if (this.isMobile) {
                    this.setMobileMinHeight(this.$refs.mainImage.$el.offsetHeight);
                }
            });
        },

        setMobileMinHeight(height) {
            if (height) {
                this.carouselMinHeight = height;
            }
        },

        loadInitialImages() {
            this.productImages.forEach((image, index) => {
                const url = index < 2
                    ? this.$thumborize(image.url, { resize: '600x600' })
                    : null;

                this.loadedImages[index] = url;
            });
        },
    },
};
</script>
