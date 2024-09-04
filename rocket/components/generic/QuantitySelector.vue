<template>
    <div
        class="quantity-selector relative"
        :class="{ disabled: disabled }"
    >
        <span
            class="quantity-btn -minus"
            @click="decrease()"
        ><i class="icon icon-minus" /></span>

        <input
            v-model.number.lazy="currentValue"
            type="text"
            name="product-quantity"
            :disabled="disabled"
            @keypress="checkInput($event)"
            @blur="checkIfEmpty()"
        >

        <span
            class="quantity-btn -more"
            @click="increase()"
        ><i class="icon icon-more" /></span>
    </div>
</template>

<script>
export default {
    name: 'QuantitySelector',

    props: {
        value: {
            type: Number,
            default: 1,
        },

        min: {
            type: [Number, Boolean],
            default: 1,
        },

        max: {
            type: [Number, Boolean],
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        currentValue: 1,
    }),

    watch: {
        value: {
            immediate: true,
            handler() {
                this.currentValue = this.value;
            },
        },

        currentValue() {
            if (this.currentValue === '') {
                return;
            }

            if (this.min !== false && this.currentValue < this.min) {
                this.currentValue = this.min;

                return;
            }

            this.$emit('input', this.currentValue);
            this.$emit('change', this.currentValue);
        },
    },

    methods: {
        decrease() {
            if (this.disabled) {
                return;
            }

            // have to check boolean, otherwise it may collide with 0
            if (this.min !== false && this.currentValue <= this.min) {
                return;
            }

            this.currentValue--;
        },

        increase() {
            if (this.disabled) {
                return;
            }

            if (this.max !== false && this.currentValue >= this.max) {
                return;
            }

            this.currentValue++;
        },

        checkInput(event) {
            if (/^[0-9]*$/g.test(event.key)) {
                return true;
            }

            event.preventDefault();

            return false;
        },

        checkIfEmpty() {
            if (this.currentValue === '') {
                this.currentValue = this.min !== false ? this.min : 0;
            }
        },
    },
};
</script>
