export default {
    namespaced: true,

    state: {
        showSearchBar: true,
    },

    getters: {
        showSearchBar: state => state.showSearchBar,
    },

    mutations: {
        UPDATE_SHOW_SEARCH_BAR(state, payload) {
            state.showSearchBar = payload;
        },
    },

    actions: {
        updateShowSearchBar({ commit }, payload) {
            commit('UPDATE_SHOW_SEARCH_BAR', payload);
        },
    },
};
