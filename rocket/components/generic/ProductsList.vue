<template>
    <div class="products-list">
        <component
            :is="tagOrDiv('splide')"
            v-if="ready"
            :options="carousel ? carouselOptions : null"
            :class="{
                'flex -wrap': !carousel,
                'single-per-line': isMobile && productsPerLine === 1,
                '-no-pagination': carousel && products.length <= productsPerPage,
            }"
            :slides="carousel ? products : null"
        >
            <component
                :is="tagOrDiv('splide-slide')"
                v-for="product in products"
                :key="product.id"
                :class="{
                    'box-product-wrapper': !carousel,
                    '-loading': loading,
                }"
            >
                <slot
                    :product="product"
                    :loading="loading"
                />
            </component>

            <component
                :is="tagOrDiv('li')"
                class="box-product-wrapper -clear"
            />
            <component
                :is="tagOrDiv('li')"
                class="box-product-wrapper -clear"
            />
            <component
                :is="tagOrDiv('li')"
                class="box-product-wrapper -clear"
            />
        </component>
    </div>
</template>

<script>

export default {
    name: 'ProductsList',

    props: {
        products: {
            type: Array,
            default: () => ([]),
        },

        carousel: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },

        productsPerLine: {
            type: Number,
            default: 2,
            validator: value => [1, 2].includes(value),
        },

        isMobile: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            ready: true,
        };
    },

    computed: {
        carouselOptions() {
            return {
                gap: 32,
                perPage: 4,
                pagination: true,
                arrows: true,
                breakpoints: {
                    700: {
                        gap: 12,
                        perPage: 3,
                        pagination: true,
                        arrows: false,
                    },
                    580: {
                        gap: 12,
                        perPage: this.productsPerLine,
                        pagination: true,
                        arrows: false,
                    },
                },
            };
        },

        productsPerPage() {
            if (this.isMobile) {
                if (window.innerWidth <= 580) {
                    return this.productsPerLine;
                }

                return 3;
            }

            return 4;
        },
    },

    watch: {
        isMobile() {
            if (this.carousel) {
                this.ready = false;

                this.$nextTick(() => {
                    this.ready = true;
                });
            }
        },
    },

    methods: {
        tagOrDiv(tag) {
            return this.carousel ? tag : 'div';
        },
    },
};
</script>
