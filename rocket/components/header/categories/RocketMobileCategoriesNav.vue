<template>
    <div
        class="h-anchor-container"
    >
        <RocketButton
            v-if="mainCategoryData.length"
            v-bind="{ label: mainCategory.name, customClasses: 'main-link' }"
            @click="handleDrawer"
        />

        <RocketAnchor
            v-else
            v-bind="{ label: mainCategory.name, href: mainCategory.url_path }"
        />

        <Transition name="nav-drawer-left">
            <div
                v-if="isVisible"
                class="nav-drawer-content"
                @click.stop
            >
                <RocketButton
                    label="Voltar"
                    custom-classes="--close-btn"
                    @click="handleClick"
                />

                <div class="selected-category-name">
                    {{ mainCategory.name }}
                </div>

                <hr class="spacer">

                <RocketAnchor
                    v-bind="{ label: 'Todos os produtos',
                              customClasses:'--all-products',
                              href: mainCategory.url_path }"
                />

                <div
                    v-for="category in mainCategoryData"
                    :key="category.id"
                    class="h-category-child"
                >
                    <RocketAnchor v-bind="{ label: category.name, href: category.url_path }" />
                </div>
            </div>
        </Transition>
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
        },
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
        },
    },
};
</script>
