<template>
    <span
        class="stopwatch"
        v-text="html"
    />
</template>

<script>
import _ from '~/lodash';

export default {
    name: 'Stopwatch',

    data: () => ({
        html: '',
    }),

    mounted() {
        this.loadCountdown();
    },

    methods: {
        loadCountdown() {
            const now = new Date();
            const hours = _.padStart(23 - now.getHours(), 2, '0');
            const minutes = _.padStart(59 - now.getMinutes(), 2, '0');
            const seconds = _.padStart(59 - now.getSeconds(), 2, '0');

            this.html = `${hours} : ${minutes} : ${seconds}`;

            setTimeout(() => {
                this.loadCountdown();
            }, 500);
        },
    },
};
</script>
