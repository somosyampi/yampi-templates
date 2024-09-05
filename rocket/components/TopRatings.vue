<template>
    <section v-if="ratings.length > 0 && ready">
        <div class="container top-ratings-holder">
            <div class="flex -between">
                <div class="holder-left flex -vcenter">
                    <div class="theme-title top-ratings-name">
                        {{ title }}
                    </div>
                </div>
            </div>

            <div
                class="ratings-list -carousel"
                :class="{ '-loading': loading }"
            >
                <component
                    :is="tagOrDiv('splide')"
                    v-if="ready"
                    :options="carousel ? carouselOptions : null"
                    :class="{
                        'flex -wrap': !carousel,
                        'single-per-line': isMobile === 1,
                        '-no-pagination': carousel && ratings.length <= ratingsPerPage,
                    }"
                    :slides="carousel ? ratings : null"
                >
                    <component
                        :is="tagOrDiv('splide-slide')"
                        v-for="(rating) in ratings"
                        :key="rating.id"
                        :class="{ 'box-rating-wrapper': !carousel }"
                    >
                        <div class="holder-review">
                            <div class="review-content">
                                <div class="-plr10">
                                    <div class="-rating">
                                        <i
                                            v-for="index in times(5)"
                                            :key="index"
                                            class="icon"
                                            :class="`icon-star-${index < rating.rating ? 'gold' : 'grey'}`"
                                        />
                                    </div>

                                    <span
                                        class="-client"
                                        v-text="rating.name"
                                    />

                                    <div class="-message">
                                        <ReadMore
                                            :max-lines="4"
                                            read-more="+ Ver mais"
                                            read-less="- Ver menos"
                                        >
                                            {{ rating.message }}
                                        </ReadMore>
                                    </div>
                                </div>

                                <div class="-product">
                                    <a
                                        :href="rating.product.data.url"
                                        class="-product-link"
                                    >
                                        <custom-image
                                            v-if="rating.product.data.images.data[0]"
                                            class="-product-image"
                                            :src="rating.product.data.images.data[0].url"
                                            :alt="rating.product.data.name"
                                            :thumbor="{ resize: '35x35' }"
                                            width="35"
                                            height="35"
                                        />
                                        <div>
                                            <p class="-product-title ellipsis-multiline l1">
                                                {{ rating.product.data.name }}
                                            </p>

                                            <span class="redirect">Ver produto</span>
                                            <svg
                                                width="11"
                                                height="10"
                                                viewBox="0 0 11 10"
                                            >
                                                <path d="M10.061 3.22917V0H6.60252V0.9375H8.48895L4.29687 5.10417L5.03049 5.72917L9.11776 1.66667V3.22917H10.061Z" />
                                                <path d="M4.92569 0.9375V0H0V10H10.061V5H9.11776V9.0625H0.943216V0.9375H4.92569Z" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </component>
                </component>
            </div>
        </div>
    </section>
</template>

<script>
import _ from '~lodash';
import { mapGetters } from '~vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'TopRatings',

    mixins: [
        mobileMixin,
    ],

    props: {
        title: {
            type: String,
            required: true,
        },

        ratingId: {
            type: Array,
            required: true,
        },

        totalRatings: {
            type: Number,
            required: true,
            validator: value => value > 0,
        },

        carousel: {
            type: Boolean,
            default: true,
        },
    },

    data: () => ({
        loading: true,
        ready: true,
        ratings: [],
    }),

    computed: {
        ...mapGetters('preview', ['isPreview']),

        ratingsPerPage() {
            return this.isMobile ? 1 : 4;
        },

        carouselOptions() {
            return {
                gap: 19,
                perPage: 4,
                pagination: true,
                arrows: true,
                breakpoints: {
                    700: {
                        gap: 16,
                        perPage: 1,
                        pagination: true,
                        arrows: false,
                    },
                },
            };
        },
    },

    watch: {
        isMobile() {
            if (this.carousel) {
                this.ready = false;

                this.$nextTick(() => {
                    this.ready = true;
                });
            }
        },
    },

    mounted() {
        this.loadRating();
    },

    methods: {
        times: _.times,

        tagOrDiv(tag) {
            return this.carousel ? tag : 'div';
        },

        async loadRating() {
            this.loading = true;

            try {
                if (!this.ratingId.length && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                if (!this.ratingId.length) {
                    return;
                }

                const visibleIds = this.ratingId.slice(0, this.totalRatings);

                if (!visibleIds.length) {
                    return;
                }

                const url = this.$applyQueriesToUrl('catalog/reviews', {
                    id: visibleIds,
                    include: 'product',
                    filterBy: 'id',
                });

                const { data } = await api.get(url);

                this.ratings = data.data;

                this.loading = false;
            } catch(error) {
                console.error(`Ops! Algo deu errado durante o carregamento das avaliações.
                 Por favor, tente novamente mais tarde.`);
            }
        },

        async loadPlaceholders() {
            this.loading = true;
            
            try {
                const { data } = await rocket.get('/placeholders/reviews-home');
                this.ratings = data.data.slice(0, this.totalRatings);

                this.loading = false;
            } catch(e) {
                console.error(`Ops! Algo deu errado durante o carregamento das avaliações.
                 Por favor, tente novamente mais tarde.`);
            }
        },
    },
};
</script>
