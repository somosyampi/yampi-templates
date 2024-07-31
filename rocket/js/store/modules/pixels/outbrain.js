import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import { awaitTicks } from '@/mixins/helpers';

import base from './base';

export default _merge(_cloneDeep(base), {
    actions: {
        async boot({ rootGetters, dispatch, commit }) {
            const pixels = _get(rootGetters, 'pixels/pixels.outbrain', []);

            if (_isEmpty(pixels)) {
                return;
            }

            const pixelsIds = pixels.reduce((ids, pixel) => {
                ids.push(pixel.pixel_id);
                return ids;
            }, []);

            commit('SET_ACTIVE', true);

            /** DO NOT MODIFY THIS CODE**/
            !function (_window, _document) {
                let OB_ADV_ID = pixelsIds;
                if (_window.obApi) {
                    let toArray = function (object) {
                        return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];
                    };
                    _window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));
                    return;
                }
                let api = _window.obApi = function () {
                    api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);
                };
                api.version = '1.1';
                api.loaded = true;
                api.marketerId = OB_ADV_ID;
                api.queue = [];
                let tag = _document.createElement('script');
                tag.async = true;
                tag.src = '//amplify.outbrain.com/cp/obtp.js';
                tag.type = 'text/javascript';
                let script = _document.getElementsByTagName('script')[0];
                script.parentNode.insertBefore(tag, script);
            }(window, document);

            await awaitTicks(1000, () => typeof window.obApi !== 'function');

            await dispatch('event', {
                event: 'track',
                type: 'PAGE_VIEW',
            });
        },

        _mark(_, { event, type, payload = undefined }) {
            obApi(event, type, payload);
        },

        productPageEvent({ rootGetters, dispatch }) {},

        categoryPageEvent({ rootGetters, dispatch }) {},

        addToCartEvent({ dispatch, rootGetters }, { ids, value }) {
            // we only trigger this event if its has skip_cart active
            if (!_get(rootGetters, 'merchant/merchant.checkout.skip_cart')) {
                return;
            }

            return dispatch('event', {
                event: 'track',
                type: 'AddToCart',
                payload: {},
            });
        },
    },
});
