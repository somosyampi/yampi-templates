import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _first from 'lodash/first';
import _omit from 'lodash/omit';
import _forEach from 'lodash/forEach';
import { awaitTicks } from '@/mixins/helpers';

import base from './base';
import { includes } from 'lodash';

export default _merge(_cloneDeep(base), {
    getters: {
        pixels: (state, getters, rootState) => _get(rootState, 'pixels.pixels.pinterest', []),
    },

    actions: {
        async boot({ rootGetters, getters, dispatch, commit }) {
            const pixels = getters.pixels;

            if (_isEmpty(pixels)) {
                return;
            }

            commit('SET_ACTIVE', true);

            if (typeof window.pintrk !== 'function') {
                !function(e){if(!window.pintrk){window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            }

            await awaitTicks(1000, () => typeof window.pintrk !== 'function');

            await Promise.all(pixels.map(({ pixel_id }) => dispatch('event', {
                event: 'load',
                type: pixel_id,
            })));

            const page = _get(rootGetters, 'environment/page', '');

            if (!['category', 'product'].includes(page)) {
                await dispatch('event', {
                    event: 'track',
                    type: 'pagevisit',
                });
            }
        },

        _mark({ dispatch }, { event, type, payload = undefined }) {
            window.pintrk(event, type, payload);

            const noScriptParams = new URLSearchParams({
                tid: type,
                event: event,
            });

            if (typeof payload !== 'undefined') {
                const params = _omit(payload, 'line_items');

                const addParam = (value, key) => {
                    noScriptParams.append(key, value);
                };

                _forEach(params, (value, key) => addParam(value, `ed[${key}]`));

                const items = payload.line_items || [];

                _forEach(items, (item) => {
                    _forEach(item, (value, key) => addParam(value, `ed[line_items][${key}]`));
                });
            }

            noScriptParams.append('noscript', 1);

            dispatch('addNoScript',
                `<img height="1" width="1" style="display:none;" alt=""
                src="https://ct.pinterest.com/v3/?${ noScriptParams.toString() }" />`
            );
        },

        productPageEvent({ rootGetters, dispatch }) {
            const product = _get(rootGetters, 'product/product', {});

            return dispatch('event', {
                event: 'track',
                type: 'pagevisit',
                payload: {
                    line_items: [{
                        product_name: product.name,
                        product_id: product.id,
                        product_category: _get(product, 'categories.data.0.name', ''),
                        product_variant_id: product.sku_id,
                        product_variant: product.sku,
                        product_price: _get(product, 'prices.data.price', ''),
                        product_brand: _get(product, 'brand.data.name', ''),
                    }],
                },
            });
        },

        categoryPageEvent({ rootGetters, dispatch }) {
            const products = _get(rootGetters, 'product/products'),
                categoryName = _get(window.data, 'content.data.meta.name', '');

            const payload = {
                line_items: products.map(product => ({
                    product_name: product.name,
                    product_id: product.id,
                    product_category: categoryName,
                    product_variant_id: product.sku_id,
                    product_variant: product.sku,
                    product_price: _get(product, 'prices.data.price', ''),
                    product_brand: _get(product, 'brand.data.name', ''),
                })),
            }

            let type = 'viewcategory';

            if (window.data.context === 'search') {
                type = 'search';

                const params = new URLSearchParams(window.location.search);
                payload.search_query = params.has('q') ? params.get('q') : '';

                delete payload.line_items.product_category;
            }

            return dispatch('event', {
                event: 'track',
                type: type,
                payload: payload,
            });
        },

        addToCartEvent({ dispatch, rootGetters }, { quantities, value, skus, products }) {
            // we only trigger this event if its has skip_cart active
            if (!_get(rootGetters, 'merchant/merchant.checkout.skip_cart')) {
                return;
            }

            return dispatch('event', {
                event: 'track',
                type: 'addtocart',
                payload: {
                    value: value,
                    order_quantity: quantities.reduce((a, b) => a + b, 0),
                    currency: 'BRL',
                    line_items: skus.map((sku, index) => ({
                        product_name: _get(products, `${index}.name`, ''),
                        product_id: _get(products, `${index}.id`, ''),
                        product_category: _get(products, `${index}.categories.data.0.name`, ''),
                        product_variant_id: sku.id,
                        product_variant: sku.sku,
                        product_quantity: _get(quantities, `${index}`, 0),
                        product_price: _get(products, `${index}.prices.data.price`, ''),
                        product_brand: _get(products, `${index}.brand.data.name`, ''),
                    })),
                },
            });
        },
    },
});
