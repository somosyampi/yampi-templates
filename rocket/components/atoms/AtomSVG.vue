<template functional>
    <svg
        :class="`rkt-svg ${props.customClass}`"
        xmlns="http://www.w3.org/2000/svg"
        :width="props.width"
        :height="props.heigth"
        :viewBox="`0 0 ${props.width} ${props.height}`"
        :fill="props.fill"
    >
        <slot />
    </svg>
</template>

<script>
export default {
    name: 'AtomSVG',

    props: {
        width: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        fill: {
            type: String,
            required: true,
        },
        customClass: {
            type: String,
            default: '',
        },
    },
};
</script>
