<template>
    <div
        v-if="activeFilters.length"
        class="selected-filters"
    >
        <div
            v-for="filter in validActiveFilters"
            :key="filter.alias"
            class="selected-filter"
            @click="removeFilter(filter)"
            v-text="filter.name"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from '~/vuex';
import queryParams from '@/mixins/queryParams';
import SearchAttributesHandler from '@/modules/SearchAttributesHandler';

const ALLOWED_TAG_KEYS = ['categories_name', 'brand_name', 'attributes', 'price', 'brand_id', 'category_id', 'filter_id'];

export default {
    name: 'SelectedFilters',

    mixins: [
        queryParams,
    ],

    computed: {
        ...mapGetters('filters', [
            'activeFilters',
        ]),

        validActiveFilters() {
            return this.activeFilters.filter(filter => filter.name && ALLOWED_TAG_KEYS.includes(filter.key));
        },
    },

    methods: {
        ...mapActions('filters', [
            'removeActiveFilter',
        ]),

        ...mapActions('queryParams', [
            'setQueryParams',
            'removeQueryParams',
        ]),

        removeFilter(filter) {
            if (filter.key === 'attributes') {
                const currentAttributes = this.queryParams?.attributes?.length ? this.queryParams.attributes : '';
                const updatedAttributes = SearchAttributesHandler
                    .removeAttributeValue(decodeURIComponent(currentAttributes), filter.name);

                if (updatedAttributes) {
                    this.setQueryParams({ attributes: updatedAttributes, page: 1 });
                } else {
                    this.removeQueryParams({ key: ['attributes', 'page'] });
                }

                this.removeActiveFilter(filter);
                return;
            }

            this.removeActiveFilter(filter);
            this.setQueryParams({ ...filter.query, page: 1 });

            if (filter.alias === 'price') {
                this.removeQueryParams({ key: Object.keys(filter.query) });
            }
        },
    },
};
</script>
