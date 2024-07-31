import Vue from 'vue';
import Vuex from 'vuex';
import VueObserveVisibility from 'vue-observe-visibility';
import components from './components';
import plugins from './plugins';
import directives from './directives';
import boot from './mixins/boot';
import i18n from './plugins/i18n';

Vue.use(Vuex);
Vue.use(VueObserveVisibility);
Vue.use(plugins);
Vue.use(directives);
Vue.use(components);
Vue.mixin(require('./mixins/helpers').default);

window.Vue = Vue;

// eslint-disable-next-line no-new
const vueInstance = new Vue({
    el: '#app',
    mixins: [boot],
    // eslint-disable-next-line global-require
    store: require('./store').default,
    i18n,
});

window.vueInstance = vueInstance;
