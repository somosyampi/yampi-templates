<template>
    <div
        id="custom-radio"
        class="custom-radio"
        role="radiogroup"
        aria-labelledby="group_label"
    >
        <div id="group_label">
            <slot name="title" />
        </div>

        <div class="radio-title">
            <slot name="subtitle" />
        </div>

        <label
            v-for="(option, i) in options"
            :key="option.key"
            class="radio-group-item"
            role="radio"
            :aria-checked="!!isChecked(picked, option)"
            :tabindex="i"
            @click="handlePick(option.value)"
        >

            {{ option.text }}

            <input
                v-model="picked"
                type="radio"
                name="radio"
                :value="option.value"
            >

            <span
                class="checkmark"
                :class="isChecked(picked, option)"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'CustomRadioGroup',

    props: {
        name: {
            type: String,
            default: '',
        },

        options: {
            type: Array,
            required: true,
            validator: value => !!value.length,
        },

        initialValue: {
            type: Boolean,
            required: true,
        },

        value: {
            type: Boolean,
            required: false,
        },
    },

    data: () => ({
        picked: '',
    }),

    mounted() {
        this.picked = this.initialValue;
    },

    updated() {
        this.picked = this.value;
    },

    methods: {
        isChecked(value, option) {
            return value === option.value ? 'checked' : '';
        },

        handlePick(picked) {
            this.$emit('pick', picked);
        },
    },
};
</script>
