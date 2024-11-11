<template>
    <rocket-emitter
        emits="cart"
        label="Carrinho de compras"
        class="side-cart-emitter"
        @openCategory="handleDrawer"
    >
        <transition
            name="drawer-animation"
            @after-enter="afterEnter"
            @before-enter="beforeEnter"
            @after-leave="afterLeave"
            @before-leave="beforeLeave"
        >
            <div
                v-if="active"
                class="navigation-drawer-background"
                @click.stop="handleDrawer"
            >
                <div
                    class="navigation-drawer-container"
                    @click.stop
                >
                    <div
                        class="navigation-drawer"
                    >
                        <slot />
                    </div>
                </div>
            </div>
        </transition>
    </rocket-emitter>
</template>

<script>
import { mapGetters } from '~/vuex';

export default {
    name: 'NavigationDrawer',

    data() {
        return {
            active: false,
            scrollY: 0,
        };
    },

    computed: {
        ...mapGetters('preview', ['isPreview', 'activeSection']),
    },

    mounted() {
        this.$store.subscribe(({ type, payload }) => {
            if (type !== 'cart/EVENT_ADDED_TO_CART' || payload?.error) {
                return;
            }

            this.handleDrawer();
        });

        window.addEventListener('touchstart', () => {
            this.syncHeight();
        });

        window.addEventListener('resize', () => {
            this.syncHeight();
        });
    },

    destroyed() {
        window.removeEventListener('touchstart', () => {});
        window.removeEventListener('resize', () => {});
    },

    methods: {
        handleDrawer() {
            this.active = !this.active;
        },

        syncHeight() {
            document.documentElement.style.setProperty(
                '--window-inner-height',
                `${window.innerHeight}px`,
            );

            document.documentElement.style.setProperty(
                '--margin-to-scroll',
                `${this.scrollY}px`,
            );
        },

        beforeEnter() {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            this.scrollY = window.scrollY;
            this.syncHeight();
            document.documentElement.classList.add('block-scroll');
            document.getElementsByTagName('body')[0].classList.add('drawer-active');
            document.getElementsByTagName('body')[0].classList.add('block-scroll');
            this.$emit('beforeEnter');
        },

        afterEnter() {
            this.$emit('afterEnter');
        },

        beforeLeave() {
            document.getElementsByTagName('body')[0].classList.remove('drawer-active');
            this.$emit('beforeLeave');
        },

        afterLeave() {
            document.body.style.marginRight = '0px';
            document.getElementsByTagName('body')[0].classList.remove('block-scroll');
            document.documentElement.classList.remove('block-scroll');
            window.scrollTo(0, this.scrollY);
            this.$emit('afterLeave');
        },
    },
};
</script>
