<template>
    <div
        class="error-text"
        v-if="text"
        v-text="text"
    ></div>
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
