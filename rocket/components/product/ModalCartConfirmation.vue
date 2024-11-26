<template>
    <modal
        ref="cartConfirmBaseModal"
        name="cart-confirm"
    >
        <template v-if="error">
            <h3 class="theme-title">
                Oops!<br>
                Ocorreu um erro.
            </h3>

            <p
                class="alert -red"
                v-text="error"
            />
        </template>

        <template v-else>
            <h3
                class="theme-title"
                v-html="$tc('add-to-cart.product-added', quantityAdded)"
            />

            <p class="description">
                O que deseja fazer agora?
            </p>

            <button
                class="btn btn-primary flex -vcenter"
                @click="handleRedirectoToCart"
            >
                <svg
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.1081 5.63865H9.83601V4.36532C9.83601 2.01021 7.96708 0.0428572 5.63113 0.000860586C5.5673 -0.000286862 5.43977 -0.000286862 5.37597 0.000860586C3.03996 0.0428572 1.17106 2.01021 1.17106 4.36532V5.63865H0.89897C0.479692 5.63865 0.137695 6.07129 0.137695 6.60563V12.9921C0.137695 13.5258 0.479692 13.9625 0.898998 13.9625H10.1081C10.5273 13.9625 10.8694 13.5258 10.8694 12.9921V6.60563C10.8694 6.07132 10.5274 5.63865 10.1081 5.63865ZM6.36631 9.79239V11.7221C6.36631 11.9431 6.18132 12.1301 5.96017 12.1301H5.04698C4.82581 12.1301 4.64081 11.9431 4.64081 11.7221V9.79239C4.42632 9.58126 4.30145 9.28932 4.30145 8.96637C4.30145 8.35438 4.77452 7.82851 5.37601 7.80421C5.43975 7.80163 5.56743 7.80163 5.63117 7.80421C6.23266 7.82851 6.70573 8.35438 6.70573 8.96637C6.70567 9.28932 6.5808 9.58126 6.36631 9.79239ZM5.6311 5.6387H8.04281H8.04284V4.36537C8.04284 2.96247 6.90268 1.80249 5.50351 1.80249C4.10434 1.80249 2.96423 2.96247 2.96423 4.36537V5.6387H5.37594H5.6311Z"
                    />
                </svg>
                Finalizar compra
            </button>
        </template>

        <div
            class="btn-clean link-alike flex -vcenter -hcenter"
            @click="handleKeepBuying"
        >
            <SelectArrow class="icon icon-select-arrow -left" />
            Continuar comprando
        </div>
    </modal>
</template>

<script>
import { mapActions, mapGetters } from '~/vuex';
import _ from '~/lodash';
import trackingByApi from '@/mixins/tracking/api';
import eventBus from '@/modules/eventBus';

export default {
    name: 'ModalCartConfirmation',

    mixins: [trackingByApi],

    props: {
        error: {
            type: [String, undefined],
            default: () => undefined,
        },
        quantityAdded: {
            type: Number,
            default: 1,
        },
    },

    computed: {
        ...mapGetters('cart', [
            'cart',
        ]),

        ...mapGetters('merchant', [
            'merchant',
        ]),

        ...mapGetters('preview', [
            'isIframe',
        ]),
    },

    mounted() {
        eventBus.$on('addedToCart', this.showModal);
    },

    methods: {
        ...mapActions('cart', ['redirectToCart']),

        showModal() {
            this.$refs.cartConfirmBaseModal.showModal();
        },

        closeModal() {
            this.$refs.cartConfirmBaseModal.closeModal();
        },

        handleKeepBuying() {
            this.handleTrackApi('keep-buying-clicked');
            this.closeModal();
        },

        async handleRedirectoToCart() {
            if (this.isIframe) {
                this.closeModal();
            }

            const themeParams = window.themeConfig.theme.params;

            await this.handleTrackApi('checkout-intended', {
                location: 'modal-cart-confirm',
                quick_buy_button_enabled: themeParams.show_add_to_cart_button,
                items: _.map(this.cart.items, 'name'),
                amount: _.sumBy(this.cart.items, 'price_total'),
            });

            this.redirectToCart();
        },
    },
};
</script>
