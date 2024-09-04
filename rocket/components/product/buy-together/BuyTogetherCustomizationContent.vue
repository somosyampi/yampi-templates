<template>
    <div
        v-if="sku"
        class="buy-together-content"
    >
        <div
            class="product-description"
            aria-labelledby="sku-title"
        >
            <img :src="skuImageUrl">
            <div class="text">
                <div
                    id="sku-title"
                    class="sku-title"
                >
                    {{ sku.title }}
                </div>

                <ul v-if="sku.variations.length">
                    <li
                        v-for="variation in sku.variations"
                        :key="variation.name"
                    >
                        {{ variation.name }}:
                        {{ variation.value }}
                    </li>
                </ul>
            </div>
        </div>

        <CustomizationContent
            ref="customizationContent"
            :sku="sku"
        />
    </div>
</template>

<script>
import _omit from 'lodash/omit';
import { mapActions, mapGetters } from 'vuex';
import CustomizationContent from '@/components/product/CustomizationContent';
import { smoothScroll } from '@/mixins/helpers';

export default {
    name: 'BuyTogetherCustomizationContent',

    components: {
        CustomizationContent,
    },

    props: {
        sku: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            skuCustomized: false,
        };
    },

    computed: {
        ...mapGetters('buyTogether', ['customizedProducts']),

        skuImageUrl() {
            return this.sku.images.data.length ? this.sku.images.data[0].url : '';
        },
    },

    watch: {
        showContent(newVal) {
            const element = document.getElementsByClassName('buy-together-modal-form');
            if (newVal) {
                this.smoothScroll(element[0], 0, this.$el.offsetHeight);
            }
        },
    },

    mounted() {
        if (!this.sku.allow_sell_without_customization && !this.customizedProducts[this.sku.id]) {
            this.$refs.customizationContent.updateAllCustomizations('');
        }

        if (this.customizedProducts[this.sku.id]) {
            this.showContent = this.customizedProducts[this.sku.id].isPersonalized;
            this.values = _omit(this.customizedProducts[this.sku.id], ['isPersonalized']);
        }
    },

    methods: {
        ...mapActions('buyTogether', ['addSkuCustomization', 'removeCustomization']),

        smoothScroll,
    },
};
</script>
