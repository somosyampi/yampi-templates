<script>
import Vue from '~vue';

export default {
    name: 'SectionProvider',

    provide() {
        return {
            params: Vue.observable(this.params),
            pageConfig: Vue.observable(this.pageParams),
        };
    },

    props: {
        config: {
            type: Object,
            required: true,
        },
        pageConfig: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            params: this.config.params,
            pageParams: this.pageConfig?.data.theme.params,
        };
    },

    render(h) {
        return this.$scopedSlots.default();
    },
};
</script>
