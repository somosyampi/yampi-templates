<template>
    <div
        class="product-prices"
        :class="`--space-top-${spaceBetweenNamePrice}`"
    >
        <div v-if="!loadingPrices && Object.keys(productPrices).length">
            <div class="flex -vcenter -wrap">
                <span
                    v-if="hasPromotion"
                    class="product-old-price"
                    :class="`--font-size-${oldPriceSize}`"
                >
                    {{ productPrices?.price_sale_formated }}
                </span>
                <span
                    class="product-actual-price"
                    :class="{ '--small-cents-price': smallCentsPrice }"
                >
                    <div>
                        <span v-html="selectedPrice" />
                        <span
                            v-if="hasPrice"
                            class="payment-type"
                        > {{ priceText }}</span>
                    </div>
                </span>
            </div>
            <div v-if="showMaxInstallment && !!productPrices.price">
                <InstallmentsText
                    :product="product?.content || product"
                    :product-prices="productPrices"
                />
            </div>
        </div>
        <div v-else>
            <Loader
                :width="100"
                :height="36"
            />
        </div>
    </div>
</template>

<script>
import pricesMixin from '@/mixins/prices';
import productCardTheme from '@/mixins/productCardTheme';

export default {
    name: 'ProductCardPrices',

    mixins: [
        pricesMixin,
        productCardTheme,
    ],

    props: {
        product: { type: Object, required: true },
    },
};
</script>
