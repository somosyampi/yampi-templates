<template>
    <modal
        ref="reviewsDetailsModal"
        name="review-details"
        :scrollable="true"
        class="testing"
        @close="handleClose"
    >
        <transition name="fade">
            <div
                v-if="ready"
                class="wrapper -row"
            >
                <splide
                    :options="{
                        perPage: 1,
                        rewind: true,
                        arrows: review.photos.data.length > 1,
                        pagination: review.photos.data.length > 1,
                    }"
                    :slides="review.photos.data"
                    class="custom-splide"
                >
                    <splide-slide
                        v-for="image in review.photos.data"
                        :key="image.url"
                        class="review-details-photo-container"
                    >
                        <img
                            :src="image.url"
                        >
                    </splide-slide>
                </splide>

                <div class="review-details-content">
                    <div class="review-details-message-title">
                        Avaliação
                    </div>
                    <div class="-rating">
                        <i
                            v-for="index in times(5)"
                            :key="index"
                            class="icon"
                            :class="`icon-star-${index < review.rating ? 'dynamic' : 'grey'}`"
                        />
                    </div>
                    <span
                        class="-name"
                        v-text="review.name"
                    />
                    <Timeago
                        v-if="showDates"
                        class="-time-ago"
                        :date="review.created_at.date"
                    />
                    <div
                        class="-text review-details-message"
                        v-text="review.message"
                    />
                </div>
            </div>
        </transition>
    </modal>
</template>

<script>
import _ from '~/lodash';

export default {
    name: 'ModalReviewDetails',

    props: {
        review: {
            type: Object,
            required: true,
        },

        showDates: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            active: 0,
            show: false,
            ready: false,
        };
    },

    methods: {
        times: _.times,

        handleModal() {
            this.ready = !this.ready;
            this.$refs.reviewsDetailsModal.handleModal();
        },

        setActive(imageNum) {
            this.active = imageNum;
        },

        handleClose() {
            this.ready = !this.ready;
        },
    },
};
</script>
