<template>
    <div
        class="-clear box-product product-card"
        :class="[
            { '-center': isTextCentered },
            flagDisplayClass
        ]"
    >
        <a
            :href="`/${product?.content.slug}/p`"
            class="-clean product-card-container"
        >
            <div class="holder-image relative-tags">
                <DiscountTag
                    v-if="showDiscountTag"
                    :value="percentDiscount"
                />
                <div
                    class="image-ratio"
                    :class="`--${imageFitBehavior}`"
                >
                    <img
                        v-lazyload
                        fetchpriority="high"
                        decoding="async"
                        :src="placeholder"
                        :alt="product.content?.name"
                        :data-src="$thumborize(product.content.image_url, { resize: selectedImageSize })"
                        class="-loading"
                    >
                </div>
                <BuyButton
                    v-if="showAddToCartButton && !isTextAndIconButton"
                    :has-button-style="true"
                    :product="product.content"
                >
                    <template #default>
                        <IconBuyButton :icon-color="iconColor" />
                    </template>
                </BuyButton>
                <Flags
                    v-if="themeStyle?.grids_label_position === 'above_image'"
                    :product-id="product.content.id"
                />
            </div>
            <div
                class="holder-info"
                :class="`--space-bottom-${spaceBelowImage}`"
            >
                <Flags
                    v-if="themeStyle?.grids_label_position !== 'above_image'"
                    :product-id="product.content.id"
                />
                <AverageRating
                    v-if="showReviewAverage"
                    :product="product.content"
                    :class="`${isTextCentered ? '-center' : ''}`"
                    :is-grid="true"
                    :color-star-icon="reviewAverageStarColor"
                />
                <div
                    v-if="showBrand"
                    class="product-brand ellipsis"
                >
                    {{ product?.content?.brand?.name }}
                </div>
                <div class="product-name ellipsis-multiline l2">
                    {{ product?.content?.name }}
                </div>
                <ProductCardPrices :product="product" />
                <BuyButton
                    v-if="showAddToCartButton && isTextAndIconButton"
                    :has-button-style="true"
                    :is-text-and-icon-button="true"
                    class="--space-top-medium"
                    :product="product.content"
                >
                    <template #default>
                        <IconBuyButton :icon-color="iconColor" />
                        <span class="text">
                            {{ quickBuyTextButton }}
                        </span>
                    </template>
                </BuyButton>
            </div>
        </a>
    </div>
</template>

<script>
import pricesMixin from '@/mixins/prices';
import productCardTheme from '@/mixins/productCardTheme';

export default {
    name: 'ProductCard',

    mixins: [
        pricesMixin,
        productCardTheme,
    ],

    props: {
        product: { type: Object, required: true },

        imageSize: { type: String, default: 'default' },
    },

    data() {
        return {
            productSku: {},
        };
    },

    computed: {
        selectedImageSize() {
            const options = {
                medium: '500x500',
                default: '275x275',
            };
            return options[this.imageSize] || options.default;
        },

        placeholder() {
            return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        },
    },
};
</script>
