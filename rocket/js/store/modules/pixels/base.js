export default {
    namespaced: true,

    state: {
        active: false,
    },

    getters: {
        active: state => state.active,
    },

    actions: {
        addScript(_, script) {
            return new Promise(resolve => {
                const s = document.createElement('script');
                s.setAttribute('src', script);
                s.defer = true;
                s.onload = resolve;
                document.body.appendChild(s);
            });
        },

        addNoScript(_, template) {
            const ns = document.createElement('noscript');
            const t = document.createTextNode(template);
            ns.appendChild(t);
            document.head.appendChild(ns);
        },

        boot() { },

        event({ state, dispatch }, { event, type, payload = undefined }) {
            if (!state.active) {
                return;
            }

            return dispatch('_mark', { event, type, payload });
        },

        productPageEvent() { },

        categoryPageEvent() { },

        addToCartEvent(_, { ids, skus, products, value, quantities }) { },
    },

    mutations: {
        SET_ACTIVE(state, payload) {
            state.active = payload;
        },
    },
};
