<template>
    <div class="filter">
        <div
            v-for="filterGroup in payload"
            :key="filterGroup.id"
            class="filter filter-generic"
        >
            <div
                class="-title"
                v-text="filterGroup.name"
            />

            <ul>
                <li
                    v-for="filter in filterGroup.values"
                    :key="filter.id"
                    class="filter-option"
                >
                    <custom-checkbox
                        :text="filter.name"
                        :color="filter.color"
                        :image="filter.image_url"
                        :checked="filter.active"
                        @change="updateFilterStatus(filter, $event)"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BaseFilter from '@/components/filters/BaseFilter.vue';

export default {
    name: 'FilterCustom',

    extends: BaseFilter,

    data: () => ({
        route: 'filters',
        mainQueryString: 'filter_id',
    }),

    methods: {
        parsePayload(payload) {
            return payload.map(filterGroup => ({
                ...filterGroup,
                id: this.$randomString(),
                values: filterGroup.values.data.map(filter => ({
                    ...filter,
                    active: this.queryParams.filter_id.includes(filter.id),
                })),
            }));
        },

        parseFilterStatuses(filters) {
            filters.forEach(filter => filter.values
                .forEach(value => this.checkFilterStatus(value, false)));
        },

        filterRemoved(filter) {
            this.payload.some(item => {
                const values = item.values.find(value => value.id === filter.id);

                if (values) {
                    values.active = false;

                    return true;
                }

                return false;
            });
        },
    },
};
</script>
