<template>
    <div
        class="modal-zoom-mobile"
        :class="{ 'is-active': show }"
    >
        <div class="-header flex -between -vcenter">
            <div class="-message flex -vcenter">
                <i class="icon icon-pinch-zoom" />
                Arraste com os dedos
            </div>

            <div
                class="-close flex -vcenter -hcenter"
                @click="handleModal"
            >
                <i class="icon icon-close-modal-white" />
            </div>
        </div>

        <images-slider
            v-if="show"
            ref="imagesSlider"
            :images="review.photos.data"
        />

        <div class="control-button" />
    </div>
</template>

<script>
import times from 'lodash/times';
import _delay from 'lodash/delay';
import ImagesSlider from '@/components/generic/ImagesSlider';

export default {
    name: 'ModalReviewDetailsMobile',

    components: {
        ImagesSlider,
    },

    props: {
        review: {
            type: Object,
            required: true,
        },

        showDates: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            show: false,
            ready: false,
        };
    },

    methods: {
        times,

        handleModal() {
            this.show = !this.show;

            if (this.show) {
                document.getElementById('app').style.overflow = 'hidden';
                document.getElementsByTagName('body')[0].style = 'overflow-y: hidden';
            } else {
                document.getElementById('app').style.overflow = '';
                _delay(() => {
                    document.getElementsByTagName('body')[0].style = 'overflow-y: auto';
                }, 350, 'later');

                this.$emit('close');
            }
        },

        handleClose() {
            this.ready = !this.ready;
        },
    },
};
</script>

<style scoped>
.hide {
    visibility: hidden;
}
</style>
