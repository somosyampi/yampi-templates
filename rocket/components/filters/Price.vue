<template>
    <div class="filter filter-price">
        <div class="-title">
            Faixa de preço
        </div>

        <template v-if="loading">
            <loader :margin="33" />
            <loader style="display: block; margin: 20px auto 54px; width: 50%" />
        </template>

        <range-slider
            v-else-if="payload.max"
            v-model="value"
            :max="payload.max"
            :remove-prefix="true"
            @input="updatePriceStatus"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from '~/vuex';
import BaseFilter from '@/components/filters/BaseFilter.vue';

export default {
    name: 'FilterPrice',

    extends: BaseFilter,

    data: () => ({
        mainQueryString: 'price',
        route: 'prices',
        value: [],
    }),

    computed: {
        ...mapGetters('preview', [
            'isIframe',
        ]),
    },

    mounted() {
        this.value.push(this.queryParams.min || 0);

        if (this.queryParams.max) {
            this.value.push(this.queryParams.max);
        }
    },

    methods: {
        ...mapActions('queryParams', [
            'removeQueryParams',
        ]),

        updatePriceStatus([min, max]) {
            if (this.isIframe) {
                return;
            }

            if (min === 0 && this.queryParams.min) {
                this.removeQueryParams('min');
                this.parseActiveFilter();

                return;
            }

            if (max === this.payload.max && this.queryParams.max) {
                this.removeQueryParams('max');
                this.parseActiveFilter();

                return;
            }

            const queries = {};

            if (min !== this.queryParams.min && min > 0) {
                queries.min = min;
            }

            if (max !== this.queryParams.max && max < this.payload.max) {
                queries.max = max;
            }

            this.setQueryParams({ ...queries, page: 1 });
            this.parseActiveFilter();
        },

        parsePayload(payload) {
            const max = Number(payload.max);

            if (this.value.length < 2) {
                this.value.push(max);
            }

            return {
                min: Number(payload.min),
                max,
            };
        },

        parseFilterStatuses() {
            const [min, max] = this.value;

            if (min === 0 && max === this.payload.max) {
                return;
            }

            const queries = {};

            if (min !== 0) {
                queries.min = min;
            }

            if (max !== this.payload.max) {
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
            this.value = [0, this.payload.max];
        },
    },
};
</script>
