/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { awaitTicks } from '@/mixins/helpers';

import base from './base';

const itemAsPayload = (item, categoryName) => {
    const itemParam = {
        content_id: item.sku_id,
        content_type: 'product',
        content_name: item.name,
        content_category: categoryName || _get(item, 'categories.data.0.name'),
        quantity: item.quantity || 1,
        price: _get(item, 'prices.data.price'),
    };

    return itemParam;
};

const kwaiEvent = {
    search: 'search',
    addToCart: 'addToCart',
    pageView: 'contentView',
};

export default _merge(_cloneDeep(base), {
    getters: {
        pixels: (state, getters, rootState) => _get(rootState, 'pixels.pixels.kwai', []),
    },

    actions: {
        async boot({ rootGetters, getters, commit }) {
            const { pixels } = getters;

            if (_isEmpty(pixels)) {
                return;
            }

            // eslint-disable-next-line max-len
            // eslint-disable-next-line no-unused-expressions, prefer-template, new-parens, one-var-declaration-per-line, one-var, prefer-rest-params, block-scoped-var, lines-around-directive, strict, guard-for-in, no-cond-assign, no-sequences, no-shadow, no-return-assign, no-multi-assign, vars-on-top, prefer-arrow-callback, no-mixed-operators, no-restricted-syntax, no-bitwise, no-var, yoda, wrap-iife, quotes, eqeqeq, no-nested-ternary, func-names, semi
            !function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.install = t() : e.install = t() }(window, (function () { return function (e) { var t = {}; function n(r) { if (t[r]) return t[r].exports; var o = t[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports } return n.m = e, n.c = t, n.d = function (e, t, r) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) { return e[t] }.bind(null, o)); return r }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 0) }([function (e, t, n) { "use strict"; var r = this && this.__spreadArray || function (e, t, n) { if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++)!r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]); return e.concat(r || Array.prototype.slice.call(t)) }; !function (e) { var t = window; t.KwaiAnalyticsObject = e, t[e] = t[e] || []; var n = t[e]; n.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"]; var o = function (e, t) { e[t] = function () { var n = Array.from(arguments), o = r([t], n, !0); e.push(o) } }; n.methods.forEach((function (e) { o(n, e) })), n.instance = function (e) { var t = n._i[e] || []; return n.methods.forEach((function (e) { o(t, e) })), t }, n.load = function (t, r) { n._i = n._i || {}, n._i[t] = [], n._i[t]._u = "https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js", n._t = n._t || {}, n._t[t] = +new Date, n._o = n._o || {}, n._o[t] = r || {}; var o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.src = "https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js?sdkid=" + t + "&lib=" + e; var i = document.getElementsByTagName("script")[0]; i.parentNode.insertBefore(o, i) } }("kwaiq") }]) }));

            await awaitTicks(1000, () => typeof window.kwaiq !== 'object');

            const page = _get(rootGetters, 'environment/page', '');
            const shouldTrackPageView = !['category', 'product'].includes(page);

            try {
                pixels.forEach(pixel => {
                    kwaiq.load(pixel.pixel_id);
                    kwaiq.page();

                    if (shouldTrackPageView) {
                        kwaiq.instance(pixel.pixel_id).track(
                            kwaiEvent.pageView,
                        );
                    }
                });

                commit('SET_ACTIVE', true);
            } catch (error) {
                console.error('Kwai Pixel failed to start');
            }
        },

        _mark({ getters }, { type, payload = undefined }) {
            try {
                const { pixels } = getters;

                pixels.forEach(pixel => {
                    kwaiq.instance(pixel.pixel_id).track(
                        type,
                        payload,
                    );
                });
            } catch (error) {
                console.error('Kwai Pixel could not be dispatched');
            }
        },

        productPageEvent({ rootGetters, dispatch }) {
            const product = _get(rootGetters, 'product/product', {});
            const contents = [itemAsPayload(product)];

            dispatch('event', {
                payload: { contents },
                type: kwaiEvent.pageView,
            });
        },

        categoryPageEvent({ rootGetters, dispatch }) {
            const products = _get(rootGetters, 'product/products');
            const categoryName = _get(window.data, 'content.data.meta.name', '');
            const contents = products.map(product => itemAsPayload(product, categoryName));
            const payload = { contents };
            let type = kwaiEvent.pageView;

            if (window.data.context === 'search') {
                type = kwaiEvent.search;
                payload.query = _get(window, 'data.content.data.q', '');
            }

            dispatch('event', { type, payload });
        },

        addToCartEvent({ dispatch, rootGetters }, { quantities, value, skus, products }) {
            // we only trigger this event if its has skip_cart active
            if (!_get(rootGetters, 'merchant/merchant.checkout.skip_cart')) {
                return;
            }

            const productsWithQuantities = products.map((product, index) => {
                product.quantity = _get(quantities, index, 1);

                return product;
            });
            const contents = productsWithQuantities.map(product => itemAsPayload(product));

            dispatch('event', {
                type: kwaiEvent.addToCart,
                payload: { contents },
            });
        },
    },
});
