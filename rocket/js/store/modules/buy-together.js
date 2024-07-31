export default {
    namespaced: true,

    state: {
        productsForCustomization: [],
        customizedProducts: {},
        currentCombo: 0,
        combos: [],
    },

    getters: {
        currentCombo: state => state.currentCombo,
        productsForCustomization: state => state.productsForCustomization,
        customizedProducts: state => state.customizedProducts,
        customizationProductsIndexes: state => state.productsForCustomization.map(sku => sku.index),
        customizationSkusIds: state => state.productsForCustomization.map(sku => sku.id),
        combos: state => state.combos,
    },

    actions: {
        addSkuToCustomize(
            { commit, getters: { customizationProductsIndexes } },
            { index, selectedSku },
        ) {
            if (!selectedSku) {
                return;
            }

            if (customizationProductsIndexes.includes(index)) {
                commit('DELETE_PRODUCT', customizationProductsIndexes.indexOf(index));
            }

            if (!selectedSku.customizations || !selectedSku.customizations.data.length) {
                return;
            }

            commit('PUSH_PRODUCT', { index, ...selectedSku });
        },

        updateSkusToCustomize({ commit }, { skus }) {
            commit('RESET', false);
            commit('UPDATE_SKU', skus);
        },

        addSkuCustomization({ commit }, payload) {
            commit('ADD_CUSTOMIZATION', payload);
        },

        removeCustomization({ commit }, productId) {
            commit('REMOVE_CUSTOMIZATION', productId);
        },

        reset({ commit }) {
            commit('RESET', false);
        },

        setCombo({ commit, state }, comboId) {
            if (comboId !== state.currentCombo) {
                commit('SET_COMBO', comboId);
                commit('RESET', true);
            }
        },
    },

    mutations: {
        SET_COMBOS(state, payload) {
            state.combos = state.combos.concat(payload);
        },

        SET_COMBO(state, payload) {
            state.currentCombo = payload;
        },

        ADD_CUSTOMIZATION(state, payload) {
            state.customizedProducts = { ...state.customizedProducts, ...payload };
        },

        UPDATE_SKU(state, payload) {
            state.productsForCustomization = payload;
        },

        PUSH_PRODUCT(state, payload) {
            state.productsForCustomization.push(payload);
        },

        DELETE_PRODUCT(state, index) {
            state.productsForCustomization.splice(index, 1);
        },

        REMOVE_CUSTOMIZATION(state, productId) {
            state.productsForCustomization = state.productsForCustomization.filter(
                product => product.product_id !== productId,
            );
        },

        RESET(state, changedCombo) {
            if (changedCombo) {
                state.productsForCustomization = [];
            }

            state.customizedProducts = {};
        },
    },
};
