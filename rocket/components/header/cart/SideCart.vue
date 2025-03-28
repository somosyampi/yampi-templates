<template>
    <NavigationDrawer
        ref="navigationDrawer"
        @beforeEnter="handleBeforeEnter"
        @afterEnter="handleAfterEnter"
        @afterLeave="handleAfterLeave"
    >
        <div class="side-cart-container">
            <div
                class="side-cart-header"
                :class="{
                    '--overflows': isOverflowing
                }"
            >
                <div class="theme-title side-cart-title">
                    Meu carrinho
                </div>
                <div
                    class="close-modal"
                    @click="handleShow"
                >
                    <i class="icon icon-close-modal" />
                </div>
            </div>
            <div
                v-if="!items.length && !loading.all"
                class="empty-cart"
            >
                <i class="icon icon-empty-cart" />
                <div class="-title">
                    Seu carrinho está vazio
                </div>

                <span>
                    <div
                        v-if="emptyCartHelperText"
                        class="-subtitle"
                        v-html="emptyCartHelperText"
                    />
                    <div
                        v-else
                        class="-subtitle"
                    >
                        Navegue pela loja e adicione produtos.
                    </div>
                </span>

                <div
                    v-if="emptyCartTextButton"
                    class="-cta-holder"
                >
                    <a
                        class="-cta"
                        @click="linkValidation()"
                    >
                        {{ emptyCartTextButton }}
                    </a>
                </div>
                <div
                    v-else
                    class="continue-buying"
                    @click="handleShow"
                >
                    <span><SelectArrow class="icon icon-select-arrow -left" /></span>
                    Continuar comprando
                </div>
            </div>

            <div
                v-else
                class="side-cart-content"
                :class="{
                    '--overflows': isOverflowing
                }"
            >
                <div
                    ref="sideCartProductList"
                    class="side-cart-products-list"
                    :class="{
                        '--overflows': isOverflowing
                    }"
                >
                    <BuyTogetherCartGroup
                        :buy-together-items="buyTogetherItems"
                        :loading="loading"
                        @removeCombo="handleRemoveCombo"
                    />

                    <div
                        v-for="item in sortedByFreebies.filter((item) => !item.kit_id)"
                        :key="item.id"
                        :class="{
                            loading: loading[item.id],
                            '-vcenter': item.kit_id
                        }"
                    >
                        <ProductCartBox
                            :product="item"
                            :show-product-quantity="false"
                            :show-product-cart-savings="showProductCartSavings"
                        />
                    </div>
                </div>
                <Transition name="fade">
                    <div
                        v-if="showButton"
                        class="side-cart-button-container"
                        :class="{
                            '--overflows': isOverflowing
                        }"
                    >
                        <div
                            class="side-cart-total-value"
                        >
                            <div class="side-cart-row mb-15">
                                <div class="side-cart-total-text">
                                    PRODUTOS ({{
                                        $tc(
                                            'cart.amount-of-products',
                                            parseInt(cart.prices.total_items),
                                            {
                                                count: parseInt(cart.prices.total_items)
                                            }
                                        )
                                    }})
                                </div>
                                <div class="side-cart-subtotal">
                                    {{ totalCartValue | formatMoney }}
                                </div>
                            </div>
                            <div
                                v-if="shouldShowCartSavings"
                                class="side-cart-row mb-21"
                                :class="{ shake: animate }"
                            >
                                <div class="side-cart-savings-text">
                                    VOCÊ ESTÁ ECONOMIZANDO
                                </div>
                                <div class="side-cart-savings-price">
                                    {{ totalCartSavings | formatMoney }}
                                </div>
                            </div>
                        </div>
                        <hr
                            v-if="shouldShowCartSavings"
                            class="mb-20"
                        >
                        <div class="side-cart-total-value mb-22">
                            <div class="side-cart-row">
                                <span class="side-cart-total-text">SUBTOTAL</span>
                                <span
                                    class="side-cart-subtotal-after-discounts"
                                >{{ cartValue }}
                                </span>
                            </div>
                        </div>

                        <div
                            v-if="highlightedPrice === 'billet'"
                            class="side-cart-total-value mb-24"
                        >
                            <div class="side-cart-row">
                                <span class="side-cart-total-text">
                                    <b>{{ getCartValueByPaymentMethod.percentage }}% DE DESCONTOS</b> NO BOLETO</span>
                                <span>
                                    <b>{{ getCartValueByPaymentMethod.value | formatMoney }}</b>
                                </span>
                            </div>
                        </div>

                        <div
                            v-if="highlightedPrice === 'pix'"
                            class="side-cart-total-value mb-24"
                        >
                            <div class="side-cart-row">
                                <span class="side-cart-total-text">
                                    <b>{{ getCartValueByPaymentMethod.percentage }}% DE DESCONTOS</b> NO PIX</span>
                                <span>
                                    <b>{{ getCartValueByPaymentMethod.value | formatMoney }}</b>
                                </span>
                            </div>
                        </div>

                        <LoaderButton
                            class="btn btn-primary side-cart-button"
                            :title="buttonText"
                            :sending="anyLoading"
                            :disabled="anyLoading"
                            @click="redirect()"
                        />

                        <Cashback
                            v-if="hasCashbackValid"
                            class="mt-21"
                            :percent-amount="validCashback.percent_amount"
                            text-align="center"
                        />
                    </div>
                </Transition>
            </div>
        </div>
    </NavigationDrawer>
</template>

<script>
import BaseCart from '@/components/header/cart/BaseCart.vue';

export default {
    name: 'SideCart',

    extends: BaseCart,

    props: {
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
            default: '/',
        },

        highlightedPrice: {
            type: String,
            required: true,
            default: '',
        },

    },

    data() {
        return {
            isOverflowing: false,
            showButton: false,
            animate: false,
        };
    },

    computed: {
        isVisible() {
            return this.$refs.navigationDrawer.active;
        },
    },

    watch: {
        cartQuantity() {
            this.shouldUpdate();
        },
    },

    mounted() {
        window.addEventListener('resize', () => {
            this.shouldUpdate();
        });

        window.addEventListener('click', () => {
            if (this.isVisible) {
                this.interval = setInterval(() => {
                    this.animate = !this.animate;
                }, 1300);
                return;
            }

            clearInterval(this.interval);
        });
    },

    destroyed() {
        window.removeEventListener('resize', () => {});
    },

    methods: {
        shouldUpdate() {
            this.$nextTick().then(() => {
                if (!this.$refs?.sideCartProductList) {
                    return;
                }

                const hasScroll = this.$refs.sideCartProductList.scrollHeight
                    > this.$refs.sideCartProductList.clientHeight;

                if (hasScroll === this.isOverflowing) {
                    return;
                }

                this.updateIsOverflowing();
            });
        },

        updateIsOverflowing() {
            this.isOverflowing = this.$refs.sideCartProductList.scrollHeight
                > this.$refs.sideCartProductList.clientHeight;
        },

        handleShow() {
            this.$refs.navigationDrawer.handleDrawer();
        },

        handleBeforeEnter() {
            this.shouldUpdate();
        },

        handleAfterEnter() {
            this.showButton = true;
        },

        handleAfterLeave() {
            this.showButton = false;
        },
    },
};
</script>
