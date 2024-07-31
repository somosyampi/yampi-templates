export default {

    props: {
        useCaptureByEvent: {
            type: Array,
            default: () => [
                { touchstart: false },
                { touchend: false },
                { touchcancel: false },
                { touchleave: false },
                { touchmove: false },
            ],
        },
    },

    data() {
        return {
            touchEvents: [
                { name: 'touchstart', handler: this.handleTouchStart },
                { name: 'touchend', handler: this.handleTouchEnd },
                { name: 'touchcancel', handler: this.handleTouchCancel },
                { name: 'touchleave', handler: this.handleTouchLeave },
                { name: 'touchmove', handler: this.handleTouchMove },
            ],
            touchStartLength: 0,
            initialClientX: 0,
            finalClientX: 0,
            touchDelta: 0,
        };
    },

    methods: {
        bootTouchable() {
            this.touchEvents.forEach(event => {
                this.$el.addEventListener(
                    event.name, event.handler, this.useCaptureByEvent[event.name],
                );
            });
        },

        handleTouchStart(event) {
            const { changedTouches } = event;

            this.initialClientX = changedTouches[0].clientX;
            this.touchStartLength = event.touches.length;

            this.$emit('touchstart', event);
        },

        handleTouchEnd(event) {
            const { changedTouches } = event;

            this.finalClientX = changedTouches[0].clientX;
            this.touchDelta = this.initialClientX - this.finalClientX;

            this.$emit('touchend', event);
        },

        handleTouchCancel(event) {
            this.$emit('touchcancel', event);
        },

        handleTouchLeave(event) {
            this.$emit('touchleave', event);
        },

        handleTouchMove(event) {
            this.$emit('touchmove', event);
        },
    },
};
