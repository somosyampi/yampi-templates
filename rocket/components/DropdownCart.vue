<!-- eslint-disable vue/no-v-html -->
<template>
    <div
        class="dropdown"
    >
        <rocket-emitter
            emits="cart"
            label="Carrinho de compras"
            class="child-emitter"
        >
            <div
                v-if="!items.length"
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
            </div>

            <div
                v-else
                class="products-cart"
            >
                <div class="cart-header flex -between">
                    <span class="-title">MEU CARRINHO</span>
                    <span
                        v-if="!shouldShowCartSavings"
                        class="cart-value price"
                    >{{ totalCartValue | formatMoney }}</span>
                </div>

                <div class="cart-products-list">
                    <buy-together-cart-group
                        class="buy-together-dropdown"
                        :buy-together-items="buyTogetherItems"
                        :loading="loading"
                        @removeCombo="handleRemoveCombo"
                    />

                    <div
                        v-for="item in items.filter((item) => !item.kit_id)"
                        :key="item.id"
                        class="cart-product flex -between -wrap"
                        :class="{
                            loading: loading[item.id],
                            '-vcenter': item.kit_id
                        }"
                    >
                        <product-cart-box
                            :product="item"
                            :show-product-quantity="false"
                            :show-product-cart-savings="showProductCartSavings"
                        />
                    </div>
                </div>

                <div
                    v-if="shouldShowCartSavings"
                    class="side-cart-total-value mt-21"
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
                    class="mb-22"
                >
                <div
                    v-if="shouldShowCartSavings"
                    class="side-cart-total-value mb-24"
                >
                    <div class="side-cart-row">
                        <span class="side-cart-total-text">SUBTOTAL</span>
                        <span
                            class="side-cart-subtotal-after-discounts"
                        >{{ cartValue }}
                        </span>
                    </div>
                </div>

                <div
                    v-if="highlightedPrice === 'billet' &&
                        getCartValueByPaymentMethod.configured"
                    class="side-cart-total-value mb-24"
                >
                    <div class="side-cart-row">
                        <span class="side-cart-total-text"><b>{{ getCartValueByPaymentMethod.percentage }}% DE DESCONTOS</b> NO BOLETO</span>
                        <span><b>{{ getCartValueByPaymentMethod.value | formatMoney }}</b>
                        </span>
                    </div>
                </div>

                <div
                    v-if="highlightedPrice === 'pix' &&
                        getCartValueByPaymentMethod.configured"
                    class="side-cart-total-value mb-24"
                >
                    <div class="side-cart-row">
                        <span class="side-cart-total-text"><b>{{ getCartValueByPaymentMethod.percentage }}% DE DESCONTOS</b> NO PIX</span>
                        <span><b>{{ getCartValueByPaymentMethod.value | formatMoney }}</b>
                        </span>
                    </div>
                </div>

                <LoaderButton
                    class="btn btn-primary -block btn-cart-product"
                    :title="buttonText"
                    :sending="anyLoading"
                    :disabled="anyLoading"
                    @click="redirect()"
                />
            </div>
        </rocket-emitter>
    </div>
</template>

<script>
import BaseCart from '@/components/BaseCart.vue';

export default {
    name: 'DropdownCart',

    extends: BaseCart,

    props: {
        mouseHover: {
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
            show: false,
        };
    },

    watch: {
        mouseHover(newVal) {
            if (newVal) {
                this.interval = setInterval(() => {
                    this.animate = !this.animate;
                }, 1300);

                return;
            }

            clearInterval(this.interval);
        },
    },
};
</script>
