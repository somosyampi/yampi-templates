<template>
    <div class="filter">
        <div v-if="!shouldUseNewSearchStrategy">
            <div
                v-for="filterGroup in payload"
                :key="filterGroup.id"
                class="filter filter-generic"
            >
                <div
                    class="-title"
                    v-html="filterGroup.name"
                />

                <ul>
                    <li
                        v-for="filter in filterGroup.values"
                        :key="filter.id"
                        class="filter-option"
                    >
                        <CustomCheckbox
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
        <div v-else>
            <div
                v-for="filterName in Object.keys(searchFilters)"
                :key="filterName"
                class="filter filter-generic"
            >
                <div
                    class="-title"
                    v-html="filterName"
                />

                <ul>
                    <li
                        v-for="filter in searchFilters[filterName]"
                        :key="`${filterName}.${filter.key}`"
                        class="filter-option"
                    >
                        <CustomCheckbox
                            :text="filter.key"
                            :color="filter.color"
                            :image="filter.image_url"
                            :checked="activeCustomFilterKeys.includes(`${filterName}-${filter.key}`)"
                            @change="updateSearchSelectedAttributes({attributeName: filterName, value: filter.key}, $event)"
                        >
                            <template #count>
                                <span v-if="filter.count">{{ `(${filter.count})` }}</span>
                            </template>
                        </CustomCheckbox>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BaseFilter from '@/components/category/filters/BaseFilter.vue';

export default {
    name: 'FilterCustom',

    extends: BaseFilter,

    props: {
        searchFilters: {
            type: Object,
            default: () => ({}),
        },
    },

    data: () => ({
        route: 'filters',
        mainQueryString: 'filter_id',
        searchSelectedAttributes: [],
    }),

    computed: {
        activeCustomFilterKeys() {
            return this.searchSelectedAttributes.map(attr => {
                const selectedValues = `${attr.attributeName}-${attr.value}`;
                return selectedValues;
            }).flat();
        },
    },

    mounted() {
        if (!this.shouldUseNewSearchStrategy) {
            return;
        }
        this.parseAttributes(this.queryParams.attributes).forEach(attribute => {
            this.updateSearchSelectedAttributes(attribute, true);
        });
    },

    methods: {
        updateSearchSelectedAttributes(attributes, $event) {
            if ($event) {
                this.searchSelectedAttributes = [...this.searchSelectedAttributes, attributes];
            } else {
                this.searchSelectedAttributes = this
                    .searchSelectedAttributes
                    .filter(
                        attr => !(attr.attributeName === attributes.attributeName && attr.value === attributes.value),
                    );
            }

            this.mainQueryString = 'attributes';

            this.updateFilterAttributes({
                filterData: {
                    id: `${attributes.attributeName}-${attributes.value}`,
                    key: 'attributes',
                    query: {
                        attributes,
                    },
                    alias: `${attributes.attributeName}-${attributes.value}`,
                    name: attributes.value,
                    active: $event,
                },
                allActiveFilters: this.searchSelectedAttributes,
            });
        },

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
            if (filter.key === 'attributes') {
                this.searchSelectedAttributes = this.searchSelectedAttributes.filter(
                    attr => !(attr.value === filter.name),
                );
                return;
            }

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
