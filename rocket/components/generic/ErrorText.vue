<template>
    <div
        v-if="text"
        class="error-text"
        v-text="text"
    />
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        },
    },
};
</script>
