<template>
    <div
        :class="{
            'error': error && !selectedValue,
            'disabled': disabled
        }"
        class="holder-variant-button"
    >
        <button
            v-for="option in options"
            :key="option.id"
            :class="{
                'selected': option.id === value,
                'unavailable': option.unavailable
            }"
            class="variant-button"
            @click="handleClick($event, option.id)"
        >
            <IconEdit
                v-if="option.unavailable"
                class="unavailable-icon"
            />
            <p class="text">
                {{ option.value }}
            </p>
        </button>
    </div>
</template>

<script>
export default {
    name: 'VariantButton',

    props: {
        options: {
            type: undefined,
            default: () => [],
        },

        value: {
            type: Number,
            default: 0,
        },

        error: {
            type: Boolean,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            selectedValue: null,
        };
    },

    watch: {
        value(newValue) {
            if (newValue === 0) {
                this.selectedValue = null;
            }
        },
    },

    methods: {
        handleClick($event, value) {
            this.selectedValue = value;
            this.$emit('change', value);
        },
    },
};
</script>
