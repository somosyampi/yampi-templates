<template>
    <div
        ref="target"
        class="expandable-holder"
        :class="{ 'is-expanded': isExpanded }"
    >
        <div
            v-if="isMobile"
            class="expandable-title flex -between -vcenter"
            @click="reverse"
        >
            <span v-text="title" />
            <svg
                width="11"
                height="6"
                fill="none"
            >
                <defs />
                <path d="M4.878 5.727c.364.364.849.364 1.213 0l4.242-4.242c.364-.364.364-.849 0-1.212-.364-.364-.848-.364-1.212 0L4.878 4.515c-.363.364-.363.849 0 1.212z" />
                <path d="M6.09 5.727c.364-.363.364-.848 0-1.212L1.849.273C1.484-.091 1-.091.636.273c-.364.363-.364.848 0 1.212l4.242 4.242c.364.364.849.364 1.213 0z" />
            </svg>
        </div>

        <slot />
    </div>
</template>

<script>
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'Expandable',

    mixins: [
        mobileMixin,
    ],

    props: {
        title: {
            type: String,
            required: true,
        },

        height: {
            type: Number,
            default: 53,
        },

        expand: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isExpanded: false,
        };
    },

    watch: {
        isMobile() {
            this.start();
        },
    },

    mounted() {
        this.start();
    },

    methods: {
        open() {
            this.setHeight(this.$refs.target.scrollHeight, true);
        },

        close() {
            this.setHeight(this.height, false);
        },

        setHeight(height, expandState) {
            this.isExpanded = expandState;
            this.$refs.target.style.height = height ? `${height}px` : null;
        },

        reverse() {
            if (this.isExpanded) {
                return this.close();
            }

            return this.open();
        },

        start() {
            if (this.isMobile) {
                return this.startMobile();
            }

            this.startDesktop();
        },

        startMobile() {
            if (this.expand) {
                return this.open();
            }

            return this.close();
        },

        startDesktop() {
            this.setHeight(null, true);
        },
    },
};
</script>
