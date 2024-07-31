import ZoomOnHover from 'vue-zoom-on-hover';
import { VueMaskDirective, VueMaskFilter } from 'v-mask';
import fontAwesome from './fontAwesome';
import sentry from './sentry';

export default {
    install(Vue) {
        Vue.use(ZoomOnHover);
        Vue.use(fontAwesome);
        Vue.use(sentry);

        Vue.directive('mask', VueMaskDirective);
        Vue.filter('mask', VueMaskFilter);
    },
};
