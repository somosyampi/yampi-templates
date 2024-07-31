<template>
    <div
        class="modal-background"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        :class="{ active: show }"
        @mousedown="backgroundClick"
    >
        <div
            :id="'modal-' + name"
            class="modal"
            :class="{ scrollable, '-fix': fixSafariBackground }"
        >
            <div class="flex -between">
                <div class="modal-header">
                    <div
                        id="modal-title"
                        class="theme-title"
                        v-text="title"
                    />
                    <div
                        id="modal-desc"
                        class="-subtitle"
                    >
                        <slot name="subtitle" />
                    </div>
                </div>

                <div
                    class="close-modal"
                    @click="closeModal"
                >
                    <i class="icon icon-close-modal" />
                </div>
            </div>

            <div class="modal-content">
                <slot />
            </div>

            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
import _delay from 'lodash/delay';

export default {
    name: 'Modal',

    props: {
        name: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            default: '',
        },

        scrollable: {
            type: Boolean,
            default: false,
        },

        fixSafariBackground: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        show: false,
    }),

    mounted() {
        this.listenToEscape();
    },

    methods: {
        handleModal() {
            return {
                true: this.closeModal,
                false: this.showModal,
            }[this.show]();
        },

        showModal() {
            this.show = true;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.marginRight = `${scrollbarWidth}px`;
            document.getElementsByTagName('body')[0].classList.add('block-scroll');
        },

        closeModal() {
            this.$children.map(function(children, i) {
                if (children.$options.name === 'ImageSelector') {
                    let imageInputs = children.$children

                    imageInputs.map(function(inputImage, i) {
                        inputImage.deleteInputFromClosingModal()
                    })
                }
            });

            this.show = false;
            document.getElementById('app').style.overflow = '';
            _delay(() => {
                document.getElementsByTagName('body')[0].classList.remove('block-scroll');
                document.documentElement.classList.remove('block-scroll');
                document.body.style.marginRight = `0px`;
            }, 350, 'later');

            this.$emit('close');
        },

        backgroundClick(e) {
            if (this.$el === e.target) {
                this.closeModal();
            }
        },

        listenToEscape() {
            document.addEventListener('keydown', e => {
                const event = e || window.event;

                if (event.key === 'Escape') {
                    this.closeModal();
                }
            });
        },
    },
};
</script>
