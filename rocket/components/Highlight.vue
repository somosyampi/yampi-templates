<!-- eslint-disable vue/no-v-html -->
<template>
    <div class="container">
        <div class="highlight-holder">
            <component
                :is="tagOrDiv('splide')"
                v-if="ready"
                :options="showCaroussel ? getCarousselOptions() : null"
            >
                <component
                    :is="tagOrDiv('splide-slide')"
                    v-for="(item, index) in icons"
                    :key="index"
                    class="highlight-container"
                >
                    <div
                        v-if="item.text !== ''"
                        class="highlight-container-flexible"
                    >
                        <svg
                            :key="item.icon"
                            :data-src="
                                `${baseIconUrl}/${item.icon}`
                            "
                            :fill="iconColor"
                            width="46"
                            height="46"
                            class="highlight-icon"
                        />

                        <span
                            class="highlight-text"
                            :style="`color: ${textColor}`"
                            v-html="item.text"
                        />
                    </div>
                </component>
            </component>
        </div>
    </div>
</template>

<script>
import '~external-svg-loader';

// Mixins
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'Highlight',

    mixins: [
        mobileMixin,
    ],

    props: {
        icons: {
            type: Array,
            required: true,
        },

        iconColor: {
            type: String,
            default: '#705BC2',
        },

        textColor: {
            type: String,
            default: '#222222',
        },
    },

    data() {
        return {
            ready: true,
            carousselOptions: {
                perPage: 1,
                rewind: false,
                arrows: true,
                pagination: false,
                drag: true,
                start: 0,
            },
            baseIconUrl: `${window.Yampi.icon_url}/rocket-icons`,
        };
    },

    computed: {
        showCaroussel() {
            return this.width < 901;
        },
    },

    async mounted() {
        this.ready = false;
        await this.$nextTick(() => {
            this.ready = true;
        });
    },

    methods: {
        tagOrDiv(tag) {
            return this.showCaroussel ? tag : 'div';
        },

        getCarousselOptions() {
            if (this.width < 901 && this.width > 768) {
                this.carousselOptions.perPage = 3;
            }

            if (this.width < 769 && this.width > 595) {
                this.carousselOptions.perPage = 2;
            }

            if (this.width <= this.isMobile) {
                this.carousselOptions.perPage = 1;
            }

            return this.carousselOptions;
        },
    },
};
</script>
