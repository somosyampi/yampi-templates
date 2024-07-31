/* eslint-disable object-curly-newline */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-underscore-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable camelcase */
/* eslint-disable no-confusing-arrow */
import _get from 'lodash/get';
import _first from 'lodash/first';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _startsWith from 'lodash/startsWith';
import _uniq from 'lodash/uniq';
import base from './base';

const PIXEL_GROUP = 'googlePixel';

export default _merge(_cloneDeep(base), {
    actions: {
        async boot({ rootGetters, dispatch, commit }) {
            const pixels = _get(rootGetters, 'pixels/pixels.google', []);

            if (_isEmpty(pixels)) {
                return;
            }

            commit('SET_ACTIVE', true);

            const mappedPixels = _uniq(pixels.map(
                ({ pixel_id }) => _startsWith(pixel_id, 'AW-') ? pixel_id : `AW-${pixel_id}`,
            ));

            const firstPixel = _first(mappedPixels);

            await dispatch('addScript', `https://www.googletagmanager.com/gtag/js?id=${firstPixel}`);

            window.dataLayer = window.dataLayer || [];
            // eslint-disable-next-line semi
            window.gtag = function() { window.dataLayer.push(arguments) };

            await dispatch('event', {
                event: 'js',
                payload: new Date(),
            });

            // eslint-disable-next-line consistent-return
            return Promise.all(mappedPixels.map(pixelId => dispatch('event', {
                event: 'config',
                type: pixelId,
                payload: { groups: PIXEL_GROUP },
            })));
        },

        _mark({}, { event = 'event', type, payload }) {
            window.gtag(...[event, type, payload].filter(item => item));
        },

        productPageEvent({ rootGetters, dispatch }) {
            const product = _get(rootGetters, 'product/product', {});
            const category = _get(product, 'categories.data.0', {});
            const value = _get(product, 'prices.data.price');

            return dispatch('event', {
                type: 'view_item',
                payload: {
                    value,
                    send_to: PIXEL_GROUP,
                    ecomm_prodid: product.sku_id,
                    ecomm_pagetype: 'product',
                    ecomm_totalvalue: value,
                    items: [{
                        id: product.sku_id,
                        category: category.name || '',
                        name: product.name,
                        google_business_vertical: 'retail',
                        ecomm_prodid: product.sku_id,
                        ecomm_pagetype: 'product',
                        ecomm_totalvalue: value,
                    }],
                },
            });
        },

        categoryPageEvent({ rootGetters, dispatch }) {
            const products = _get(rootGetters, 'product/products');
            const categoryName = _get(window.data, 'content.data.meta.name', '');

            return dispatch('event', {
                type: 'view_item_list',
                payload: {
                    send_to: PIXEL_GROUP,
                    ecomm_prodid: products.map(product => product.sku_id),
                    ecomm_pagetype: 'category',
                    ecomm_category: categoryName,
                    items: products.map(product => ({
                        id: product.sku_id,
                        name: product.name,
                        category: _get(product, 'categories.data.0', {}),
                        google_business_vertical: 'retail',
                        ecomm_prodid: product.sku_id,
                        ecomm_pagetype: 'category',
                        ecomm_category: categoryName,
                    })),
                },
            });
        },

        addToCartEvent({ dispatch }, { ids, value, quantities, skus, products }) {
            return dispatch('event', {
                event: 'event',
                type: 'add_to_cart',
                payload: {
                    value,
                    send_to: PIXEL_GROUP,
                    ecomm_prodid: ids,
                    ecomm_pagetype: 'product',
                    ecomm_totalvalue: value,
                    ecomm_category: _get(products, '0.categories.data.0.name', ''),
                    items: skus.map((sku, index) => ({
                        id: sku.id,
                        name: _get(products, `${index}.name`, ''),
                        category: _get(products, `${index}.categories.data.0.name`, ''),
                        google_business_vertical: 'retail',
                        quantity: _get(quantities, `${index}.categories.data.0.name`, ''),
                        ecomm_prodid: sku.id,
                        ecomm_pagetype: 'product',
                        ecomm_totalvalue: _get(products, `${index}prices.data.price`),
                        ecomm_category: _get(products, `${index}.categories.data.0.name`, ''),
                    })),
                },
            });
        },
    },
});
