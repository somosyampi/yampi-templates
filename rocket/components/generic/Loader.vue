<template>
    <div
        class="loader-bg"
        :style="getStyle()"
    ></div>
</template>

<script>
export default {

    props: {
        width: {
            type: Number,
            default: null
        },

        height: {
            type: Number,
            default: null
        },

        margin: {
            type: Number,
            default: 0
        },

        customStyle: {
            type: String,
            default: null
        }
    },

    methods: {
        getStyle() {
            return {
                width: this.width ? `${this.width}%` : false,
                height: this.height ? `${this.height}px` : false,
                marginTop: this.margin ? `${this.margin}px` : false,
            };
        },
    },

}
</script>
