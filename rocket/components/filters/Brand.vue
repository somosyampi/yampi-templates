<template>
    <div class="filter filter-brand">
        <div class="-title">Marca</div>

        <ul>
            <li
                class="filter-option"
                v-for="brand in payload"
                :key="brand.id"
            >
                <custom-checkbox
                    :text="brand.name"
                    :checked="brand.active"
                    @change="updateFilterStatus(brand, $event)"
                ></custom-checkbox>
            </li>
        </ul>
    </div>
</template>

<script>
import BaseFilter from '@/components/filters/BaseFilter.vue';

export default {
    name: 'FilterBrand',

    extends: BaseFilter,

    data: () => ({
        route: 'brands',
        mainQueryString: 'brand_id',
    }),
};
</script>
