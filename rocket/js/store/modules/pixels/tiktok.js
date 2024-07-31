/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable wrap-iife */
/* eslint-disable max-len */
/* eslint-disable func-names */
import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { awaitTicks } from '@/mixins/helpers';

import base from './base';

export default _merge(_cloneDeep(base), {
    actions: {
        async boot({ rootGetters, dispatch, commit }) {
            const pixels = _get(rootGetters, 'pixels/pixels.tiktok', []);

            if (_isEmpty(pixels)) {
                return;
            }

            const pixelsIds = pixels.reduce((ids, pixel) => {
                ids.push(pixel.pixel_id);
                return ids;
            }, []);

            commit('SET_ACTIVE', true);

            !function (w, d, t) {
                // eslint-disable-next-line vars-on-top, no-var, no-sequences, no-shadow, semi, block-scoped-var, new-parens, prefer-template
                w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e }, ttq.load = function (e, n) { var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; var o = document.createElement('script'); o.type = 'text/javascript', o.async = !0, o.src = i + '?sdkid=' + e + '&lib=' + t; var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(o, a) };

                pixelsIds.forEach(pixelId => {
                    ttq.load(pixelId);
                    ttq.page();
                });
            }(window, document, 'ttq');

            await awaitTicks(1000, () => typeof window.ttq !== 'object');
        },

        _mark(_, { type, payload = {} }) {
            ttq.track(type, payload);
        },

        productPageEvent({ rootGetters, dispatch }) {
            const product = _get(rootGetters, 'product/product', {});

            return dispatch('event', {
                event: '',
                type: 'ViewContent',
                payload: {
                    content_id: product.id,
                    content_type: 'product',
                    value: _get(product, 'prices.data.price'),
                    currency: 'BRL',
                },
            });
        },

        categoryPageEvent({ rootGetters, dispatch }) {
            // eslint-disable-next-line prefer-const
            let payload = { contents: [] };
            let type = 'ViewContent';
            const products = _get(rootGetters, 'product/products');

            products.forEach(product => {
                payload.contents.push({
                    content_type: 'product',
                    content_name: product.name,
                    price: _get(product, 'prices.data.price'),
                    content_id: `${product.id}`,
                });
            });

            if (window.data.context !== 'search') {
                const meta = _get(rootGetters, 'product/meta');

                payload.content_category = _isEmpty(meta.parent)
                    ? meta.name
                    : `${meta.parent.name} > ${meta.name}`;
            } else {
                type = 'Search';
                payload.query = _get(window, 'data.content.data.q', '');
            }

            return dispatch('event', {
                type,
                payload,
                event: '',
            });
        },

        addToCartEvent({ dispatch, rootGetters }, { products, quantities }) {
            // we only trigger this event if its has skip_cart active
            if (!_get(rootGetters, 'merchant/merchant.checkout.skip_cart')) {
                return;
            }

            const payload = { contents: [] };

            products.forEach((product, index) => {
                payload.contents.push({
                    content_type: 'product',
                    content_name: product.name,
                    quantity: quantities[index],
                    price: product.prices.data.price,
                    content_id: `${product.id}`,
                });
            });

            // eslint-disable-next-line consistent-return
            return dispatch('event', {
                payload,
                event: '',
                type: 'AddToCart',
            });
        },
    },
});
