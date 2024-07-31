import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('merchant', ['merchant', 'defaultCard', 'creditCardOnly']),
    },
};
