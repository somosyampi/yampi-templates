<template>
    <img
        v-lazyload="lazyload"
        :src="
            lazyload
                ? placeholderImg
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
import { mapMutations } from '~/vuex';
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

        placeholderWidth: {
            type: Number,
            default: 0,
        },

        placeholderHeight: {
            type: Number,
            default: 0,
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

        placeholderImg() {
            if (this.placeholderWidth === 0 || this.placeholderHeight === 0) {
                return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }

            return `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20${this.placeholderWidth}%20${this.placeholderHeight}%22%3E%3C%2Fsvg%3E`;
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
