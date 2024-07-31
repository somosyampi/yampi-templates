import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters('screen', ['scrollPos', 'height']),
        ...mapGetters('queue', ['buttons']),
    },

    methods: {
        ...mapActions('screen', ['scroll']),
    },
};
