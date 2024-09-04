<template>
    <div class="holder-buy-button">
        <div
            class="buy-button"
            @click.stop.prevent="handleClick"
        >
            <slot name="buy-button" />
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
