<template>
    <div
        v-if="payload.length"
        class="filter filter-category"
    >
        <div class="-title">
            Categorias
        </div>

        <ul :class="{ '-category': !showCheckbox }">
            <li
                v-for="category in payload"
                :key="category.id"
                :class="{ 'filter-option': showCheckbox }"
            >
                <CustomCheckbox
                    v-if="showCheckbox"
                    :text="category.name"
                    :checked="category.active"
                    @change="updateFilterStatus(category, $event)"
                />

                <a
                    v-else
                    :class="{ active: category.name === activeCategory}"
                    :href="category.url_path"
                    v-text="category.name"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import BaseFilter from '@/components/category/filters/BaseFilter.vue';

export default {
    name: 'FilterCategory',

    extends: BaseFilter,

    props: {
        showCheckbox: {
            type: Boolean,
            default: true,
        },

        activeCategory: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        route: 'categories',
        mainQueryString: 'category_id',
    }),
};
</script>
