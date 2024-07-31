export default {
    namespaced: true,

    state: {
        page: window.Yampi.page,
        cartToken: window.Yampi.cart_token,
        env: window.Yampi.env,
        csrfToken: window.Yampi.csrf_token,
        session: window.Yampi.session,
        recomm: window.Yampi.mago_config.recomm_id,
    },

    getters: {
        page: state => state.page,
        cartToken: state => state.cartToken,
        env: state => state.env,
        csrfToken: state => state.csrfToken,
        session: state => state.session,
        recomm: state => state.recomm,
    },

    actions: {
        setRecomm({ commit }, payload) {
            commit('SET_RECOMM', payload);
        },
    },

    mutations: {
        SET_RECOMM(state, payload) {
            state.recomm = payload;
        },
    },
};
