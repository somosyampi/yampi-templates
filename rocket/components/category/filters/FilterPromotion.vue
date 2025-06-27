<template>
    <div
        v-if="payload.length"
        class="filter filter-category"
    >
        <div class="-title">
            Promoções
        </div>

        <ul>
            <li
                v-for="promotion in payload"
                :key="promotion.id"
                class="filter-option"
            >
                <CustomCheckbox
                    :text="promotion.name"
                    :checked="promotion.active"
                    @change="updateFilterStatus(promotion, $event)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import BaseFilter from '@/components/category/filters/BaseFilter.vue';

export default {
    name: 'FilterPromotion',

    extends: BaseFilter,

    props: {
        activePromotion: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        route: 'promotions',
        mainQueryString: 'promotion_id',
    }),
};
</script>
