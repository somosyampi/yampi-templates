<template>
    <div
        ref="observerRoot"
        class="lazy-visibility"
        :class="{ 'is-visible': isVisible }"
    >
        <slot v-if="isVisible" />
    </div>
</template>

<script>
export default {
    name: 'LazyVisibility',

    data() {
        return {
            isVisible: false,
            observer: null,
        };
    },

    mounted() {
        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.observer.disconnect();
                }
            },
            {
                root: null,
                threshold: 0.2,
            },
        );
        this.observer.observe(this.$refs.observerRoot);
    },

    beforeDestroy() {
        if (this.observer) this.observer.disconnect();
    },
};
</script>
