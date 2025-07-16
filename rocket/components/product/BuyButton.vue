<template>
    <div
        class="holder-buy-button"
        :class="containerClasses"
    >
        <div
            :class="buyButtonClass"
            @click.stop.prevent="handleClick"
        >
            <slot />
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

        hasButtonStyle: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        containerClasses() {
            return {
                'button-style': this.hasButtonStyle,
            };
        },

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

<style lang="scss" scoped>
.button-style {
    .buy-button {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: var(--grids-products-images-margin);
        right: var(--grids-products-images-margin);
        width: 46px;
        height: 46px;
        background-color: var(--add-to-cart-button-color);
        border: 1px solid var(--black-lightest);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
        border-radius: var(--theme-border-radius);
        cursor: pointer;
    }

    .buy-button-text-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: var(--add-to-cart-icon-text-button-width);
        padding: 15px 16px;
        background-color: var(--add-to-cart-icon-text-button-color);
        border: 1px solid var(--add-to-cart-icon-text-button-border-color);
        border-radius: var(--theme-border-radius);
        cursor: pointer;
        transition: opacity 0.3s;

        @media only screen and (min-width: 700px) {
            &:hover {
                opacity: 0.8;
            }
        }

        .text {
            font-size: 16px;
            line-height: 15px;
            font-weight: 500;
            letter-spacing: 0.04em;
            color: var(--add-to-cart-icon-text-button-text-color);
        }

        .icon {
            flex-shrink: 0;
            margin: 0;
        }
    }
}
</style>
