/* eslint-disable vue/component-definition-name-casing */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faYoutube,
    faInstagram,
    faFacebookF,
    faPinterestP,
    faTiktok,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    install(Vue) {
        [
            faYoutube,
            faInstagram,
            faFacebookF,
            faPinterestP,
            faTiktok,
            faTwitter,
        ].forEach(icon => library.add(icon));

        Vue.component('fa-icon', FontAwesomeIcon);
    },
};
