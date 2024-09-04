<template>
    <div
        ref="emptyLogo"
        class="empty-logo"
        :style="`font-size: ${fontSize}px`"
    >
        <a
            href="/"
            class="-clean"
        >
            {{ storeName }}
        </a>
    </div>
</template>

<script>
export default {
    name: 'EmptyLogo',

    props: {
        storeName: {
            type: String,
            required: true,
        },
    },

    computed: {
        fontSize() {
            const adjustedFontSize = Math.round(37.8 - 1.3 * (this.storeName.length));

            if (adjustedFontSize < 17) {
                return 17;
            }

            return adjustedFontSize;
        },
    },
};
</script>
