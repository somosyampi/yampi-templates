<script>
import Vue from 'vue';

export default {
    name: 'HeaderProvider',

    provide() {
        return {
            section: 'header',
            params: Vue.observable(this.config.params),
        };
    },

    props: {
        config: {
            type: Object,
            required: true,
        },
    },

    render(h) {
        return this.$scopedSlots.default();
    },
};
</script>
