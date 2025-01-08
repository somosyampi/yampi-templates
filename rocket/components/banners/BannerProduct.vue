<template>
    <div class="holder-banner-product flex">
        <div class="holder flex -hcenter">
            <div class="holder-image relative-tags">
                <div class="holder-image">
                    <discount-tag
                        :value="product.prices.data.percent_discount"
                    ></discount-tag>

                    <!-- @TODO: Add Thumbor -->
                    <CustomImage
                        :src="product.images.data[0].url"
                        :alt="product.name"
                    ></CustomImage>

                    <Flags :product="product" v-if="!isMobile"></Flags>
                </div>
            </div>

            <div class="holder-info">
                <Flags :product="product" v-if="isMobile"></Flags>

                <div
                    class="product-brand ellipsis"
                    v-text="product.brand.data.name"
                    v-if="product.brand.data"
                ></div>

                <div
                    class="product-name ellipsis-multiline l2"
                    v-text="product.name"
                ></div>

                <div class="product-prices">
                    <div
                        class="product-old-price old-price"
                        v-text="product.prices.data.price_sale_formated"
                        v-if="product.prices.data.price_discount"
                    ></div>

                    <div
                        class="product-actual-price price"
                        v-text="product.prices.data.price_formated"
                    ></div>

                    <Installments :product="product"></Installments>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BannerProduct',

    props: {
        product: {
            type: Object,
            required: true,
        },

        isMobile: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
