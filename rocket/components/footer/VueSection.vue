<template>
    <section
        v-if="show"
        class="done"
    >
        <slot />
    </section>
</template>

<script>

export default {
    name: 'VueSection',

    props: {
        delay: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            show: false,
        };
    },

    mounted() {
        this.showSection();
    },

    methods: {
        showSection() {
            setTimeout(() => {
                this.show = true;
            }, this.delay);
        },
    },
};
</script>
