<template>
    <div class="custom-checkbox relative">
        <label :class="{'with-effect': color || image}">
            {{ text }}
            <input
                v-model="checkedState"
                type="checkbox"
                @change="change"
            >
            <span
                v-if="color || image"
                class="effect-box"
                :style="effectBoxStyle"
            />
            <span class="checkmark" />
        </label>
    </div>
</template>

<script>
export default {
    name: 'CustomCheckbox',

    props: {
        name: {
            type: String,
            default: '',
        },

        id: {
            type: String,
            default: '',
        },

        text: {
            type: String,
            default: '',
        },

        checked: {
            type: Boolean,
            default: false,
        },

        color: {
            type: String,
            default: null,
        },

        image: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        checkedState: false,
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

    watch: {
        checked: {
            immediate: true,
            handler() {
                this.checkedState = this.checked;
            },
        },
    },

    methods: {
        change() {
            this.$emit('change', this.checkedState);
        },
    },

};
</script>
