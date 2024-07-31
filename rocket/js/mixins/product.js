import _get from 'lodash/get';
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        productId: {
            type: Number,
            default: 0,
        },

        product: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        ...mapGetters('product', {
            productStore: 'product',
            products: 'products',
            selectedSku: 'selectedSku',
        }),

        validProduct () {
            if (this.product.id) {
                return this.product;
            }

            if (this.productStore.id) {
                return this.productStore;
            }

            if (this.productId) {
                const product = this.products.find(product => product.id === this.productId);

                return product || {
                    id: this.productId,
                };
            }
        },

        validSku() {
            return this.selectedSku || this.firstValidSku || this.firstSku;
        },

        firstValidSku() {
            return _get(this.validProduct, 'skus.data', []).find(sku => !sku.blocked_sale);
        },

        firstSku() {
            return _get(this.validProduct, 'skus.data', []);
        },
    },

    methods: {
        ...mapActions('product', [
            'setSelectedSku'
        ]),
    },
};
