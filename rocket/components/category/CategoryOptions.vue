<template>
    <div
        v-if="isMobile"
        class="category-options flex"
    >
        <div
            v-if="showSort"
            class="holder-sort flex -vcenter -hcenter"
        >
            <i class="icon icon-order" />
            <select
                is="custom-select"
                id="category-order-select"
                name="category-order"
                :value="selectedOrder"
                @change="updateOrderBy"
            >
                <option
                    selected
                    value="relevance"
                >
                    Relevância
                </option>
                <option value="best_sellers">Mais vendidos</option>
                <option value="highest_price">Maior preço</option>
                <option value="lowest_price">Menor preço</option>
                <option value="newest">Lançamentos</option>
                <option value="rating">Melhor avaliação</option>
                <option
                    v-if="!shouldUseNewSearchStrategy"
                    value="name_asc"
                >
                    A-Z
                </option>
                <option
                    v-if="!shouldUseNewSearchStrategy"
                    value="name_desc"
                >
                    Z-A
                </option>
            </select>
        </div>
        <div
            class="holder-grid-type flex -vcenter -hcenter"
            @click="updateGrid"
        >
            <i
                class="icon"
                :class="{
                    'icon-mosaic': !isMosaic,
                    'icon-list': isMosaic
                }"
            />
            <span>{{ isMosaic ? 'Lista' : 'Mosaico' }}</span>
        </div>
        <SideBarTrigger
            v-if="showFilters"
            class="flex -vcenter -hcenter"
            active-class="active-filters"
            name="filters"
        >
            <i class="icon icon-filters" />
            <span>Filtrar</span>
        </SideBarTrigger>
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
            default: 'relevance',
        },
    },

    data: () => ({ }),

    computed: {
        shouldUseNewSearchStrategy() {
            const { new_search } = this.$store.getters['merchant/storeModules'];
            return new_search;
        },
    },

    mounted() {},

    methods: {
        updateOrderBy(value) {
            this.$emit('change', value);
        },

        updateGrid() {
            this.$emit('change-grid', !this.isMosaic);
        },
    },
};
</script>
