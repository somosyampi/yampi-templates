<template>
    <div class="tab-content">
        <div
            class="holder-reviews"
            :class="{ 'grid': showAverageElement }"
        >
            <div
                v-if="showAverageElement"
                class="average-reviews"
            >
                <p class="average-reviews__number">
                    {{ roundedAverage }}
                </p>
                <div class="stars">
                    <FilledStar
                        v-for="index in times(5)"
                        :key="index"
                        width="23"
                        height="22"
                        :fill-id="index"
                        :filled-percentage="getStarPercentage(index)"
                    />
                </div>
                <p class="helper-text mt-5">
                    baseada em <strong>{{ $tc('reviews.total-reviews', count) }}</strong>
                </p>

                <div class="holder-grades mt-30">
                    <div
                        v-for="rating in groupedRatings"
                        :key="rating.index"
                        class="grade"
                    >
                        <span>{{ rating.index }}</span>
                        <i class="icon icon-star-dynamic" />
                        <div
                            class="bar"
                            :class="getReviewBarClass(rating.index)"
                        />
                        <span
                            class="review-count"
                        >{{ rating.count }}</span>
                    </div>
                </div>

                <div
                    class="btn btn-secundary -block mt-43"
                    @click="showModal"
                >
                    Avaliar produto
                </div>
            </div>

            <div
                v-else
                class="btn btn-secundary"
                @click="showModal"
            >
                Avaliar produto
            </div>

            <div>
                <template v-if="payload.length">
                    <masonry-layout>
                        <template #header>
                            <div class="select-order flex -vcenter -hend">
                                <span class="-title mr-12">
                                    ORDENAR POR:
                                </span>

                                <select
                                    is="custom-select"
                                    id="reviews-order-select"
                                    name="reviews-order"
                                    :value="order"
                                    @change="updateOrderBy"
                                >
                                    <option value="newest">
                                        Mais Recentes
                                    </option>
                                    <option value="oldest">
                                        Mais Antigas
                                    </option>
                                    <option value="best_rating">
                                        Notas Positivas
                                    </option>
                                    <option value="worst_rating">
                                        Notas Negativas
                                    </option>
                                </select>
                            </div>
                        </template>
                        <review-card
                            v-for="(review, reviewIndex) in payload"
                            ref="ReviewCardRef"
                            :key="review.id"
                            :review="review"
                            :show-dates="showDates"
                            :loading="isLoading"
                            @error="(photoIndex) => handleReviewCardError(photoIndex, reviewIndex)"
                        />
                    </masonry-layout>
                    <br>

                    <div
                        v-if="showLoadMore"
                        class="load-more"
                        @click="loadData(true, order)"
                    >
                        + Ver mais avaliações
                    </div>
                </template>

                <div
                    v-if="isLoading"
                    class="text-center"
                >
                    <br>

                    <i class="icon icon-loader-dark" />
                </div>
            </div>

            <template
                v-if="!loading && !payload.length"
            >
                <br>

                <div
                    class="alert -yellow"
                >
                    Esse produto ainda não possui nenhuma avaliação.
                    <b
                        class="link-alike"
                        @click="showModal"
                    >Seja o primeiro a avaliar</b>
                </div>
            </template>
        </div>

        <modal-review
            ref="modal"
            @success="showModalSuccess"
        />
        <modal-review-success ref="modalSuccess" />
    </div>
</template>

<script>
import _ from '~/lodash';
import api from '@/modules/axios/api';
import BaseContent from '@/components/reviews/BaseContent.vue';

export default {
    name: 'ReviewContent',

    extends: BaseContent,

    props: {
        showAverageReviews: {
            type: Boolean,
            default: true,
        },

        count: {
            type: Number,
            required: true,
        },
    },

    data: () => ({
        route: 'reviews',
        ratings: {},
        order: 'newest',
    }),

    computed: {
        roundedAverage() {
            return this.ratings.average_rating
                ? Number(this.ratings.average_rating).toFixed(1)
                : 0.0;
        },

        showAverageElement() {
            return this.showAverageReviews && this.count > 0;
        },

        groupedRatings() {
            if (!this.ratings.grouped_rating) {
                return [];
            }

            const ratingsArray = [];

            Object.keys(this.ratings.grouped_rating).forEach(key => {
                ratingsArray.push({
                    index: key,
                    count: this.ratings.grouped_rating[key],
                });
            });

            return ratingsArray.reverse();
        },
    },

    mounted() {
        this.getAllRatings();
    },

    updated() {
        const cards = this.$refs.ReviewCardRef;

        if (cards) {
            for (let i = 0; i < cards.length; i++) {
                this.$refs.ReviewCardRef[i].resizeAllGridItems();
            }
        }
    },

    methods: {
        times: _.times,

        async getAllRatings() {
            const URL = `catalog/products/reviews/ratings?product_id=${this.product.id}`;

            try {
                this.isLoading = true;

                const { data } = await api.get(URL);

                this.ratings = data;
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },

        getReviewBarClass(index) {
            const percentage = Math.round(
                (this.ratings.grouped_rating[index] / this.count) * 100,
            );

            return `w-${percentage}`;
        },

        getStarPercentage(index) {
            if (index + 1 <= this.roundedAverage) {
                return '100%';
            }

            const decimalPart = (this.roundedAverage % 1).toFixed(1) * 100;

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

            return index > this.roundedAverage ? '0%' : percentage;
        },

        updateOrderBy(value) {
            this.order = value;
            this.loaded = false;
            this.payload.splice(0, this.payload.length);
            this.pagination.currentPage = 0;
            this.pagination.loaded = 0;
            this.loadData(true, this.order);
        },
    },
};
</script>
