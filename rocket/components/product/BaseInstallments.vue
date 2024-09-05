<script>
import _ from '~lodash';
import api from '@/modules/axios/api';
import productMixin from '@/mixins/product';
import merchantsMixin from '@/mixins/merchant';

export default {
    name: 'BaseProduct',

    mixins: [productMixin, merchantsMixin],

    data: () => ({
        installments: {},
        loading: false,
    }),

    methods: {
        setLocalStorageCache(value, payload, selectedCardAlias) {
            let storage = window.localStorage;
            let ttl = window.Yampi.cache.js || 10; //minutes

            if (!storage) {
                return null;
            }

            payload.expire_at = new Date().getTime() + ttl * 60000;

            storage.setItem(
                this.getLocalStorageCacheKey(value, selectedCardAlias),
                JSON.stringify(payload),
            );
        },

        getLocalStorageCache(value, selectedCardAlias) {
            let storage = window.localStorage;

            if (!storage) {
                return null;
            }

            let cached = JSON.parse(
                storage.getItem(this.getLocalStorageCacheKey(value, selectedCardAlias))
            ) || {};

            if ((cached.expire_at || 0) < new Date().getTime()) {
                return null;
            }

            return cached;
        },

        getLocalStorageCacheKey(value, selectedCardAlias) {
            const cardBrand = selectedCardAlias || this.defaultCard?.alias;

            if (!cardBrand) {
                return null;
            }

            return `installments_${cardBrand}_${value}`;
        },

        async handleInstallments(selectedCardAlias) {
            const cardAlias = selectedCardAlias || this.defaultCard?.alias;

            if (!cardAlias) {
                return {};
            }

            const sku = this.isSku && _.get(this.validSku, 'id')
                ? this.validSku
                : undefined;

            const productPrice = _.get(sku || this.validProduct,
                'prices.data.price'
            );

            const productId = _.get(this.validProduct, 'id');

            const cached = this.getLocalStorageCache(productPrice, selectedCardAlias);

            if (cached) {
                this.loading = false;
                return cached;
            }

            if (!productPrice || !productId) {
                this.loading = false;
                return {};
            }

            this.loading = true;

            const url = this.$applyQueriesToUrl(
                `catalog/products/${productId}/installments`,
                {
                    amount: productPrice,
                    brand: cardAlias,
                }
            );

            const { data } = await api.get(url);

            this.setLocalStorageCache(
                productPrice,
                data.data,
                selectedCardAlias
            );

            return data.data;
        },
    },
};
</script>
