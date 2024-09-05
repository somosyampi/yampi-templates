<template>
    <section
        v-if="payload.length || loading"
        v-observe-visibility="{
            callback: visibilityChanged,
            once: true,
        }"
        class="buy-together container"
    >
        <div
            class="theme-title"
            :class="{ '-loading': loading }"
        >
            {{ title }}
        </div>

        <Combo
            v-for="combo in payload"
            :key="combo.id"
            :current-combo-key="currentComboId"
            :combo="combo"
            :buy-button-text="buyButtonText"
            :show-modal-after-purchase="showModalAfterPurchase"
            :center="center"
            @updateCurrentComboKey="updateComboKey"
        />
    </section>
</template>

<script>
import { mapMutations } from '~vuex';
import BaseProduct from '@/components/product/BaseProduct.vue';

export default {
    name: 'ProductCombos',

    extends: BaseProduct,

    props: {
        title: {
            type: String,
            default: 'Compre junto e economize',
        },

        buyButtonText: {
            type: String,
            default: 'Comprar',
        },

        showModalAfterPurchase: {
            type: Boolean,
            default: false,
        },

        center: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        route: 'combos?expired=false',
        currentComboId: '',
    }),

    watch: {
        payload(newVal) {
            this.SET_COMBOS(newVal);
        },
    },

    methods: {
        ...mapMutations('buyTogether', ['SET_COMBOS']),

        updateComboKey(currentComboKey) {
            this.currentComboId = currentComboKey;
        },
    },
};
</script>
