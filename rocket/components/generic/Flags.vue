<template>
    <div
        v-if="flags.length"
        class="holder-flags"
        :class="{'not-mosaic': !$parent.isMosaic}"
    >
        <span
            v-for="flag in flags"
            :key="flag.id"
            class="flag"
            :style="getStyle(flag)"
            v-text="flag.name"
        />
    </div>
</template>

<script>
import _ from '~/lodash';
import api from '@/modules/axios/api';
import productMixin from '@/mixins/product';
import cacheMixin from '@/mixins/cache';

export default {
    name: 'Flags',

    mixins: [
        productMixin,
        cacheMixin,
    ],

    props: {
        defaultFlags: {
            type: Array,
            default: () => ([]),
        },

        productId: {
            type: [Number, String],
            default: null,
        },
    },

    data: () => ({
        flags: [],
        loading: false,
    }),

    computed: {
        shouldUseNewSearchStrategy() {
            const { new_search } = this.$store.getters['merchant/storeModules'];
            return new_search;
        },
    },

    mounted() {
        if (!_.isEmpty(this.defaultFlags)) {
            this.flags = this.defaultFlags;

            return;
        }

        const loadedFlags = _.get(this.validProduct, 'flags.data');

        if (!_.isNil(loadedFlags)) {
            this.flags = loadedFlags;
            return;
        }

        this.loadFlags();
    },

    methods: {
        getStyle(flag) {
            return {
                '--flag-color': flag.text_color,
                '--flag-bg-color': flag.background_color,
            };
        },

        async loadFlags() {
            try {
                /*
                 * Força a buscar flags quando o resultado vier da busca de produtos
                 * porque o search traz flags deletadas.
                 */
                if (!this.validProduct && !this.shouldUseNewSearchStrategy) return;

                this.loading = true;

                const productId = this.productId || this.validProduct.id;

                const cached = this.getLocalStorageCache({ itemId: productId, itemAlias: 'flags' });

                if (cached) {
                    this.flags = cached;

                    this.loading = false;

                    return;
                }

                const { data } = await api.get(`catalog/products/${productId}/flags`);

                this.flags = data.data;

                this.setLocalStorageCache({ itemId: productId, data: this.flags, itemAlias: 'flags' });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
