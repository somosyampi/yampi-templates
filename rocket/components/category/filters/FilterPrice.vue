<template>
    <div
        class="filter filter-price"
    >
        <div class="-title">
            Faixa de preço
        </div>

        <template v-if="loading">
            <Loader :margin="33" />
            <Loader style="display: block; margin: 20px auto 54px; width: 50%" />
        </template>

        <RangeSlider
            v-else-if="currentPayload.max"
            v-model="value"
            :max="currentPayload.max"
            :remove-prefix="true"
            @input="updatePriceStatus"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from '~/vuex';
import BaseFilter from '@/components/category/filters/BaseFilter.vue';

export default {
    name: 'FilterPrice',

    extends: BaseFilter,

    props: {
        allPrices: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        mainQueryString: 'price',
        route: 'prices',
        value: [],
        currentPayload: { min: 0, max: 0 },
    }),

    computed: {
        ...mapGetters('preview', [
            'isIframe',
        ]),

    },

    watch: {
        payload(newPayload) {
            if (!this.shouldUseNewSearchStrategy) {
                this.currentPayload = newPayload;
            }
        },

        allPrices(newPrices) {
            if (!this.shouldUseNewSearchStrategy) {
                return;
            }

            this.processAllPrices(newPrices);
        },
    },

    mounted() {
        this.value.push(this.queryParams.min || 0);

        if (this.queryParams.max) {
            this.value.push(this.queryParams.max);
        }

        if (this.shouldUseNewSearchStrategy) {
            this.processAllPrices(this.allPrices);
        }
    },

    methods: {
        ...mapActions('queryParams', [
            'removeQueryParams',
        ]),

        processAllPrices(allPrices) {
            const prices = allPrices.map(price => Number(price));

            if (!prices.length) {
                return;
            }

            const maxPrice = Math.max(...prices);

            this.currentPayload = this.parsePayload({
                min: 0,
                max: Number(maxPrice),
            });

            if (this.queryParams.max && this.value.length < 2) {
                this.value = [
                    this.queryParams.min || 0,
                    this.queryParams.max || maxPrice,
                ];
            }
        },

        updatePriceStatus([min, max]) {
            if (this.isIframe) {
                return;
            }

            if (min === 0 && Number(this.queryParams.min)) {
                this.removeQueryParams({ key: 'min' });
                this.parseActiveFilter();

                return;
            }

            if (max === this.currentPayload.max && Number(this.queryParams.max)) {
                this.removeQueryParams({ key: 'max' });
                this.parseActiveFilter();

                return;
            }

            const queries = {};

            if (min !== Number(this.queryParams.min) && min > 0) {
                queries.min = min;
            }

            if (max !== Number(this.queryParams.max) && max < this.currentPayload.max) {
                queries.max = max;
            }

            this.setQueryParams({ ...queries, page: 1 });
            this.parseActiveFilter();
        },

        parsePayload(payload) {
            const max = Number(payload.max);

            if (this.value.length < 2) {
                this.value.push(max);
                this.currentPayload.max = max;
            }

            return {
                min: Number(payload.min),
                max,
            };
        },

        parseFilterStatuses() {
            const [min, max] = this.value;

            if (min === 0 && max === this.currentPayload.max) {
                return;
            }

            const queries = {};

            if (min !== 0) {
                queries.min = min;
            }

            if (max !== this.currentPayload.max) {
                queries.max = max;
            }

            const minFormatted = this.$formatMoney(Number(min));
            const maxFormatted = this.$formatMoney(Number(max));

            this.addActiveFilter({
                id: this.$randomString(),
                key: 'price',
                query: queries,
                alias: 'price',
                name: `${minFormatted} - ${maxFormatted}`,
            });
        },

        parseActiveFilter() {
            this.removeActiveFilter({
                alias: 'price',
            });

            this.parseFilterStatuses();
        },

        filterRemoved() {
            this.value = [0, this.currentPayload.max];
        },
    },
};
</script>
