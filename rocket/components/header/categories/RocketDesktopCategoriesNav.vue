<template>
    <div
        class="h-anchor-container"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <RocketAnchor
            custom-ref="menuitem"
            :href="mainCategory.url_path"
            :label="mainCategory.name"
            :custom-classes="`main-category`"
        />
        <Transition
            v-if="hasDropdown"
            name="fade"
        >
            <ul
                v-show="isVisible"
                ref="submenu"
                class="subcategories-list"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
            >
                <li
                    v-for="(subcategoryChunk, chunkIndex) in chunkedSubcategories"
                    :key="chunkIndex"
                    class="subcategory-container"
                >
                    <a
                        v-for="(subcategory, subcategoryIndex) in subcategoryChunk"
                        :key="subcategory.id"
                        :class="`subcategory ${subcategoryIndex === 0 && chunkIndex === 0? '--all-products': ''}`"
                        :href="subcategory.url_path"
                    >
                        {{ subcategory.name }}
                    </a>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script>
import _ from '~/lodash';

export default {
    name: 'RocketDesktopCategoriesNav',

    inject: ['mainCategory', 'categoriesDisplay'],

    data() {
        return {
            isVisible: false,
        };
    },

    computed: {
        subcategories() {
            return this.mainCategory.children?.data || [];
        },

        filteredSubcategories() {
            return this.subcategories.slice(0, 27);
        },

        chunkedSubcategories() {
            return _.chunk([
                ...[
                    {
                        ..._.omit(this.mainCategory, ['children']),
                        name: 'Todos os produtos',
                    },
                ],
                ...this.filteredSubcategories,
            ], 7);
        },

        hasDropdown() {
            return !!this.subcategories.length && this.categoriesDisplay === 'both';
        },
    },

    methods: {
        getCalculatedSubmenuLeftOffset({
            drawPosition, clientX, viewportWidth,
        }) {
            const totalMenuWidth = (this.chunkedSubcategories.length * 200
                        + 80 + ((this.chunkedSubcategories.length - 1) * 40));
            return {
                rightDraw: () => {
                    const itemOverflowsWidth = (totalMenuWidth + clientX) - viewportWidth;
                    const distToLastColumn = 40 + ((this.chunkedSubcategories.length - 1) * 200);

                    const distIfOverflows = clientX > (itemOverflowsWidth + distToLastColumn)
                        ? clientX - (itemOverflowsWidth + distToLastColumn)
                        : clientX - (itemOverflowsWidth);

                    return itemOverflowsWidth > 0 ? distIfOverflows : (clientX - (totalMenuWidth - 140));
                },
                leftDraw: () => {
                    const itemOverflowsWidth = (totalMenuWidth + clientX) - viewportWidth;

                    return itemOverflowsWidth > 0 ? clientX - (itemOverflowsWidth) : (clientX * 0.97);
                },
            }[drawPosition]();
        },

        getDrawPosition({ viewportWidth, clientX, itemWidth }) {
            return ((clientX + (itemWidth)) > (viewportWidth / 2)) ? 'rightDraw' : 'leftDraw';
        },

        handleMouseEnter() {
            if (this.hasDropdown) {
                const menuItemRect = this.$refs.menuitem.getBoundingClientRect();

                const drawPosition = this.getDrawPosition({
                    viewportWidth: window.innerWidth,
                    clientX: menuItemRect.x,
                    itemWidth: menuItemRect.width,
                });

                const leftOffset = this.getCalculatedSubmenuLeftOffset({
                    drawPosition,
                    clientX: menuItemRect.x,
                    itemWidth: menuItemRect.width,
                    viewportWidth: window.innerWidth,
                });

                this.$refs.submenu.style.left = `${leftOffset}px`;

                this.$refs.submenu.style.setProperty(
                    '--nav-left-pos-x',
                    `${menuItemRect.x - leftOffset + (menuItemRect.width / 2) - 10}px`,
                );
            }

            this.isVisible = true;
        },

        handleMouseLeave() {
            this.isVisible = false;
        },
    },
};
</script>
