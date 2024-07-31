import _get from 'lodash/get';

export default {
    namespaced: true,

    state: {
        activeFilters: [],
        queryParams: {
            filter_id: [],
            category_id: [],
            brand_id: [],
            promotion_id: [],
        },
    },

    getters: {
        activeFilters: state => state.activeFilters,
        queryParams: state => state.queryParams,
    },

    actions: {
        addActiveFilter({ commit }, newFilter) {
            commit('ADD_ACTIVE_FILTER', newFilter);
        },

        removeActiveFilter({ commit }, filter) {
            commit('REMOVE_ACTIVE_FILTER', filter);
        },

        bootQueryParams({ dispatch }) {
            const newQueries = {
                filter_id: [],
                category_id: [],
                brand_id: [],
                context: window.data.context,
                promotion_id: [],
            };

            if (['category', 'collection', 'promotion'].includes(_get(window.data, 'context'))) {
                newQueries.slug = _get(window.data, 'content.data.slug');
            }

            return dispatch('queryParams/setQueryParams', newQueries, { root: true });
        },
    },

    mutations: {
        ADD_ACTIVE_FILTER(state, newFilter) {
            state.activeFilters.push(newFilter);
        },

        REMOVE_ACTIVE_FILTER(state, { alias }) {
            state.activeFilters = state.activeFilters.filter(filter => filter.alias !== alias);
        },
    },
};
