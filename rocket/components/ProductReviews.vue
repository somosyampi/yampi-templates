<template>
    <div v-if="showReviews || showQuestions">
        <div
            class="holder-product-reviews-title relative"
            :class="{ single: items.length == 1 }"
        >
            <div
                v-if="items.length > 1"
                class="active-slider"
                :style="getSliderStyle"
            />

            <div class="titles flex -between relative">
                <div
                    v-for="(item, key) in items"
                    :key="item.type"
                    class="theme-title"
                    :class="{ active: (activeIndex === key) }"
                    @click="activeIndex = key"
                >
                    <span
                        class="-title"
                        v-text="item.title"
                    />
                    <span
                        class="-quantity"
                        v-text="limitedText(item.count)"
                    />
                </div>
            </div>
        </div>

        <component
            :is="item.component"
            v-for="(item, key) in items"
            v-show="activeIndex === key"
            :key="item.type"
            :active="activeIndex === key"
            :icon="icon"
            :loading.sync="item.loading"
            :count.sync="item.count"
            :show-dates="showDates"
            :show-average-reviews="showAverageReviews"
        />
    </div>
</template>

<script>
import ReviewContent from '@/components/reviews/ReviewContent';
import QuestionContent from '@/components/reviews/QuestionContent';

export default {
    name: 'ProductReviews',

    components: {
        ReviewContent,
        QuestionContent,
    },

    props: {
        order: {
            type: String,
            default: 'reviews_first',
            validator: value => ['reviews_first', 'questions_first'].includes(value),
        },

        showReviews: {
            type: Boolean,
            required: true,
        },

        showQuestions: {
            type: Boolean,
            required: true,
        },

        showDates: {
            type: Boolean,
            required: true,
        },

        showAverageReviews: {
            type: Boolean,
            required: true,
        },

        reviewsTitle: {
            type: String,
            default: 'Avaliações',
        },

        questionsTitle: {
            type: String,
            default: 'Dúvidas',
        },

        icon: {
            type: String,
            default: '',
        },

        limit: {
            type: Number,
            default: 0,
        },
    },

    data: () => ({
        items: [],
        activeIndex: 0,
    }),

    computed: {
        getSliderStyle() {
            const left = !this.activeIndex ? '5px' : '50%';

            return `--active-left: ${left};`;
        },

        allLoading() {
            return this.items.some(item => item.loading);
        },
    },

    mounted() {
        this.load();
    },

    methods: {
        load() {
            const questionsFirst = this.order === 'questions_first';

            if (this.showReviews) {
                this.items.push({
                    type: 'review',
                    component: 'review-content',
                    title: this.reviewsTitle,
                    active: !questionsFirst,
                    loading: false,
                    count: 0,
                });
            }

            if (this.showQuestions) {
                const method = questionsFirst ? 'unshift' : 'push';

                this.items[method]({
                    type: 'question',
                    component: 'question-content',
                    title: this.questionsTitle,
                    active: questionsFirst,
                    loading: false,
                    count: 0,
                });
            }
        },

        limitedText(count) {
            if (!this.limit) {
                return count;
            }

            return this.limit < count
                ? `${this.limit}+`
                : count;
        },
    },
};
</script>
