import lazyload from './lazyload';

export default {
    install (Vue) {
        Vue.directive('lazyload', lazyload);
    },
};
