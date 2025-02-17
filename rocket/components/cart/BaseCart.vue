<script>
import _ from '~/lodash';
import { mapActions, mapGetters } from '~/vuex';
import trackingByApi from '@/mixins/tracking/api';
import cashbackMixin from '@/mixins/cashback';

export default {
    name: 'BaseCart',

    mixins: [
        trackingByApi,
        cashbackMixin,
    ],

    props: {
        showCartSavings: {
            type: Boolean,
            default: true,
        },

        showProductCartSavings: {
            type: Boolean,
            default: true,
        },

        cashbacks: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            loading: {
                all: false,
            },
            interval: null,
            animate: false,
        };
    },

    computed: {
        ...mapGetters('cart', ['cart']),
        ...mapGetters('preview', ['isIframe']),

        items() {
            return _.get(this.cart, 'items', []);
        },

        buttonText() {
            return window.merchant.checkout.skip_cart ? 'Finalizar compra' : 'Ver carrinho';
        },

        cartValue() {
            return this.$formatMoney(this.cart.prices.total - this.cart.prices.shipment);
        },

        cartQuantity() {
            return _.sumBy(this.items, 'quantity');
        },

        anyLoading() {
            return _.some(this.loading);
        },

        redirectUrl() {
            return this.$checkoutUrl(
                _.get(this.$store.getters, 'merchant/merchant.checkout.redirect_to'),
                true,
            );
        },

        buyTogetherItems() {
            return _.groupBy(
                this.items.filter(item => item.kit_id),
                item => item.kit_id,
            );
        },

        totalValueCustomizations() {
            return this.items.reduce((totalCustomizationsProduct, product) => {
                if (!product.customizations.length) {
                    return totalCustomizationsProduct;
                }

                return product.customizations.filter(
                    customization => customization.selected_value !== null,
                ).reduce((
                    totalCustomizations, customization,
                ) => parseFloat(customization.price) + totalCustomizations,
                totalCustomizationsProduct);
            }, 0);
        },

        sortedByFreebies() {
            const itemsArrayCopy = _.cloneDeep(this.items);
            return itemsArrayCopy.sort((a, b) => b.is_freebie - a.is_freebie);
        },

        totalFreebieValue() {
            return this.items.reduce((totalFreebiesPrice, item) => {
                const priceSale = Number(item.price_sale);
                const canCalculate = item.is_freebie
                    && !Number.isNaN(priceSale);

                if (canCalculate) {
                    return totalFreebiesPrice + priceSale;
                }

                return totalFreebiesPrice;
            }, 0);
        },

        totalCartValue() {
            if (!this.cart.prices) {
                return 0;
            }

            const itemsAmountWithCustomizationValue = (
                parseFloat(this.cart.prices.items_amount)
                + this.totalValueCustomizations
            );

            return itemsAmountWithCustomizationValue - this.totalFreebieValue;
        },

        totalCartSavings() {
            const subtotal = parseFloat(this.cart.prices.subtotal);
            const cartDiscount = parseFloat(this.cart.prices.discount);
            return this.totalCartValue - subtotal + cartDiscount;
        },

        shouldShowCartSavings() {
            return this.showCartSavings && this.totalCartSavings > 0;
        },

        getCartValueByPaymentMethod() {
            const paymentMethods = this.cart.cart_discounts;
            // eslint-disable-next-line no-restricted-syntax
            for (const iterator in paymentMethods) {
                if (paymentMethods[iterator].alias === this.highlightedPrice) {
                    return {
                        value: parseFloat(_get(paymentMethods[iterator], 'prices.total')),
                        percentage: parseFloat(_get(paymentMethods[iterator], 'percent_discount')),
                        configured: true,
                    };
                }
            }

            return {
                configured: false,
            };
        },

        validCashback() {
            const subtotal = parseFloat(this.cart.prices.subtotal);
            return this.getValidCashback(this.cashbacks, subtotal);
        },

        hasCashbackValid() {
            if (_isEmpty(this.validCashback)) {
                return false;
            }

            return this.validCashback.percent_amount > 0;
        },
    },

    methods: {
        ...mapActions('cart', ['redirectToCart', 'loadCart', 'updateItemQuantity', 'removeItem']),

        handleRemoveCombo({ kitId, totalPrice }) {
            const products = this.items.filter(item => item.kit_id === parseInt(kitId, 10));
            this.remove({ items: products, totalPrice });
        },

        async bootCart() {
            this.setLoading('all', true);

            await this.loadCart();

            this.items.forEach(item => {
                this.setLoading(item.id, false);
            });

            this.setLoading('all', false);
        },

        handleQuantityChange: _.debounce(function (item, quantity) {
            this.updateQuantity(item, quantity);
        }, 300),

        redirect() {
            if (!this.items.length) {
                return;
            }

            this.setLoading('all', true);

            const themeParams = window.themeConfig.theme.params;

            const eventDispatch = window.merchant.checkout.skip_cart
                ? 'checkout-intended'
                : 'view-cart-intended';

            this.handleTrackApi(eventDispatch, {
                location: 'side-cart',
                quick_buy_button_enabled: themeParams.show_add_to_cart_button,
                items: _.map(this.items, 'name'),
                amount: this.cartValue,
            });

            this.redirectToCart();

            setTimeout(() => this.setLoading('all', false), 200);
        },

        async updateQuantity(item, quantity) {
            if (this.loading[item.id] || item.quantity === quantity || this.isIframe) {
                return;
            }

            const oldQuantity = item.quantity;

            this.$set(item, 'quantity', quantity);

            this.setLoading(item.id, true);

            const extras = {};

            if (item.customizations.length > 0) {
                extras.customization = {
                    [item.product_option_id]: item.customizations.reduce(
                        (allCustomizations, customization) => {
                            allCustomizations[customization.id] = customization.selected_value;

                            return allCustomizations;
                        },
                        {},
                    ),
                };
            }

            await this.updateItemQuantity({ item, quantity, extras });

            if (item.error) {
                this.$set(item, 'quantity', oldQuantity);
            }

            this.setLoading(item.id, false);
        },

        async remove({ item, items, totalPrice }) {
            item = item || items[0];

            if (this.loading[item.id]) {
                return;
            }

            this.setLoading(item.id, true);

            await this.removeItem({ item, items, totalPrice });

            this.setLoading(item.id, false);
        },

        setLoading(index, value) {
            this.$set(this.loading, index, value);
        },

        getFilteredCustomizations(item) {
            return item.customizations.filter(
                customization => customization.selected_value !== null,
            );
        },

        linkValidation() {
            if (this.emptyCartLinkButton === '0' || this.emptyCartLinkButton === '/') {
                this.emptyCartLinkButton = this.$baseUrl;
            }

            const concat = this.$baseUrl.concat(this.emptyCartLinkButton);
            const notAbsolutLink = this.emptyCartLinkButton.startsWith('/');
            const initialLink = this.emptyCartLinkButton.startsWith('http' || 'https');

            if (notAbsolutLink && !this.isIframe) {
                window.location.href = concat;

                return;
            }

            if (
                initialLink
                && !this.emptyCartLinkButton.startsWith(this.$baseUrl)
                && !this.isPreview
            ) {
                window.location.href = this.$baseUrl;

                return;
            }

            if (this.isIframe) {
                return;
            }

            window.location.href = this.emptyCartLinkButton;
        },
    },
};
</script>
