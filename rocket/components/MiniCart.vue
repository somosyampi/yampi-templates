<template>
    <div
        class="dropdown-holder"
        @mouseenter="mouseHover = true"
        @mouseleave="mouseHover = false"
    >
        <div
            class="-align -clean"
            @click="cartRedirectAction"
        >
            <svg
                width="23"
                height="21"
                class="cart-icon"
            ><defs>
                <!-- eslint-disable -->
                <path
                    id="reuse-1"
                    d="M9.705 15.205a2.423 2.423 0 00-2.423 2.443C7.282 19.005 8.36 20 9.705 20a2.423 2.423 0 002.423-2.443c0-1.357-1.077-2.352-2.423-2.352zm1.167 2.352c0 .634-.539 1.176-1.167 1.176s-1.167-.543-1.167-1.176c0-.633.539-1.176 1.167-1.176s1.167.543 1.167 1.176zM16.167 15.205a2.423 2.423 0 00-2.423 2.443 2.423 2.423 0 104.846 0 2.423 2.423 0 00-2.423-2.443zm1.166 2.352c0 .634-.538 1.176-1.166 1.176-.629 0-1.167-.543-1.167-1.176 0-.633.539-1.176 1.167-1.176s1.166.543 1.166 1.176z"
                />
                <path
                    id="reuse-0"
                    clip-rule="evenodd"
                    d="M1.718 1C1.359 1 1 1.362 1 1.724s.359.724.718.724h1.885l1.525 5.79 1.077 4.524c.18.724.808 1.267 1.526 1.267H18.5c.718 0 1.346-.453 1.526-1.177L21.91 6.52c.18-.452.09-.995-.269-1.448-.27-.452-.808-.633-1.256-.633H5.577l-.718-2.895v-.09C4.679 1.18 4.41 1 4.141 1H1.718zm18.936 4.795l-1.974 6.696H7.64L6.026 5.795h14.628z"
                />
                <!-- eslint-enable -->
            </defs><use
                clip-rule="evenodd"
                xlink:href="#reuse-0"
            /><use xlink:href="#reuse-1" /><use
                clip-rule="evenodd"
                xlink:href="#reuse-0"
            /><use xlink:href="#reuse-1" /></svg>

            <span
                class="cart-quantity"
                :class="{ '-loading': anyLoading }"
                v-text="cartQuantity"
            />
        </div>
        <component
            :is="cartComponent"
            ref="cartComponent"
            :show-cart-savings="showCartSavings"
            :show-product-cart-savings="showProductCartSavings"
            :mouse-hover="mouseHover"
            :empty-cart-helper-text="emptyCartHelperText"
            :empty-cart-text-button="emptyCartTextButton"
            :empty-cart-link-button="emptyCartLinkButton"
            :highlighted-price="highlightedPrice"
        />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from '~/vuex';
import BaseCart from '@/components/BaseCart.vue';

export default {
    name: 'MiniCart',

    extends: BaseCart,

    props: {
        cartType: {
            type: String,
            default: 'suspended',
            validator: cartType => ['suspended', 'side_cart'].includes(cartType),
        },

        showCartSavings: {
            type: Boolean,
            required: true,
        },

        showProductCartSavings: {
            type: Boolean,
            required: true,
        },
        emptyCartHelperText: {
            type: String,
            required: false,
            default: 'Navegue pela loja e adicione produtos.',
        },
        emptyCartTextButton: {
            type: String,
            required: true,
        },
        emptyCartLinkButton: {
            type: String,
            required: true,
            default: '',
        },
        highlightedPrice: {
            type: String,
            required: true,
            default: '',
        },
    },

    data() {
        return {
            mouseHover: false,
        };
    },

    watch: {
        mouseHover(isEntering) {
            if (!isEntering && this.isPreview && !this.items.length) {
                this.bootCart();
            }
        }
    },


    computed: {
        ...mapGetters('merchant', ['merchant']),

        ...mapGetters('preview', ['isPreview']),

        cartComponent() {
            const mapCartComponent = {
                'suspended': 'dropdown-cart',
                'side_cart': 'side-cart'
            }
            return mapCartComponent[this.cartType] || 'dropdown-cart';
        },

        cartRedirectAction() {
            const actions = {
                suspended: () => {
                    if (this.isPreview) {
                        return;
                    }

                    window.location.assign(this.redirectUrl);
                },
                side_cart: () => {
                    this.$refs.cartComponent.handleShow();
                },
            };

            return actions[this.cartType] || actions.suspended;
        },
    },

    async mounted() {
        this.SET_CART_TYPE(this.cartType);
        await this.bootCart();
    },

    methods: {
        ...mapMutations('cart', ['SET_CART_TYPE']),

    },
};
</script>
