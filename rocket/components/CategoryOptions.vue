<template>
    <div class="category-options flex" v-if="isMobile">
        <div
            class="holder-sort flex -vcenter -hcenter"
            v-if="showSort"
        >
            <i class="icon icon-order"></i>
            <select
                is="custom-select"
                id="category-order-select"
                name="category-order"
                :value="selectedOrder"
                @change="updateOrderBy"
            >
                <option selected value="relevance">Relevância</option>
                <option value="best_sellers">Mais vendidos</option>
                <option value="highest_price">Maior preço</option>
                <option value="lowest_price">Menor preço</option>
                <option value="newest">Lançamentos</option>
                <option value="rating">Melhor avaliação</option>
                <option value="name_asc">A-Z</option>
                <option value="name_desc">Z-A</option>
            </select>
        </div>
        <div class="holder-grid-type flex -vcenter -hcenter" @click="updateGrid">
            <i
                class="icon"
                :class="{
                    'icon-mosaic': !isMosaic,
                    'icon-list': isMosaic
                }"
            ></i>
            <span>{{ isMosaic ? 'Lista' : 'Mosaico' }}</span>
        </div>
        <side-bar-trigger
            class="flex -vcenter -hcenter"
            active-class="active-filters"
            name="filters"
            v-if="showFilters"
        >
            <i class="icon icon-filters"></i>
            <span>Filtrar</span>
        </side-bar-trigger>
    </div>
</template>

<script>
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'CategoryOptions',

    mixins: [
        mobileMixin,
    ],


    props: {
        isMosaic: {
            type: Boolean,
            required: true,
        },

        showSort: {
            type: Boolean,
            required: true,
        },

        showFilters: {
            type: Boolean,
            required: true,
        },

        selectedOrder: {
            type: String,
            default: 'relevance'
        }
    },

    mounted() {},

    data: () => ({ }),

    methods: {
        updateOrderBy(value) {
            this.$emit('change', value);
        },

        updateGrid() {
            this.$emit('change-grid', !this.isMosaic);
        }
    },
};
</script>
