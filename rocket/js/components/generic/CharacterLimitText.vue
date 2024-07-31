<template>
    <div
        class="char-limit"
        :class="{ 'near-limit': currentTextLength > (limit - 50) }"
    >
        {{ $tc('forms.character-limit', limit - currentTextLength) }}
    </div>
</template>

<script>
export default {
    name: 'CharacterLimitText',

    props: {
        limit: {
            type: Number,
            required: true,
        },

        currentTextLength: {
            type: Number,
            required: true,
        },
    },
};
</script>
