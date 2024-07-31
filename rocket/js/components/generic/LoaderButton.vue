<template>
    <button
        class="loader-button"
        :class="{ sending }"
        :disabled="disabled"
        @click="handleClick"
    >
        <slot>{{ title }}</slot>
        <svg viewBox="0 0 36 8">
            <circle cx="4" cy="4" r="4">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin=".1"
                />
            </circle>
            <circle cx="18" cy="4" r="4">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin=".2"
                />
            </circle>
            <circle cx="32" cy="4" r="4">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin=".3"
                />
            </circle>
        </svg>
    </button>
</template>

<script>
import { mapMutations } from 'vuex';
import buttonsMixin from '../../mixins/buttons.js';

export default {
    name: 'LoaderButton',

    mixins: [buttonsMixin],

    props: {
        sending: {
            type: Boolean,
            required: true,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        title: {
            type: String,
            default: '',
        },

        listenPosition: {
            type: Boolean,
            default: false,
        },
    },

    watch: {
        'scrollPos.y'(newVal) {
            if (!this.listenPosition) return;

            const limInf = newVal + this.height > this.$el.offsetTop;
            const limSup =
                newVal + this.height < this.$el.offsetTop + this.height;

            if (limInf && limSup) {
                this.PUSH({ queue: 'buttons', itemId: this._uid });
            } else {
                this.POP({ queue: 'buttons', itemId: this._uid });
            }
        },
    },

    methods: {
        ...mapMutations('queue', ['PUSH', 'POP']),

        handleClick(e) {
            if (this.disabled) {
                return;
            }

            this.$emit('click', e);
        },
    },
};
</script>
