<template>
    <div
        class="average-rating-container"
        :class="{'is-grid': isGrid}"
        @click="handleScroll"
    >
        <FilledStar
            v-for="index in _times(5)"
            :key="index + uuidv4()"
            width="14"
            height="15"
            :fill-id="index + uuidv4()"
            :filled-percentage="getStarPercentage(index)"
        />

        <div
            class="average-rating-amount"
        >
            {{ ratingAmountText }}
        </div>
    </div>
</template>

<script>
import _times from 'lodash/times';
import { mapGetters } from 'vuex';
import { smoothScroll, uuidv4 } from '@/mixins/helpers';
import FilledStar from '@/components/icons/FilledStar.vue';

export default {
    name: 'AverageRating',

    components: {
        FilledStar,
    },

    props: {
        isGrid: {
            type: Boolean,
            default: false,
        },

        product: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            elementPosition: 0,
        };
    },

    computed: {
        ...mapGetters('images', ['lazyloadImages']),

        ratingValue() {
            return this.product.data?.rating ?? this.product.rating;
        },

        totalReviews() {
            return this.product.data?.total_approved_reviews
                ?? this.product.total_approved_reviews;
        },

        gridReviewsAmount() {
            return this.totalReviews > 0 ? `(${this.totalReviews})` : '';
        },

        productReviewsAmount() {
            return `(${this.$tc('common.reviews', this.totalReviews)})`;
        },

        ratingAmountText() {
            return this.isGrid ? this.gridReviewsAmount : this.productReviewsAmount;
        },
    },

    mounted() {
        if (!this.isGrid) {
            window.addEventListener('scroll', () => {
                const element = document.getElementsByClassName('product-reviews')[0];
                if (this.elementPosition !== element.offsetTop) {
                    this.elementPosition = element.offsetTop;
                }
            });
        }
    },

    methods: {
        uuidv4,

        _times,

        async handleScroll() {
            if (this.isGrid) return;

            const holderReview = document.getElementsByClassName('product-reviews')[0];
            const productDescription = document.getElementsByClassName('product-specifications')[0];
            this.elementPosition = holderReview.offsetTop;

            if (!holderReview) return;

            if (this.elementPosition > productDescription.offsetTop) {
                const totalImagesY = this.lazyloadImages.reduce((acc, image) => {
                    if (image.y > 700 && window.innerWidth > 700) return acc + 700;

                    if (window.innerWidth < 700 && image.y > window.innerWidth) {
                        return window.innerWidth * 0.75 + acc;
                    }

                    return image.y * 0.90 + acc;
                }, 0);

                const dist = totalImagesY
                    ? (this.elementPosition + totalImagesY) : this.elementPosition;

                await smoothScroll(document.body, 0, dist);

                return;
            }

            await smoothScroll(document.body, 0, this.elementPosition);
        },

        getStarPercentage(index) {
            if (index + 1 <= this.ratingValue) {
                return '100%';
            }

            const decimalPart = (this.ratingValue % 1).toFixed(1) * 100;

            let percentage = '0%';

            if (decimalPart > 0 && decimalPart <= 40) {
                percentage = '30%';
            }

            if (decimalPart > 40 && decimalPart <= 60) {
                percentage = '50%';
            }

            if (decimalPart > 60 && decimalPart <= 75) {
                percentage = '55%';
            }

            if (decimalPart > 75) {
                percentage = '65%';
            }

            return index > this.ratingValue ? '0%' : percentage;
        },
    },
};
</script>
