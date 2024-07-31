import _get from 'lodash/get';
import api from '@/modules/axios/api';
import google from './google';
import taboola from './taboola';
import facebook from './facebook';
import outbrain from './outbrain';
import pinterest from './pinterest';
import tiktok from './tiktok';
import kwai from './kwai';

const modules = {
    facebook,
    taboola,
    google,
    outbrain,
    pinterest,
    tiktok,
    kwai,
};

const modulesNames = Object.keys(modules);

const promiseModules = cb => Promise.all(
    modulesNames.map(cb),
);

export default {
    namespaced: true,

    modules,

    state: {
        pixels: {},
    },

    getters: {
        pixels: state => state.pixels,
    },

    actions: {
        async load({ commit, dispatch, rootGetters }) {
            try {
                let route = 'catalog/pixels';

                if (window.Yampi.page === 'product') {
                    const productId = _get(rootGetters, 'product/product.id');

                    route = `catalog/products/${productId}/pixels`;
                }

                const { data } = await api.get(route);

                commit('SET_PIXELS', data.data);

                await promiseModules(module => dispatch(`${module}/boot`));

                const currentPage = _get(rootGetters, 'environment/page', '');

                if (['product', 'category'].includes(currentPage)) {
                    await dispatch(`${currentPage}PageEvent`);
                }
            } catch (e) {
                console.error(e);
            }
        },

        productPageEvent({ dispatch }) {
            return promiseModules(module => dispatch(`${module}/productPageEvent`));
        },

        categoryPageEvent({ dispatch }) {
            return promiseModules(module => dispatch(`${module}/categoryPageEvent`));
        },

        addToCartEvent({ dispatch }, payload) {
            return promiseModules(module => dispatch(`${module}/addToCartEvent`, payload));
        },
    },

    mutations: {
        SET_PIXELS(state, payload) {
            // eslint-disable-next-line no-param-reassign
            state.pixels = payload;
        },
    },
};
