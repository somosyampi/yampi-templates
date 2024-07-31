import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { awaitTicks } from '@/mixins/helpers';
import rocket from '@/modules/axios/rocket';
import base from './base';

export default _merge(_cloneDeep(base), {
    actions: {
        async boot({ rootGetters, dispatch, commit }) {
            const pixels = _get(rootGetters, 'pixels/pixels.facebook', []);

            if (_isEmpty(pixels)) {
                return;
            }

            commit('SET_ACTIVE', true);

            if (typeof window.fbq !== 'function') {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=false;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            }

            await awaitTicks(1000, () => typeof window.fbq !== 'function');

            await Promise.all(pixels.map(({ pixel_id }) => dispatch('event', {
                event: 'init',
                type: pixel_id,
            })));

            await dispatch('event', {
                event: 'track',
                type: 'PageView',
            });
        },

        _mark({ rootGetters }, { event, type, payload = undefined }) {
            if (event === 'init' || type === 'PageView') {
                return fbq(event, type);
            }

            const pixels = _get(rootGetters, 'pixels/pixels.facebook', []);

            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            };

            const fbApi = (event, pixel_id, type, payload) => {
                const params = Object.assign(payload || {}, {
                    pixel_id: pixel_id,
                    event: type,
                    source_url: window.location.href,
                    fbc: getCookie('_fbc'),
                    fbp: getCookie('_fbp'),
                });

                rocket.post('/pixels/fb/events', params);
            };

            const fbEvents = {
                'default': fbq,
                'api_token': fbApi,
            }

            pixels.forEach(pixel => {
                const pixel_id = pixel.facebook_type === 'default'
                    ? pixel.pixel_id.toString()
                    : pixel.id;

                fbEvents[pixel.facebook_type](event, pixel_id, type, payload);
            });
        },

        productPageEvent({ rootGetters, dispatch }) {
            const product = _get(rootGetters, 'product/product', {});

            return dispatch('event', {
                event: 'trackSingle',
                type: 'ViewContent',
                payload: {
                    content_ids: [ product.sku_id ],
                    content_type: 'product',
                    value: _get(product, 'prices.data.price'),
                    currency: 'BRL',
                },
            });
        },

        categoryPageEvent({ rootGetters, dispatch }) {
            const products = _get(rootGetters, 'product/products');

            const contentIds = products.map(product => `${product.sku_id}`);
            const payload = {
                content_ids: contentIds,
                content_type: 'product',
            }
            let type = 'Search';

            if (window.data.context !== 'search') {
                const meta = _get(rootGetters, 'product/meta');

                type = 'ViewCategory';

                payload.content_name = meta.name;
                payload.content_category = _isEmpty(meta.parent)
                    ? meta.name
                    : `${meta.parent.name} > ${meta.name}`;
            }

            return dispatch('event', {
                event: 'trackSingle',
                type: type,
                payload: payload,
            });
        },

        addToCartEvent({ dispatch, rootGetters }, { ids, value }) {
            // we only trigger this event if its has skip_cart active
            if (!_get(rootGetters, 'merchant/merchant.checkout.skip_cart')) {
                return;
            }

            return dispatch('event', {
                event: 'trackSingle',
                type: 'AddToCart',
                payload: {
                    content_ids: ids,
                    content_type: 'product',
                    value: value,
                    currency: 'BRL'
                },
            });
        },
    },
});
