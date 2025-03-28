<template functional>
    <a
        v-bind="data.attrs"
        :ref="props.customRef"
        :class="`rocket-anchor ${props.customClasses}`"
        :href="props.href"
        :target="props.targetType"
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

        targetType: {
            type: String,
            default: '_self',
            validator: value => [
                '_self',
                '_blank',
                '_parent',
                '_top',
            ].includes(value),
        },
    },
};
</script>
