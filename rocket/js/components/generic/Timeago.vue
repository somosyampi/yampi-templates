<template>
    <span>{{ new Date(date.replace(/\s+/g, 'T')).toLocaleDateString('pt-BR') }}</span>
</template>

<script>
export default {
    name: 'Timeago',

    props: {
        date: {
            type: [Date, String],
            required: true,
        },

        prefix: {
            type: String,
            default: '',
        },
    },
};
</script>
