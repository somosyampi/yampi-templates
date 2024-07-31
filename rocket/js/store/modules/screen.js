import _debounce from 'lodash/debounce';

export default {
    namespaced: true,

    state: {
        booted: false,
        width: window.innerWidth,
        height: window.innerHeight,
        scrollPos: {
            isListening: false,
            x: 0,
            y: 0,
        },
    },

    getters: {
        width: state => state.width,
        height: state => state.height,
        scrollPos: state => state.scrollPos,
    },

    actions: {
        boot({ commit, state }) {
            if (state.booted) {
                return;
            }

            commit('BOOTED');

            window.addEventListener(
                'resize',
                _debounce(() => {
                    commit('SET_WIDTH', window.innerWidth);
                }, 100),
            );
        },

        scroll({ commit, state }) {
            if (!state.scrollPos.isListening) {
                window.addEventListener('scroll', e => {
                    commit('SET_SCROLL_POS', {
                        isListening: true,
                        x: window.scrollX,
                        y: window.scrollY,
                    });
                });
            }
        },
    },

    mutations: {
        SET_SCROLL_POS(state, payload) {
            state.scrollPos = payload;
        },

        SET_WIDTH(state, newWidth) {
            state.width = newWidth;
        },

        BOOTED(state) {
            state.booted = true;
        },
    },
};
