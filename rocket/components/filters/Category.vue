<template>
    <div class="filter filter-category" v-if="payload.length">
        <div class="-title">Categorias</div>

        <ul :class="{ '-category': !showCheckbox }">
            <li
                v-for="category in payload"
                :key="category.id"
                :class="{ 'filter-option': showCheckbox }"
            >
                <custom-checkbox
                    v-if="showCheckbox"
                    :text="category.name"
                    :checked="category.active"
                    @change="updateFilterStatus(category, $event)"
                ></custom-checkbox>

                <a
                    v-else
                    :class="{ active: category.name === activeCategory}"
                    :href="category.url_path"
                    v-text="category.name"
                ></a>
            </li>
        </ul>
    </div>
</template>

<script>
import BaseFilter from './BaseFilter';

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
            default: ''
        }
    },

    data: () => ({
        route: 'categories',
        mainQueryString: 'category_id',
    }),
};
</script>
