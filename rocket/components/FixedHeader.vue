<template>
    <div :class="{ 'fixed-header': headerIsFixed }">
        <slot />
    </div>
</template>

<script>
import _ from '~lodash';
import { mapGetters } from '~vuex';

export default {
    name: 'FixedHeader',

    props: {
        fixed: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            headerIsFixed: false,
        };
    },

    computed: {
        ...mapGetters('header', [
            'showSearchBar',
        ]),
    },

    mounted() {
        this.listen();
    },

    updated() {
        this.updateScrollbarWidth();
    },

    methods: {
        updateScrollbarWidth() {
            document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`);
        },

        listen() {
            window.onresize = () => {
                this.updateScrollbarWidth();
            };

            if (!this.fixed) {
                return;
            }

            const header = document.getElementById('section-header');

            document.addEventListener(
                'scroll',
                _.debounce(() => {
                    const needsHeaderFixed = (window.pageYOffset - header.clientHeight) > 0;
                    this.$store.dispatch('header/updateShowSearchBar', !needsHeaderFixed);
                    this.headerIsFixed = needsHeaderFixed;
                }, 0),
                { passive: true },
            );
        },
    },
};
</script>
