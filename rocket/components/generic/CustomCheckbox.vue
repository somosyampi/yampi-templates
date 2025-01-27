<template>
   <div class="custom-checkbox relative">
        <label :class="{'with-effect': color || image}">
            {{ text }}
            <input
                type="checkbox"
                v-model="checkedState"
                @change="change"
            >
            <span
                class="effect-box"
                :style="effectBoxStyle"
                v-if="color || image"
            ></span>
            <span class="checkmark"></span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'CustomCheckbox',

    props: {
        name: {
            type: String,
            default: ''
        },

        id: {
            type: String,
            default: ''
        },

        text: {
            type: String,
            default: ''
        },

        checked: {
            type: Boolean,
            default: false
        },

        color: {
            type: String,
            default: null
        },

        image: {
            type: String,
            default: null
        },
    },

    watch: {
        checked: {
            immediate: true,
            handler() {
                this.checkedState = this.checked;
            },
        },
    },

    data: () => ({
        checkedState: false
    }),

    computed: {
        effectBoxStyle() {
            const backgroundImage = this.image 
                ? `url(${this.image})` 
                : null;

            return {
                backgroundImage,
                backgroundColor: this.color,
            };
        },
    },

    methods: {
        change() {
            this.$emit('change', this.checkedState);
        },
    },

};
</script>
