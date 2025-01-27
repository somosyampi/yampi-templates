<template>
    <div
        class="vue-slider"
        :style="`height: ${height}px;`"
    >
        <div class="vue-slider__wrapper">
            <div class="vue-slider__background" />
            <div
                class="vue-slider__track"
                :style="trackStyle"
            />
            <input
                v-model="localMin"
                type="range"
                :min="min"
                :max="max"
                :step="step"
                @input="updateMin"
                @change="onSliderChange"
            >
            <input
                v-model="localMax"
                type="range"
                :min="min"
                :max="max"
                :step="step"
                @input="updateMax"
                @change="onSliderChange"
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        value: {
            type: Array,
            default: () => [],
        },
        height: {
            type: Number,
            default: 5,
        },
    },

    data() {
        return {
            localMin: this.value[0],
            localMax: this.value[1],
        };
    },

    computed: {
        trackStyle() {
            const minPercentage = ((this.localMin - this.min) / (this.max - this.min)) * 100;
            const maxPercentage = ((this.localMax - this.min) / (this.max - this.min)) * 100;
            return {
                left: `${minPercentage}%`,
                width: `${maxPercentage - minPercentage}%`,
            };
        },
    },

    watch: {
        value: {
            handler(newValue) {
                this.localMin = Number(newValue[0]);
                this.localMax = Number(newValue[1]);
            },
            deep: true,
        },
    },

    methods: {
        updateMin() {
            if (this.localMin > this.localMax - this.step) {
                this.localMin = this.localMax - this.step;
            }

            this.emitValues();
        },

        updateMax() {
            if (this.localMax < this.localMin + this.step) {
                this.localMax = this.localMin + this.step;
            }

            this.emitValues();
        },

        emitValues() {
            this.$emit('input', [this.localMin, this.localMax]);
        },

        onSliderChange() {
            this.$emit('change', [this.localMin, this.localMax]);
        },
    },
};
</script>

<style lang="scss">
.vue-slider__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.vue-slider__background {
    background-color: var(--default-background-color);
    border-radius: 15px;
    position: absolute;
    width: 100%;
    height: 100%;
}

.vue-slider__track {
    pointer-events: none;
    position: absolute;
    height: 100%;
    background-color: var(--color-general-primary);
}

.vue-slider {
    margin: 0 -7px;

    input[type="range"] {
        position: absolute;
        width: 100%;
        appearance: none;
        height: 100%;
        background: transparent;
        pointer-events: none;
        margin: 0;
    }

    input[type="range"]::-webkit-slider-thumb {
        pointer-events: auto;
        appearance: none;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: none;
        background-color: var(--default-background-color);
        border: solid 4px var(--color-general-primary);
    }
}
</style>
