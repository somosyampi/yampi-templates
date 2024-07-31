export default {
    namespaced: true,

    state: {
        buttons: [],
    },

    getters: {
        buttons: state => {
            return state.buttons;
        },
    },

    actions: {},

    mutations: {
        PUSH(state, { queue, itemId }) {
            if (!state[queue].includes(itemId)) {
                state[queue].push(itemId);
            }
        },

        POP(state, { queue, itemId }) {
            if (state[queue].includes(itemId)) {
                state[queue].shift();
            }
        },
    },
};
