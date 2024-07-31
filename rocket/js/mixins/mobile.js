import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        mobileAt: {
            type: Number,
            default: 700,
        },
    },

    computed: {
        ...mapGetters('screen', [
            'width',
        ]),

        isMobile() {
            return this.width <= this.mobileAt;
        },
    },

    methods: {
        ...mapActions('screen', {
            bootScreenModule: 'boot',
        }),
    },

    mounted () {
        this.bootScreenModule();
    },
};
