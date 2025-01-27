<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'CategorySubcategory',

    mixins: [
        mobileMixin,
    ],

    mounted() {
        this.loadDomVariables();
        this.handleClasses();
        this.handleHover();
        this.handleMobile();
        this.enableMenu();
        this.handleHeight();
    },

    data() {
        return {
            menu: null,
            categories: null,
            subCategories: null,
            hasSubDropdown: null,
            holderCategories: null,
        }
    },

    methods: {
        loadDomVariables() {
            this.categories = document.querySelectorAll('.item-category');
            this.menu = document.querySelector('.category-subcategory-menu');
            this.holderCategories = document.querySelector('.holder-categories');
            this.subCategories = document.querySelectorAll('.holder-sub-categories');
        },

        handleHeight() {
            let subcategoriesHolderHeight = 0,
                categoriesHolderHeight = this.menu.clientHeight;

            for (let i = 0; i < this.subCategories.length; i++) {
                subcategoriesHolderHeight = Math.max(
                    subcategoriesHolderHeight, 
                    this.subCategories[i].offsetHeight
                );
            }

            if (subcategoriesHolderHeight > categoriesHolderHeight) {
                this.menu.style.height = subcategoriesHolderHeight + 'px';
            }
        },

        handleMobile() {
            let hasSubDropdown = document.querySelectorAll('.has-subdropdown'),
                closeDropdown = document.querySelectorAll('.close-dropdown'),
                addActiveClass = (target) => {
                    if (this.isMobile && target.classList.contains('dropdown-holder')) {
                        if (target.classList.contains('item-category')) {
                            target.closest('.category-dropdown-holder').classList.add('active-subdropdown');
                        }

                        target.classList.add('active-dropdown');
                    }
                };

            document.querySelector('.category-dropdown-holder')
                .addEventListener('click', (e) => {
                    addActiveClass(e.target);
                });

            for (let i = 0; i < hasSubDropdown.length; i++) {
                hasSubDropdown[i].addEventListener('click', (e) => {
                    addActiveClass(e.target);
                });
            }

            for (let i = 0; i < closeDropdown.length; i++) {
                closeDropdown[i].addEventListener('click', (e) => {
                    let activeDropdown = e.target.closest('.active-dropdown'),
                        activeSubDropdown = e.target.closest('.active-subdropdown');

                    if (activeDropdown) {
                       activeDropdown.classList.remove('active-dropdown');
                    }

                    if (activeSubDropdown) {
                        activeSubDropdown.classList.remove('active-subdropdown');
                    }
                });
            }
        },

        handleHover() {
            let activeClass = 'is-active',
                canRemoveClass = false,
                removeClass = () => {
                    canRemoveClass = true;

                    setTimeout(() => {
                            if (canRemoveClass) {
                                this.menu.classList.remove(activeClass);
                        }
                    }, 100);
                }

            this.holderCategories.addEventListener('mouseover', (e) => {
                if (e.target.closest('.has-subdropdown')) {
                    canRemoveClass = false;
                    return this.menu.classList.add(activeClass);
                }

                removeClass();
            });

            this.holderCategories.addEventListener('mouseleave', () => {
                removeClass();
            });
        },

        handleClasses() {
            for (let i = 0; i < this.categories.length; i++) {
                let category = this.categories[i];

                if (category.querySelector('.holder-sub-categories')) {
                    category.classList.add('has-subdropdown');
                }
            }
        },

        enableMenu() {
            this.holderCategories.classList.remove('-is-loading');
        },
    },
}
</script>