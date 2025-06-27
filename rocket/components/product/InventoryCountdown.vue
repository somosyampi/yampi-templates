<template>
    <div class="main-product-inventory-countdown">
        <div class="quantity-left-text">
            Apenas
            <span
                class="quantity-left"
                v-text="actual"
            />
            produtos
            <span class="inline-block">
                em estoque
            </span>
        </div>

        <div class="percentage-bar-holder">
            <div
                class="percentage-bar"
                :style="barStyle"
            />
        </div>

        <div class="countdown flex -vcenter -hcenter">
            <span class="countdown-text">Oferta acaba em</span>
            <Stopwatch class="countdown-timer" />
        </div>
    </div>
</template>

<script>
import _ from '~/lodash';

export default {
    name: 'InventoryCountdown',

    data: () => ({
        actual: 12,
        start: 12,
        max: 48,
        min: 2,
        timeout: 10000,
    }),

    computed: {
        barStyle() {
            const percentage = 10 + _.round((this.actual / this.max) * 100, 2);

            return {
                width: `${percentage}%`,
            };
        },
    },

    mounted() {
        this.runCountdown();
    },

    methods: {
        runCountdown() {
            const nextTimeout = (this.start - this.actual + 1) * this.timeout;

            setTimeout(() => {
                this.actual--;

                if (this.actual > this.min) {
                    this.runCountdown();
                }
            }, nextTimeout);
        },
    },
};
</script>
