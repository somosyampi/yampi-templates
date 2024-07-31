export default {
    namespaced: true,

    state: {
        images: [],
    },

    getters: {
        images: state => state.images,
        lazyloadImages: state => state.images.filter(image => image.lazyload),
    },

    actions: {},

    mutations: {
        PUSH(state, payload) {
            const searchImage = state.images.filter(image => image.uid === payload.uid);

            if (searchImage.length === 0) {
                state.images.push(payload);
            }
        },

        POP(state, payload) {
            const searchImage = state.images.filter(image => image.uid === payload.uid);

            if (searchImage.length) {
                state.images.shift();
            }
        },

        CLEAR(state, key) {
            state[key] = [];
        },
    },
};
