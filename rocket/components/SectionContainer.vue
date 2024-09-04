<template>
    <div :class="`section-container section-width--${params.width_section} align-content--${params.content_alignment}`" 
        :style="`--background-color: ${params.background_color}; --button-color: ${params.button_color}; --text-color: ${params.text_color}; `"
    >
        <slot 
            :title-text="params.title_text"
            :description-text="params.description_text"
        ></slot>
    </div>
</template>

<script>
import RocketAnchor from '@/components/atoms/RocketAnchor';

export default {
    name: 'SectionContainer',

    inject: ['params'],

    components: {
        RocketAnchor
    },

    methods: {
        extractCssStyleVar({ paramsFields }) {

        }
    }
}
</script>