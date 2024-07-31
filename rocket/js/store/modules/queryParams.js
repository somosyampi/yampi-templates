import qs from 'qs';
import Vue from 'vue';
import _each from 'lodash/each';
import _xor from 'lodash/xor';
import _get from 'lodash/get';
import _remove from 'lodash/remove';
import _omit from 'lodash/omit';
import _merge from 'lodash/merge';
import _castArray from 'lodash/castArray';
import { applyQueriesToUrl } from '@/mixins/helpers';

const HIDDEN_QUERIES = ['slug', 'context', 'resultsOnly', 'limit'];

export default {
    namespaced: true,

    state: {
        queryParams: {
            page: 1,
        },
    },

    getters: {
        queryParams: state => state.queryParams,
    },

    actions: {
        load({ dispatch }) {
            const urlQueries = qs.parse(window.location.search.slice(1));

            _each(urlQueries, (query, key) => {
                if (Array.isArray(query)) {
                    urlQueries[key] = query.map(item => Number(item));

                    return;
                }

                urlQueries[key] = isNaN(query) ? query : Number(query);
            });

            return dispatch('setQueryParams', urlQueries);
        },

        setQueryParams({ commit, dispatch }, payload) {
            commit('SET_QUERY_PARAMS', payload);
            dispatch('updateUrl');
        },

        removeQueryParams({ commit, dispatch }, payload) {
            commit('REMOVE_QUERY_PARAMS', payload);
            dispatch('updateUrl');
        },

        updateUrl({ commit, state }) {
            const queryParams = _omit(state.queryParams, HIDDEN_QUERIES);

            if (queryParams.page === 1) {
                delete queryParams.page;
            }

            const url = applyQueriesToUrl(`${window.location.origin}${window.location.pathname}`, queryParams);

            window.history.pushState({}, document.title, url);

            commit('EVENT_URL_UPDATED');
        },
    },

    mutations: {
        ADD_ACTIVE_FILTER(state, newFilter) {
            state.activeFilters.push(newFilter);
        },

        REMOVE_ACTIVE_FILTER(state, { alias }) {
            state.activeFilters = state.activeFilters.filter(filter => filter.alias !== alias);
        },

        SET_QUERY_PARAMS(state, queryParams) {
            _each(queryParams, (value, key) => {
                if (Array.isArray(state.queryParams[key])) {
                    Vue.set(state.queryParams, key, _xor(state.queryParams[key], _castArray(value)));

                    return;
                }

                if (state.queryParams[key] === value) {
                    delete state.queryParams[key];

                    return;
                }

                Vue.set(state.queryParams, key, value);
            });
        },

        REMOVE_QUERY_PARAMS(state, queryParams) {
            _each(_castArray(queryParams), key => {
                delete state.queryParams[key];
            });
        },

        EVENT_URL_UPDATED() { },
    },
};
