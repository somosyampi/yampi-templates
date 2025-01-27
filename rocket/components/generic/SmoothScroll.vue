<template>
    <div
        class="smooth-element"
        :class="{ visible: canShow }"
    >
        <slot :scroll="scroll" />
    </div>
</template>

<script>
import _ from '~/lodash';

export default {
    name: 'SmoothScroll',

    props: {
        elementId: {
            type: String,
            default: null,
        },

        margin: {
            type: Number,
            default: 0,
        },

        displayAt: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            canShow: false,
        };
    },

    mounted() {
        this.show();
    },

    methods: {
        scroll(e) {
            e.preventDefault();

            let offset = 0;
            const speedIndex = 30;
            const element = this.elementId
                ? document.getElementById(this.elementId)
                : document.body;

            if (element) {
                // avoid offset to be a negative number
                offset = Math.max(element.offsetTop - this.margin, 0);
            }

            const scrollDiff = offset - window.scrollY;
            let speed = scrollDiff / speedIndex;
            const requestAnimationFrame = window.requestAnimationFrame
                    || window.mozRequestAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || window.msRequestAnimationFrame;

            const cancelAnimationFrame = window.cancelAnimationFrame
                    || window.mozCancelAnimationFrame;

            let myRequestAnimationFrame;

            const step = () => {
                window.scrollBy(0, speed);

                const goingUp = speed < 0;
                const newDiff = offset - window.scrollY;

                if (
                    (goingUp && window.scrollY <= offset)
                    || (!goingUp && window.scrollY >= offset)
                ) {
                    return cancelAnimationFrame(myRequestAnimationFrame);
                }

                speed = goingUp ? Math.max(speed, newDiff) : Math.min(speed, newDiff);

                myRequestAnimationFrame = requestAnimationFrame(step);
            };

            myRequestAnimationFrame = requestAnimationFrame(step);
        },

        show() {
            if (!this.displayAt) {
                this.canShow = true;
                return;
            }

            const displayElement = () => {
                if (window.scrollY >= this.displayAt) {
                    this.canShow = true;
                    return;
                }

                this.canShow = false;
            };

            displayElement();

            document.addEventListener(
                'scroll',
                _.debounce(() => {
                    displayElement();
                }, 40),
                { passive: true },
            );
        },
    },
};
</script>
