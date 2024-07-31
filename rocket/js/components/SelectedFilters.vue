<template>
    <div
        v-if="activeFilters.length"
        class="selected-filters"
    >
        <div
            v-for="filter in activeFilters"
            :key="filter.alias"
            class="selected-filter"
            @click="removeFilter(filter)"
            v-text="filter.name"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import queryParams from '@/mixins/queryParams';

export default {
    name: 'SelectedFilters',

    mixins: [
        queryParams,
    ],

    computed: {
        ...mapGetters('filters', [
            'activeFilters',
        ]),
    },

    methods: {
        ...mapActions('filters', [
            'removeActiveFilter',
        ]),

        ...mapActions('queryParams', [
            'setQueryParams',
        ]),

        removeFilter(filter) {
            this.setQueryParams({ ...filter.query, page: 1 });
            this.removeActiveFilter(filter);
        },
    },
};
</script>
