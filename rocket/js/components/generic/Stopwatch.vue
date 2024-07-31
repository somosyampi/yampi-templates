<template>
    <span class="stopwatch" v-text="html"></span>
</template>

<script>
import _padStart from 'lodash/padStart';

export default {
    name: 'Stopwatch',

    mounted() {
        this.loadCountdown();
    },

    data: () => ({
        html: '',
    }),

    methods: {
        loadCountdown() {
            const now = new Date();
            const hours =  _padStart(23 - now.getHours(), 2, '0');
            const minutes = _padStart(59 - now.getMinutes(), 2, '0');
            const seconds = _padStart(59 - now.getSeconds(), 2, '0');

            this.html = `${hours} : ${minutes} : ${seconds}`;

            setTimeout(() => {
                this.loadCountdown();
            }, 500);
        },
    },
};
</script>
