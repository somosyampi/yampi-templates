<template>
    <div
        v-if="currentPayload.length"
        class="filter filter-category"
    >
        <div class="-title">
            Categorias
        </div>

        <ul :class="{ '-category': !showCheckbox }">
            <li
                v-for="category in currentPayload"
                :key="category.id"
                :class="{ 'filter-option': showCheckbox }"
            >
                <CustomCheckbox
                    v-if="showCheckbox"
                    :text="category.name"
                    :checked="category.active"
                    @change="updateFilterStatus(category, $event)"
                >
                    <template #count>
                        <span v-if="category.count">{{ `(${category.count})` }}</span>
                    </template>
                </CustomCheckbox>

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

        allCategories: {
            type: Array,
            default: () => [],
        },
    },

    data: () => ({
        route: 'categories',
        mainQueryString: 'category_id',
    }),

    computed: {
        currentPayload() {
            const filterData = this.shouldUseNewSearchStrategy
                ? this.allCategories
                : this.payload;

            return this.processQueryParams(filterData);
        },
    },

    mounted() {
        if (!this.shouldUseNewSearchStrategy) {
            return;
        }

        this.mainQueryString = 'categories_name';
    },
};
</script>
