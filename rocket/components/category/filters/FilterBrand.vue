<template>
    <div class="filter filter-brand">
        <div class="-title">
            Marca
        </div>

        <ul>
            <li
                v-for="brand in payload"
                :key="brand.id"
                class="filter-option"
            >
                <CustomCheckbox
                    :text="brand.name"
                    :checked="brand.active"
                    @change="updateFilterStatus(brand, $event)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import BaseFilter from '@/components/category/filters/BaseFilter.vue';

export default {
    name: 'FilterBrand',

    extends: BaseFilter,

    data: () => ({
        route: 'brands',
        mainQueryString: 'brand_id',
    }),
};
</script>
