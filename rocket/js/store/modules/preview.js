import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _groupBy from 'lodash/groupBy';

export default {
    namespaced: true,

    state: {
        activeSection: '',
    },

    getters: {
        isPreview: (state, getters, rootGetters) => !_isNil(_get(rootGetters, 'queryParams.queryParams.preview')),
        activeSection: (state, getters, rootGetters) => state.activeSection,
    },

    actions: {
        load({ getters }) {
            if (!getters.isPreview) {
                return;
            }

            document.addEventListener('click', e => {
                const linkTarget = e.composedPath().find(target => target.nodeName === 'A');

                if (!linkTarget) {
                    return;
                }

                if (_get(linkTarget, 'dataset.allowPreview') !== undefined) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                return false;
            });
        },

        focusOnSection({ commit, state }, section) {
            const element = document.querySelector(`.${section}`);

            if (!element) {
                return;
            }

            const dist = element.offsetTop - 100;

            window.scroll({
                top: dist,
                behavior: 'smooth',
            });
        },

        updateParams({ commit, state }, params) {
            const paramsByScreenType = _groupBy(params, 'screen');

            if (paramsByScreenType.desktop?.length) {
                commit('PREVIEW_DESKTOP_PARAMS', paramsByScreenType.desktop);
                return;
            }

            if (paramsByScreenType.mobile?.length) {
                commit('PREVIEW_MOBILE_PARAMS', paramsByScreenType.mobile);
            }
        },

        setActiveSection({ commit, state }, params) {
            commit('SET_ACTIVE_SECTION', params);
        },
    },

    mutations: {
        PREVIEW_MOBILE_PARAMS(state, mobileParams) {
            window.parent.postMessage('clearParams', '*');
        },

        PREVIEW_DESKTOP_PARAMS(state, desktopParams) {
            window.parent.postMessage('clearParams', '*');
        },

        SET_ACTIVE_SECTION(state, params) {
            state.activeSection = params;
        },
    },
};
