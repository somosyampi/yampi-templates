<template>
    <div class="holder-review">
        <div
            class="review-content"
            :class="{
                '-cursor-pointer': reviewPhotos.length
            }"
            @click="handleContentDetails()"
        >
            <div class="-rating">
                <i
                    v-for="index in times(5)"
                    :key="index"
                    class="icon"
                    :class="`icon-star-${index < review.rating ? 'dynamic' : 'grey'}`"
                />
            </div>
            <div class="flex">
                <span
                    class="-name ellipsis"
                    v-text="review.name"
                />
                <Timeago
                    v-if="showDates"
                    class="-time-ago"
                    :date="review.created_at.date"
                />
            </div>
            <div
                class="-text"
                v-text="review.message"
            />
            <div
                v-if="review.photos.data.length"
                class="review-photos-wrapper"
            >
                <template
                    v-for="photo in reviewPhotos"
                >
                    <div
                        :key="photo.url"
                        class="review-photo-container"
                    >
                        <img
                            :key="photo.url"
                            class="review-photo-product-page"
                            :src="photo.url"
                        >
                    </div>
                </template>
            </div>
        </div>
        <div>
            <modal-review-details
                v-if="!isMobile"
                ref="ModalReviewDetailsRef"
                :review="reviewFilteredPhotos"
                :show-dates="showDates"
            />
            <modal-review-details-mobile
                v-else
                ref="ModalReviewDetailsRef"
                :review="reviewFilteredPhotos"
                :show-dates="showDates"
            />
        </div>
    </div>
</template>

<script>
import _ from '~/lodash';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'ReviewCard',

    mixins: [
        mobileMixin,
    ],

    props: {
        review: {
            type: Object,
            required: true,
        },

        showDates: {
            type: Boolean,
            required: true,
        },

        loading: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            activePhoto: 0,
            imageHasError: [false, false, false],
            photos: this.review.photos.data,
            windowWidth: window.outerWidth,
            showMobile: false,
            ready: false,
        };
    },

    computed: {
        reviewPhotos() {
            return this.review.photos.data.filter(
                photo => photo.url.match(/\.([^./?]+)($|\?)/),
            );
        },

        reviewFilteredPhotos() {
            const copyReview = this.review;
            copyReview.photos.data = this.reviewPhotos;
            return copyReview;
        },
    },

    watch: {
        loading() {
            this.resizeAllGridItems();
        },
    },

    mounted() {
        window.addEventListener('load', () => {
            this.windowWidth = document.documentElement.offsetWidth;
            this.resizeAllGridItems();
        });
        window.addEventListener('resize', () => {
            this.windowWidth = document.documentElement.offsetWidth;
            this.resizeAllGridItems();
        });
    },

    updated() {
        this.resizeAllGridItems();
    },

    methods: {
        times: _.times,

        handleContentDetails() {
            if (this.review.photos.data.length) {
                this.$refs.ModalReviewDetailsRef.handleModal();
                this.showMobile = true;
            }
        },

        resizeGridItem(item) {
            const tempItem = item;

            const grid = this.$parent.$el;
            const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10);
            const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10);
            const rowSpan = Math.ceil((item.querySelector('.review-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            tempItem.style.gridRowEnd = `span ${rowSpan}`;
        },

        resizeAllGridItems() {
            const allItems = document.getElementsByClassName('holder-review');
            for (let x = 0; x < allItems.length; x++) {
                this.resizeGridItem(allItems[x]);
            }
        },

        resizeInstance(instance) {
            const item = instance.elements[0];
            this.resizeGridItem(item);
        },
    },
};
</script>
