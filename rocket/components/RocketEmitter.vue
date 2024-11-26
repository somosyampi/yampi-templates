<template>
    <div :key="key">
        <div
            v-if="isPreview && isIframe"
            ref="rocketEmitterRef"
            class="rocket-emitter"
            :class="{
                '--hide-stroke': !showStroke,
                '--active': activeSection === `${emits}-${order}` || activeSection === `${emits}`,
            }"
            @click="handleClick"
        >
            <div
                v-if="showStroke"
                class="emitter-title"
            >
                <component :is="getComponent(emits)" />
                {{ label }}
            </div>
            <slot />
        </div>
        <div v-else>
            <slot />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from '~/vuex';

export default {
    name: 'RocketEmitter',

    props: {
        emits: {
            type: String,
            required: true,
        },

        label: {
            type: [String, null],
            default: null,
        },

        showStroke: {
            type: Boolean,
            default: true,
        },

        order: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            actived: false,
            key: 0,
        };
    },

    computed: {
        ...mapGetters('preview', ['isPreview', 'isIframe', 'activeSection']),
    },

    watch: {
        activeSection(newVal) {
            if (!this.isIframe) return;

            if (newVal === this.emits) {
                this.$emit('openCategory');
            }
        },

        isPreview() {
            this.key += 1;
        }
    },

    mounted() {
        if (!this.isIframe) {
            return;
        }

        this.$nextTick(this.handleTagPosition);

        window.addEventListener('scroll', this.handleTagPosition);
        window.addEventListener('load', this.handleTagPosition);
    },

    destroyed() {
        window.removeEventListener('scroll', () => {});
        window.removeEventListener('load', () => {});
    },

    methods: {
        ...mapActions('preview', ['setActiveSection']),

        handleTagPosition() {
            if (!this.$refs.rocketEmitterRef) {
                return;
            }

            const emitterPosition = this.$refs.rocketEmitterRef.getBoundingClientRect();

            if (emitterPosition.top > 24) {
                this.$refs.rocketEmitterRef.classList.add('--on-top');
                return;
            }

            this.$refs.rocketEmitterRef.classList.remove('--on-top');
        },

        handleClick(e) {
            e.preventDefault();
            this.handleTagPosition();
            this.setActiveSection(`${this.emits}-${this.order}`);
            window.parent.postMessage(
                {
                    selectMenu: this.emits,
                    order: this.order,
                    from: 'rocket-emitter',
                },
                '*',
            );
            e.stopPropagation();
        },

        getComponent(component) {
            return this.getSectionIcon(component);
        },

        getSectionIcon(componentName) {
            const componentList = {
                header: 'icon-header',
                footer: 'icon-footer',
                main_banner: 'icon-image-slide',
                collection: 'icon-grid',
                grids: 'icon-grid',
                banner_1: 'icon-image',
                banner_2: 'icon-image',
                banner_3: 'icon-image',
                highlights: 'icon-highlights',
                video_home: 'icon-video',
                categories_highlight: 'icon-star',
                top_ratings: 'icon-comments',
                text_button: 'icon-cta',
                main_category_content: 'icon-grid',
                main_product_content: 'icon-shirt',
                buy_together: 'icon-bag',
                video: 'icon-video',
                product_specifications: 'icon-page',
                product_reviews: 'icon-question',
                product_similars: 'icon-grid',
                main_pages_content: 'icon-page',
                main_promotion_content: 'icon-marketing',
                cart: 'icon-cart',
            };

            return componentList[componentName];
        },
    },
};
</script>
