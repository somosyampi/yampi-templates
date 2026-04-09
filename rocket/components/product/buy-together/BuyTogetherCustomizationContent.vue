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
import _ from '~/lodash';
import { smoothScroll } from '@/mixins/helpers';

export default {
    name: 'BuyTogetherCustomizationContent',

    props: {
        sku: {
            type: Object,
            default: () => {},
        },

        customizedProducts: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            skuCustomized: false,
        };
    },

    computed: {
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
            if (this.$refs.customizationContent) {
                this.$refs.customizationContent.updateAllCustomizations('');
            }
        }

        if (this.customizedProducts[this.sku.id]) {
            this.showContent = this.customizedProducts[this.sku.id].isPersonalized;
            this.values = _.omit(this.customizedProducts[this.sku.id], ['isPersonalized']);
        }
    },

    methods: {
        smoothScroll,
    },
};
</script>
