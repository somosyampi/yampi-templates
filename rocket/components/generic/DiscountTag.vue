<template>
    <div
        v-if="discountValue > 0"
        class="discount-tag"
    >
        <span>{{ discountValue }}</span>
    </div>
</template>

<script>
import pricesMixin from '@/mixins/prices';

export default {
    name: 'DiscountTag',

    mixins: [
        pricesMixin,
    ],

    props: {
        product: { type: Object, default: null },

        // Na página de produto o desconto é computado com base no
        // SKU escolhido, que já passa o valor correto
        value: { type: Number, default: null },
    },

    computed: {
        discountValue() {
            return this.product ? this.percentDiscount : (this.value || 0);
        },
    },

    methods: {
        // Somente busca o preço se um produto foi passado. Quando value
        // é passado não precisa cair no fallback de window.data
        updateProductPricesParams() {
            const productId = this.product?.content?.id || this.product?.id;

            if (productId) {
                this.productPricesParams = { product_id: productId };
            }
        },
    },
};
</script>
