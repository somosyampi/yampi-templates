<template functional>
    <button
        :class="`rocket-button ${props.customClasses}`"
        v-bind="data.attrs"
        v-on="listeners"
    >
        {{ props.label }}
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },

        customClasses: {
            type: String,
            default: '',
        },
    },
};
</script>
