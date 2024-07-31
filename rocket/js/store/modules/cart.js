import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _times from 'lodash/times';
import _constant from 'lodash/constant';
import _castArray from 'lodash/castArray';
import * as Sentry from '@sentry/vue';
import checkout from '@/modules/axios/checkout';
import rocket from '@/modules/axios/rocket';
import { checkoutUrl, redirectTo, pageParams } from '@/mixins/helpers';
import ga4 from '@/modules/google/analytics';

const getErrorMessage = (error, defaultMessage) => {
    const message = _get(error, 'response.data.message', defaultMessage);

    return Array.isArray(message)
        ? _get(message, '0.message', defaultMessage)
        : message;
};

export default {
    namespaced: true,

    state: {
        cart: {},
        cartType: 'suspended',
    },

    getters: {
        cart: state => state.cart,
        cartType: state => state.cartType,
    },

    actions: {
        redirectToCart({ rootGetters }) {
            redirectTo(
                checkoutUrl(
                    _get(rootGetters, 'merchant/merchant.checkout.redirect_to'),
                    true,
                ),
            );
        },

        async addProductsToCart(
            { commit, rootGetters, dispatch },
            {
                skus,
                products,
                value,
                quantities = undefined,
                extras = {},
                showModal = false,
            },
        ) {
            const url = checkoutUrl(
                _get(rootGetters, 'merchant/merchant.checkout.items'),
            );
            const skusArr = _castArray(skus);
            const skusIds = skusArr.map(sku => sku.id);
            const productsArr = _castArray(products);
            const quantityArr = _castArray(
                quantities || _times(skusArr.length, _constant(1)),
            );

            const quantityAdded = productsArr.length > 1 ? productsArr.length : quantities;

            const payload = {
                ...extras,
                quantity: quantityArr,
                product_option_id: skusIds,
                skipShipment: true,
            };

            try {
                const { data } = await checkout.post(url, payload);

                dispatch(
                    'pixels/addToCartEvent',
                    {
                        ids: skusIds,
                        skus: skusArr,
                        value,
                        quantities: quantityArr,
                        products: productsArr,
                    },
                    { root: true },
                );

                commit('SET_CART', data.cart);
                commit('EVENT_ADDED_TO_CART', { showModal, quantityAdded });
                ga4.trackAddedItem(skusArr, productsArr, quantityArr, value);
            } catch (e) {
                Sentry.captureException(e);

                commit('EVENT_ADDED_TO_CART', {
                    showModal,
                    error: getErrorMessage(
                        e,
                        'Ocorreu um erro ao inserir no carrinho',
                    ),
                });
            }
        },

        async loadCart({ commit, rootGetters }) {
            const url = checkoutUrl(
                _get(rootGetters, 'merchant/merchant.checkout.items_json'),
            );

            try {
                if (pageParams.preview) {
                    const { data } = await rocket.get('placeholders/cart');

                    commit('SET_CART', data);
                    return;
                }

                const { data } = await checkout.get(url);

                commit('SET_CART', data.cart);
            } catch (e) {
                console.error(e);
            }
        },

        async updateItemQuantity(
            { commit, rootGetters },
            { item, quantity, extras = {} },
        ) {
            const url = checkoutUrl(
                _get(rootGetters, 'merchant/merchant.checkout.items'),
            );

            const payload = {
                ...extras,
                product_option_id: item.id,
                oldQuantity: item.quantity,
                quantity,
                skipShipment: true,
            };

            const fullUrl = `${url}/${item.id}`;

            try {
                const { data } = await checkout.put(fullUrl, payload);

                commit('SET_CART', data.cart);
            } catch (e) {
                item.error = getErrorMessage(
                    e,
                    'Ocorreu um erro ao alterar a quantidade.',
                );
            }
        },

        async removeItem({ commit, rootGetters }, { item, items, totalPrice }) {
            item = item || items[0];

            const isPreview = !_isNil(_get(rootGetters, 'queryParams/queryParams.preview'));

            if (isPreview) {
                commit('SET_CART', []);
                return;
            }

            const url = checkoutUrl(
                _get(rootGetters, 'merchant/merchant.checkout.items'),
            );
            const fullUrl = `${url}/${item.id}/delete`;

            const payload = {
                product_option_id: item.id,
                skipShipment: true,
            };

            try {
                const { data } = await checkout.delete(fullUrl, {
                    data: payload,
                });

                if (!data.error) {
                    commit('SET_CART', data.cart);
                }

                ga4.trackRemovedItem((items || item), totalPrice);
            } catch (e) {
                item.error = getErrorMessage(
                    e,
                    'Ocorreu um erro ao remover o item.',
                );
                console.error(e);
            }
        },
    },

    mutations: {
        SET_CART(state, payload) {
            state.cart = payload;
        },

        SET_CART_TYPE(state, payload) {
            state.cartType = payload;
        },

        EVENT_ADDED_TO_CART() {},
    },
};
