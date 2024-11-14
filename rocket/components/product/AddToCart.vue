<template>
    <div>
        <ModalCartConfirmation
            ref="modalCartConfirmation"
            :error="error"
            :quantity-added="quantity"
        />

        <ModalConfirmAddToCart
            ref="ModalConfirmAddToCart"
            :product="productData"
            :selected-price="selectedPrice"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from '~/vuex';
import eventBus from '@/modules/eventBus';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';

export default {
    name: 'AddToCart',

    props: {
        selectedPrice: {
            type: String,
            default: 'promotional',
        },
    },

    data() {
        return {
            error: undefined,
            quantity: 1,
            productData: {},
        };
    },

    computed: {
        ...mapGetters('cart', ['cartType']),

        ...mapGetters('preview', ['isPreview']),

        ...mapActions('cart', ['addProductsToCart']),
    },

    mounted() {
        eventBus.$on('addToCartClicked', this.handleAddToCartClick);

        this.$store.subscribe(({ type, payload }) => {
            if (type !== 'cart/EVENT_ADDED_TO_CART') {
                return;
            }

            if (this.isPreview && this.cartType !== 'side_cart') {
                this.$refs.modalCartConfirmation.showModal();
                return;
            }

            this.addedToCart(payload);
        });

        if (!this.isPreview) {
            return;
        }

        window.addEventListener(
            'message',
            event => {
                if (event.data?.show_modal_after_purchase?.value && event.target?.themeConfig?.page === 'product') {
                    if (this.cartType !== 'side_cart') {
                        this.$refs.modalCartConfirmation.showModal();
                    }
                }
            },
            false,
        );
    },

    methods: {
        ...mapActions('cart', [
            'redirectToCart',
        ]),

        async handleAddToCartClick($event) {
            this.productData = {};
            this.loadProductSkus($event.slug);
            this.$refs.ModalConfirmAddToCart.showModal();
        },

        addedToCart({
            showModal, error = undefined, quantityAdded = 1,
        }) {
            return {
                side_cart: () => {
                    if (error) {
                        this.error = error;
                        this.quantity = quantityAdded;

                        return this.$refs.modalCartConfirmation.showModal();
                    }

                    return null;
                },
                suspended: () => {
                    if (error || showModal) {
                        this.error = error;
                        this.quantity = quantityAdded;

                        return this.$refs.modalCartConfirmation.showModal();
                    }

                    return this.redirectToCart();
                },
            }[this.cartType]();
        },

        async loadProductSkus(slug) {
            try {
                const url = `catalog/products/${slug}`;

                const { data } = await api.get(url);

                this.productData = data.data;
            } catch (error) {
                if (error.response.status >= 400 && this.isPreview) {
                    await this.loadPlaceholders();
                }
            }
        },

        async loadPlaceholders() {
            const { data } = await rocket.get('/placeholders/productDetail');

            this.productData = data;
        },
    },
};
</script>

<style>

</style>
