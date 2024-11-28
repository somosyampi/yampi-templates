<template>
    <div v-if="mounted">
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
import { mapActions } from '~/vuex';

export default {
    name: 'Filters',
    
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
    
    data() {
        return {
            mounted: false
        }
    },
    
    computed: {
        showCategoryCheckbox() {
            return window.data.context !== 'category';
        },
    },
    
    async mounted() {
        await this.bootQueryParams();
        this.mounted = true;
    },
    
    methods: {
        ...mapActions('filters', [
            'bootQueryParams',
        ]),
        
        closeMobileFilters() {
            document.querySelector('.filters-trigger .over-background').dispatchEvent(new Event('mousedown'));
        },
    },
};
</script>
