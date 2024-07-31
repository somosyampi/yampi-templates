import _get from 'lodash/get';
import ga4 from '@/modules/google/analytics';
import _castArray from "lodash/castArray";
import _times from "lodash/times";
import _constant from "lodash/constant";

export default {
    namespaced: true,

    state: {
        product: _get(window.data, 'product.data', {}),
        products: _get(window.data, 'content.data.data', []),
        meta: _get(window.data, 'content.data.meta', {}),
        selectedSku: undefined,
    },

    getters: {
        product: state => state.product,
        products: state => state.products,
        meta: state => state.meta,
        selectedSku: state => state.selectedSku,
    },

    actions: {
        setSelectedSku({ commit }, payload) {
            commit('SET_SELECTED_SKU', payload);
        },

        async trackViewItem({ commit, rootGetters, dispatch },
                            {
                                skus,
                                products,
                                value,
                                quantities = undefined,
                            },
        ) {
            const skusArr = _castArray(skus);
            const productsArr = _castArray(products);
            const quantityArr = _castArray(
                quantities || _times(skusArr.length, _constant(1)),
            );

            ga4.trackViewItem(skusArr, productsArr, quantityArr, value);
        },
    },

    mutations: {
        SET_SELECTED_SKU(state, payload) {
            state.selectedSku = payload;
        },
    },
};
