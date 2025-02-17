<template>
    <div class="holder-buy-button">
        <div
            :class="buyButtonClass"
            @click.stop.prevent="handleClick"
        >
            <slot
                name="buy-button"
            />

            <slot
                name="buy-button-text-icon"
            />
        </div>
    </div>
</template>

<script>
import productMixin from '@/mixins/product';
import eventBus from '@/modules/eventBus';
import trackingByApi from '@/mixins/tracking/api';

export default {
    name: 'BuyButton',

    mixins: [
        productMixin,
        trackingByApi,
    ],

    props: {
        isTextAndIconButton: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        buyButtonClass() {
            return this.isTextAndIconButton
                ? 'buy-button-text-icon'
                : 'buy-button';
        },
    },

    methods: {
        async handleClick() {
            eventBus.$emit('addToCartClicked', this.validProduct);

            this.handleTrackApi('quick-buy-button-clicked');
        },
    },
};
</script>

<style>

</style>
