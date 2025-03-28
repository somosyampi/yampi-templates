<template>
    <component
        :is="component"
    />
</template>

<script>
import mobileMixin from '@/mixins/mobile';
import RocketMobileCategoriesNav from '@/components/header/categories/RocketMobileCategoriesNav.vue';
import RocketDesktopCategoriesNav from '@/components/header/categories/RocketDesktopCategoriesNav.vue';

export default {
    name: 'RocketCategoriesNav',

    mixins: [
        mobileMixin,
    ],

    provide() {
        return {
            mainCategory: this.notFeaturedCategories,
            categoriesDisplay: this.categoriesDisplay,
            isVisible: this.isVisible,
        };
    },

    props: {
        mainCategory: {
            type: Object,
            required: true,
        },

        categoriesDisplay: {
            type: String,
            required: true,
        },
    },

    computed: {
        component() {
            return {
                [true]: RocketMobileCategoriesNav,
                [false]: RocketDesktopCategoriesNav,
            }[this.isMobile];
        },

        notFeaturedCategories() {
            if (!this.mainCategory.children) {
                return this.mainCategory;
            }

            const notFeatured = this.mainCategory.children.data.filter(child => !child.featured);

            return {
                ...this.mainCategory,
                children: {
                    data: notFeatured,
                },
            };
        },
    },
};
</script>
