<template>
    <transition name="fadeHeight">
        <div
            v-if="showSearchBar"
        >
            <form
                id="product-search"
                role="search"
                class="search-bar"
                action="/busca"
                @submit.prevent="search"
            >
                <label
                    class="-hide"
                    for="product-name"
                >Busca</label>
                <input
                    id="product-name"
                    v-model="productName"
                    type="text"
                    name="product-name"
                    placeholder="Buscar produto"
                >
                <span
                    class="search-btn"
                    @click="search"
                >
                    <i class="icon icon-search" />
                </span>
            </form>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from '~/vuex';

export default {
    name: 'SearchBar',

    data: () => ({
        productName: '',
    }),

    computed: {
        ...mapGetters('header', [
            'showSearchBar',
        ]),
    },

    mounted() {
        this.parseQueryString();
    },

    methods: {
        search() {
            if (!this.productName.length) {
                return;
            }

            this.$redirectTo(this.$applyQueriesToUrl(
                `${this.$baseUrl}/busca`,
                { q: this.productName },
            ));
        },

        parseQueryString() {
            this.productName = (new URLSearchParams(window.location.search)).get('q') || '';
        },
    },
};
</script>
