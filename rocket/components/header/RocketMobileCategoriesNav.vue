<template>
    <div
        class="h-anchor-container"
    >
        <rocket-button
            v-if="mainCategoryData.length"
            v-bind="{ label: mainCategory.name, customClasses: 'main-link' }"
            @click="handleDrawer"
        />

        <rocket-anchor
            v-else
            v-bind="{ label: mainCategory.name, href: mainCategory.url_path }"
        />

        <transition name="nav-drawer-left">
            <div
                v-if="isVisible"
                class="nav-drawer-content"
                @click.stop
            >
                <rocket-button
                    label="Voltar"
                    custom-classes="--close-btn"
                    @click="handleClick"
                />

                <div class="selected-category-name">
                    {{ mainCategory.name }}
                </div>

                <hr class="spacer">

                <rocket-anchor
                    v-bind="{ label: 'Todos os produtos',
                              customClasses:'--all-products',
                              href: mainCategory.url_path }"
                />

                <div
                    v-for="category in mainCategoryData"
                    :key="category.id"
                    class="h-category-child"
                >
                    <rocket-anchor v-bind="{ label: category.name, href: category.url_path }" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'RocketMobileCategoriesNav',

    inject: ['mainCategory'],

    data() {
        return {
            isVisible: false,
        };
    },

    computed: {
        mainCategoryData() {
            return this.mainCategory?.children?.data || [];
        }
    },

    methods: {
        handleClick() {
            this.isVisible = false;
            document.getElementsByClassName('categories-menu h-navigation')[0].classList.remove('mh100');
            document.getElementsByClassName('categories-menu h-navigation')[0].classList.remove('mh100');
        },

        handleDrawer() {
            this.isVisible = true;
            document.getElementsByClassName('categories-menu h-navigation')[0].classList.add('mh100');
            document.getElementsByClassName('categories-menu h-navigation')[0].classList.add('mh100');
        }
    },
};
</script>
