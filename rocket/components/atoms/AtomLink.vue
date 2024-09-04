<template functional>
    <a
        class="rkt-link"
        :title="props.title"
        :href="props.href"
    >
        {{ props.label }}
    </a>
</template>

<script>
export default {
    name: 'AtomLink',

    props: {
        title: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>
