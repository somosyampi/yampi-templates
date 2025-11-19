<template>
    <div class="filter filter-brand">
        <div class="-title">
            Marca
        </div>

        <ul>
            <li
                v-for="brand in currentPayload"
                :key="brand.id"
                class="filter-option"
            >
                <CustomCheckbox
                    :text="brand.name"
                    :checked="brand.active"
                    @change="updateFilterStatus(brand, $event)"
                >
                    <template #count>
                        <span v-if="brand.count">{{ `(${brand.count})` }}</span>
                    </template>
                </CustomCheckbox>
            </li>
        </ul>
    </div>
</template>

<script>
import BaseFilter from '@/components/category/filters/BaseFilter.vue';

export default {
    name: 'FilterBrand',

    extends: BaseFilter,

    props: {
        allBrands: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        route: 'brands',
        mainQueryString: 'brand_id',
    }),

    computed: {
        currentPayload() {
            const filterData = this.shouldUseNewSearchStrategy
                ? this.allBrands
                : this.payload;

            return this.processQueryParams(filterData);
        },
    },

    mounted() {
        if (!this.shouldUseNewSearchStrategy) {
            return;
        }

        this.mainQueryString = 'brand_name';
    },
};
</script>
