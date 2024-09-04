<template>
    <div
        :class="{
            'product-cart-box__container': !isCombo,
            'product-cart-box__container--combo': isCombo
        }"
    >
        <div class="product-cart-box__metadata">
            <div class="product-cart-box__holder-image">
                <div class="image-ratio">
                    <CustomImage
                        :src="product.small"
                        alt="Imagem do Produto"
                        :thumbor="{ resize: '60x60' }"
                    />
                </div>
            </div>

            <div class="product-cart-box__text--holder-info">
                <div
                    class="product-cart-box__text--product-name"
                    v-text="product.name"
                />

                <div class="product-cart-box__text--product-extra">
                    <ul class="mb-3">
                        <li
                            v-for="grid in product.grids"
                            :key="grid.name + grid.value"
                            class="product-cart-box__text--sku"
                        >
                            {{ grid.name }}: {{ grid.value }}
                        </li>
                    </ul>

                    <div
                        v-for="customization in filteredCustomizations"
                        :key="customization.name + customization.selected_value"
                        class="product-cart-box__text--customization"
                    >
                        {{ customization.name }}: {{ customization.selected_value }}
                        <span class="product-cart-box__text--customization--price">
                            (+ {{ customization.price_formated }})
                        </span>
                    </div>
                </div>

                <div
                    v-if="showProductQuantity"
                    class="product-cart-box__text--quantity"
                >
                    Qtd.: {{ product.quantity }}
                </div>

                <div v-if="showProductTotalPrice">
                    <div v-if="shouldShowProductSavings">
                        <div class="product-cart-box__text--price-discount">
                            {{
                                originalProductPrice
                                    | formatMoney
                            }}
                        </div>
                        <div class="product-cart-box__text--price">
                            {{ product.price_total_formated }}
                        </div>

                        <div
                            v-if="showProductCartSavings"
                            class="product-cart-box__discount-tag mt-10"
                        >
                            <div class="product-cart-box__discount-tag-text">
                                {{
                                    (originalProductPrice -
                                        product.price)
                                        | formatMoney
                                }}
                                mais barato
                            </div>
                        </div>
                    </div>

                    <div
                        v-else
                        class="product-cart-box__text--price"
                    >
                        {{ product.price_total | formatMoney }}
                    </div>
                </div>
            </div>

            <div
                v-if="!product.kit_id"
                class="product-cart-box__holder-actions"
            >
                <QuantitySelector
                    :value="product.quantity"
                    :disabled="loading[product.id]"
                    :class="{
                        'is-preview': isPreview
                    }"
                    @change="handleQuantityChange(product, $event)"
                />

                <div
                    class="product-cart-box__text--remove"
                    :class="{ loading: loading[product.id] }"
                    @click="remove({ item: product })"
                >
                    Remover
                </div>
            </div>
        </div>

        <div
            v-if="product.error"
            class="product-cart-box__text--error"
            v-text="product.error"
        />
    </div>
</template>

<script>
import BaseCart from '@/components/BaseCart.vue';

export default {
    name: 'ProductCartBox',

    extends: BaseCart,

    props: {
        product: {
            type: Object,
            required: true,
        },

        showProductTotalPrice: {
            type: Boolean,
            default: true,
        },

        showProductQuantity: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        isCombo() {
            return !!this.product.kit_id;
        },

        filteredCustomizations() {
            return this.product.customizations.filter(
                customization => customization.selected_value !== null,
            );
        },

        originalProductPrice() {
            return parseFloat(this.product.price_sale)
                + this.getTotalCustomizationValues();
        },

        shouldShowProductSavings() {
            return (this.originalProductPrice - this.product.price) > 0;
        },
    },

    methods: {
        getTotalCustomizationValues() {
            if (!this.filteredCustomizations) {
                return 0;
            }

            return this.filteredCustomizations.reduce(
                (total, customization) => total + parseFloat(customization.price),
                0,
            );
        },
    },
};
</script>
