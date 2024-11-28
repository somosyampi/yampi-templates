<template>
    <div class="holder-price-slider">
        <vue-slider
            :min="min"
            :max="max"
            :lazy="true"
            :step="0.01"
            :height="height"
            :dot-size="dotSize"
            tooltip="none"
            v-model="values"
            @input="updateValues"
            @change="change"
        ></vue-slider>

        <div class="step-values">
            <span class="selected-min" v-text="formatedMin"></span>
            <span class="divisor"> - </span>
            <span class="selected-max" v-text="formatedMax"></span>
        </div>
    </div>
</template>

<script>
import _ from '~/lodash';

export default {
    name: 'RangeSlider',

    props: {
        min: {
            type: Number,
            default: 0,
        },

        max: {
            type: Number,
            required: true,
        },

        currency: {
            type: Boolean,
            default: true,
        },

        value: {
            type: Array,
            default: () => [],
        },

        removePrefix: {
            type: Boolean,
            default: false,
        },

        height: {
            type: Number,
            default: 5,
        },

        dotSize: {
            type: Number,
            default: 17,
        },
    },

    mounted() {
        this.selectedMin = _.get(this.value, 0, this.min);
        this.selectedMax = _.get(this.value, 1, this.max);
    },

    computed: {
        formatedMin() {
            return this.currency
                ? this.$formatMoney(this.selectedMin, this.removePrefix)
                : this.selectedMin;
        },

        formatedMax() {
            return this.currency
                ? this.$formatMoney(this.selectedMax, this.removePrefix)
                : this.selectedMax;
        },
    },

    watch: {
        value: {
            deep: true,
            immediate: true,
            handler() {
                this.values = this.value;
                this.updateValues(this.value);
            },
        },
    },

    data: () => ({
        selectedMin: 0,
        selectedMax: 0,
        values: [],
    }),

    methods: {
        updateValues([min, max]) {
            this.selectedMin = min;
            this.selectedMax = max;
        },

        change(values) {
            this.updateValues(values)
            this.$emit('input', values);
        },
    },

};
</script>