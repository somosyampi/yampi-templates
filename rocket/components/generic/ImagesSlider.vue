<template>
    <div class="touchable">
        <Splide
            ref="splideRef"
            :options="{
                perPage: 1,
                rewind: false,
                arrows: false,
                pagination: false,
                drag: false,
                start: 0
            }"
            :slides="images"
            class="custom-splide"
            @splide:moved="handleSplideMoved"
            @splide:mounted="handleSplideMounted"
        >
            <SplideSlide
                v-for="(image) in images"
                :key="image.url"
                class="review-details-photo-container"
            >
                <PinchZoom
                    ref="imagePinch"
                    :auto-zoom-out="false"
                    :overflow="'visible'"
                    :limit-pan="true"
                    :min-scale="1"
                    limit-zoom="50"
                >
                    <img
                        :src="image.url"
                        alt="zoom"
                    >
                </PinchZoom>
            </SplideSlide>
        </Splide>

        <div class="modal-review-details-pagination">
            (<span class="bold">{{ currentIndex+1 }}</span>/{{ images.length }})
        </div>
    </div>
</template>

<script>
import touchableMixin from '@/mixins/touchable';

export default {
    name: 'Touchable',

    mixins: [touchableMixin],

    props: {
        images: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            active: 0,
            currentIndex: 0,
        };
    },

    watch: {
        touchDelta(newVal) {
            if (this.touchStartLength > 1) { return; }

            const currentRef = this.$refs.imagePinch[this.currentIndex];

            if (currentRef.isZoomedIn || currentRef.ivyPinch.scale > 1) {
                currentRef.toggleZoom();
            }

            if (newVal >= 50) {
                this.active = this.currentIndex + 1;
                this.$refs.splideRef.go(this.active);
            }

            if (newVal <= -50) {
                this.active = this.currentIndex - 1;
                this.$refs.splideRef.go(this.active);
            }
        },
    },

    mounted() {
        this.bootTouchable();
    },

    methods: {
        handleSplideMoved(splideState) {
            this.currentIndex = splideState.index;
        },

        handleSplideMounted(splideState) {
            this.active = splideState.index + 1;
        },
    },
};
</script>

<style scoped>
.touchable {
    height: 100%;
    width: 100%;
}
</style>
