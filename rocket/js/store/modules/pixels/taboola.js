import _get from 'lodash/get';
import _first from 'lodash/first';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import base from './base';

export default _merge(_cloneDeep(base), {
    getters: {
        pixels: (state, getters, rootState) => _get(rootState, 'pixels.pixels.taboola', []),
    },

    actions: {
        async boot({ getters, dispatch, commit }) {
            if (_isEmpty(getters.pixels)) {
                return;
            }

            commit('SET_ACTIVE', true);

            window._tfa = window._tfa || [];

            const { pixel_id } = _first(getters.pixels);

            await dispatch('addScript', `https://cdn.taboola.com/libtrc/unip/${pixel_id}/tfa.js`);

            return dispatch('event', { event: 'page_view' });
        },

        _mark({ getters }, { event }) {
            window._tfa.push(...getters.pixels.map(({ pixel_id }) => ({
                id: pixel_id,
                notify: 'event',
                name: event,
            })));
        },

        productPageEvent({ rootGetters, dispatch }) {
            return dispatch('event', { event: 'view_content' });
        },

        addToCartEvent({ dispatch, rootGetters }, { ids, value }) {
            // we only trigger this event if its has skip_cart active
            if (!_get(rootGetters, 'merchant/merchant.checkout.skip_cart')) {
                return;
            }

            return dispatch('event', {
                event: 'add_to_cart',
            });
        },
    },
});
