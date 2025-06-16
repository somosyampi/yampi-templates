<template>
    <div
        :class="`rkt-${section}-shopping-page-redirect`"
        @mouseenter="handleTransition(true)"
        @mouseleave="handleTransition(false)"
        @click="handleMouseClick"
    >
        <AtomSVG
            width="16"
            height="18"
            :fill="headerIconColor ? headerIconColor : cartIconColor"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5714 12.2C13.9068 12.2 15.8 14.0932 15.8 16.4286C15.8 17.186 15.186 17.8 14.4286 17.8L1.57144 17.8C0.814021 17.8 0.200012 17.186 0.200012 16.4286C0.200012 14.0932 2.09321 12.2 4.42858 12.2L11.5714 12.2ZM14.1902 16.2C14.0744 14.8553 12.9462 13.8 11.5714 13.8H4.42858C3.05387 13.8 1.92564 14.8553 1.80981 16.2L14.1902 16.2Z"
                :fill="headerIconColor ? headerIconColor : cartIconColor"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.00001 8.4C9.87778 8.4 11.4 6.87777 11.4 5C11.4 3.12223 9.87778 1.6 8.00001 1.6C6.12224 1.6 4.60001 3.12223 4.60001 5C4.60001 6.87777 6.12224 8.4 8.00001 8.4ZM8.00001 10C10.7614 10 13 7.76142 13 5C13 2.23858 10.7614 0 8.00001 0C5.23859 0 3.00001 2.23858 3.00001 5C3.00001 7.76142 5.23859 10 8.00001 10Z"
                :fill="headerIconColor ? headerIconColor : cartIconColor"
            />
        </AtomSVG>
        <Transition name="dropdown">
            <div
                v-if="visible"
                class="rkt-link-container"
            >
                <ShoppingPageRow :redirect-to="shopperUrl" />
            </div>
        </Transition>
    </div>
</template>

<script>
import _ from '~/lodash';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'HShoppingPageRedirect',

    mixins: [
        mobileMixin,
    ],

    props: {
        section: {
            type: String,
            required: true,
        },

        headerIconColor: {
            type: String,
            default: '#333333',
        },

        cartIconColor: {
            type: String,
            default: '#333333',
        },
    },

    data() {
        return {
            visible: false,
            shopperUrl: this.$shopperUrl(
                _.get(this.$store.getters, 'merchant/merchant.checkout.shopper_url'),
                true,
            ),
        };
    },

    methods: {
        handleTransition(status) {
            if (this.isMobile) {
                return;
            }

            if (!status) {
                this.visible = !this.visible;
            }

            this.visible = status;
        },

        handleMouseClick() {
            window.location.assign(this.shopperUrl);
        },
    },
};
</script>
