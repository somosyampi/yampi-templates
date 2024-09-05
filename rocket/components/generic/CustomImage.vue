<template>
    <img
        v-lazyload="lazyload"
        :src="
            lazyload
                ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                : imgSrc
        "
        :data-src="lazyload ? imgSrc : null"
        v-bind="$attrs"
        width="auto"
        height="auto"
        :onerror="handleError()"
        @load="handleLoad"
    >
</template>

<script>
import { mapMutations } from '~vuex';
import { uuidv4, getImageMeta } from '@/mixins/helpers';

export default {
    name: 'CustomImage',

    props: {
        src: {
            type: String,
            required: true,
        },

        lazyload: {
            type: Boolean,
            default: true,
        },

        thumbor: {
            type: [Object, undefined],
            default: undefined,
        },

        thumborEnabled: {
            type: Boolean,
            default: true,
        },

        listInStore: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            width: 0,
            height: 0,
            uid: uuidv4(),
        };
    },

    computed: {
        imgSrc() {
            const prefix = 'https://s3.sa-east-1.amazonaws.com/king';
            let img = this.src;
            if (this.src.startsWith(prefix)) {
                img = img.replace(prefix, 'https://king');
            }
            if (this.thumborEnabled) {
                return this.$thumborize(img, this.thumbor);
            }

            return this.src;
        },
    },
    mounted() {
        if (this.listInStore) {
            const vm = this;

            getImageMeta(this.imgSrc, (x, y) => {
                vm.PUSH({
                    uid: vm.uid,
                    element: vm.$el,
                    lazyload: vm.lazyload,
                    y,
                    x,
                });
            });
        }
    },

    methods: {
        ...mapMutations('images', ['PUSH', 'CLEAR']),

        handleError() {
            this.$emit('onError');
        },

        handleLoad() {
            if (this.listInStore) {
                this.CLEAR(
                    'images',
                );
            }
        },
    },

};
</script>
