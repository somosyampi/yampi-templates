<template>
    <div>
        <FilterCategory
            v-if="showCategories"
            :show-checkbox="showCategoryCheckbox"
            :active-category="activeCategory"
        />

        <FilterPrice
            v-if="showPrice"
        />

        <FilterBrand
            v-if="showBrand"
        />

        <FilterCustom />

        <FilterPromotion
            v-if="showPromotions"
            :active-promotion="activePromotion"
        />

        <button
            class="btn btn-secundary mobile -block"
            @click="closeMobileFilters"
        >
            VER PRODUTOS
        </button>
    </div>
</template>

<script>
import FilterCategory from './filters/Category';
import FilterBrand from './filters/Brand';
import FilterPrice from './filters/Price';
import FilterCustom from './filters/Custom';
import FilterPromotion from './filters/Promotion';

export default {
    name: 'Filters',

    components: {
        FilterCategory,
        FilterBrand,
        FilterPrice,
        FilterCustom,
        FilterPromotion,
    },

    props: {
        showBrand: {
            type: Boolean,
            default: true,
        },

        showPrice: {
            type: Boolean,
            default: true,
        },

        showCategories: {
            type: Boolean,
            default: true,
        },

        showPromotions: {
            type: Boolean,
            default: false,
        },

        activeCategory: {
            type: String,
            default: '',
        },

        activePromotion: {
            type: String,
            default: '',
        },
    },

    computed: {
        showCategoryCheckbox() {
            return window.data.context !== 'category';
        },
    },

    methods: {
        closeMobileFilters() {
            document.querySelector('.filters-trigger .over-background').dispatchEvent(new Event('mousedown'));
        },
    },
};
</script>
