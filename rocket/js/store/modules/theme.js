export default {
    namespaced: true,

    state: {
        page: window.Yampi.page,
        alias: window.themeConfig.theme.alias,
        sections: window.themeConfig.sections,
        params: window.themeConfig.theme.params,
    },

    getters: {
        themeStyle: state => state.params,
    },

    actions: {

    },

    mutations: {

    },
};
