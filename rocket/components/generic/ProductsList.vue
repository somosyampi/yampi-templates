<template>
    <div
        class="products-list"
        :class="{
            '-grid': !carousel,
            'single-per-line': isMobile && productsPerLine === 1,
        }"
    >
        <Splide
            v-if="carousel && ready"
            :options="carouselOptions"
            :class="{
                '-no-pagination': products.length <= productsPerPage,
            }"
            :slides="products"
        >
            <SplideSlide
                v-for="product in products"
                :key="product.id"
                :class="{ '-loading': loading }"
            >
                <slot
                    :product="product"
                    :loading="loading"
                />
            </SplideSlide>
        </Splide>

        <template v-else-if="!carousel">
            <div
                v-for="product in products"
                :key="product.id"
                class="box-product-wrapper"
                :class="{ '-loading': loading }"
            >
                <slot
                    :product="product"
                    :loading="loading"
                />
            </div>
        </template>
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
};
</script>
