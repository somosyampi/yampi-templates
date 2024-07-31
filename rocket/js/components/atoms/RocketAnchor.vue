<template functional>
    <a
        v-bind="data.attrs"
        :ref="props.customRef"
        :class="`rocket-anchor ${props.customClasses}`"
        :href="props.href"
        v-on="listeners"
    >
        {{ props.label }}
        <slot />
    </a>
</template>

<script>
export default {
    props: {
        href: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            required: true,
        },
        customClasses: {
            type: String,
            default: '',
        },
        customRef: {
            type: String,
            default: null,
        },
    },
};
</script>
