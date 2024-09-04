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
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import api from '@/modules/axios/api';
import productMixin from '@/mixins/product';

export default {
    name: 'Flags',

    mixins: [
        productMixin,
    ],

    props: {
        defaultFlags: {
            type: Array,
            default: () => ([]),
        },
    },

    data: () => ({
        flags: [],
        loading: false,
    }),

    mounted() {
        if (!_isEmpty(this.defaultFlags)) {
            this.flags = this.defaultFlags;

            return;
        }

        const loadedFlags = _get(this.validProduct, 'flags.data');

        if (!_isNil(loadedFlags)) {
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
                if (!this.validProduct) return;

                this.loading = true;

                const { data } = await api.get(`catalog/products/${this.validProduct.id}/flags`);

                this.flags = data.data.filter(flag => flag.active);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
