<template>
    <div
        :class="`section-container section-width--${widthSection} align-content--${contentAlignment}`"
        :style="`--background-color: ${backgroundColor}; --button-color: ${buttonColor}; --text-color: ${textColor}; `"
    >
        <slot />
    </div>
</template>

<script>

export default {
    name: 'SectionContainer',

    props: [
        'widthSection',
        'contentAlignment',
        'backgroundColor',
        'buttonColor',
        'textColor',
    ],
};
</script>
