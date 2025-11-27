<template>
    <Transition name="fadeHeight">
        <div
            v-if="showSearchBar"
            class="search-container"
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
                    autocomplete="off"
                    :class="{
                        'input-focused': isInputFocused,
                        'suggestions-border-active': showSuggestions && suggestions.length > 0
                    }"
                    @input="onInput"
                    @keydown.down.prevent="onArrowDown"
                    @keydown.up.prevent="onArrowUp"
                    @keydown.enter.prevent="onEnter"
                    @blur="onBlur"
                    @focus="onFocus"
                    @mousedown="isInputFocused = true"
                    @click="handleTrackApi('store-search-intended')"
                >
                <span
                    class="search-btn"
                    @click="search('search_icon')"
                >
                    <i class="icon icon-search" />
                </span>
            </form>

            <div
                v-if="showSuggestions && suggestions.length > 0"
                class="suggestions-box"
            >
                <ul>
                    <li
                        v-for="(suggestion, index) in suggestions"
                        :key="index"
                        :class="{ 'active': currentIndex === index }"
                        @mousedown.prevent="selectSuggestion(suggestion)"
                        @mouseover="currentIndex = index"
                    >
                        <span
                            class="ellipsis"
                            v-html="highlightMatch(suggestion)"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </Transition>
</template>

<script>
import { mapGetters } from '~/vuex';
import { debounce } from '@/mixins/helpers';
import searchApi from '@/modules/axios/search';
import trackingByApi from '@/mixins/tracking/api';
import cacheMixin from '@/mixins/cache';

export default {
    name: 'SearchBar',

    mixins: [trackingByApi, cacheMixin],

    data: () => ({
        productName: '',
        suggestions: [],
        topSuggestions: [],
        showSuggestions: false,
        currentIndex: -1,
        debounceTimer: null,
        isInputFocused: false,
        debouncedGetSuggestions: () => {},
        minScore: localStorage.getItem('ROCKET_SEARCH_MIN_SCORE') ?? window.Yampi.search_min_score,
    }),

    computed: {
        ...mapGetters('header', [
            'showSearchBar',
        ]),

        ...mapGetters('merchant', [
            'merchant',
        ]),
    },

    mounted() {
        this.parseQueryString();

        this.debouncedGetSuggestions = debounce(this.getSuggestions, 300);
        const storeId = this.merchant.id;

        searchApi.get('/v1/search/public/products/suggestions', {
            params: {
                min_score: this.minScore,
                store_id: storeId,
            },
        })
            .then(response => {
                this.topSuggestions = Array.isArray(response.data?.data) ? response.data?.data.slice(0, 9) : [];
            })
            .catch(error => {
                console.log('Erro ao buscar sugestões:', error);
                this.topSuggestions = [];
            });
    },

    methods: {
        search(location = null) {
            if (!this.productName.length) {
                return;
            }

            this.handleTrackApi('store-search-clicked', { location });

            this.setLocalStorageCache({
                itemId: this.productName,
                data: { q: this.productName },
                itemAlias: 'search_query',
            });

            this.$redirectTo(this.$applyQueriesToUrl(
                `${this.$baseUrl}/busca`,
                { q: this.productName },
            ));
        },

        parseQueryString() {
            this.productName = (new URLSearchParams(window.location.search)).get('q') || '';
        },

        onInput() {
            this.currentIndex = -1;
            if (this.productName.length > 1) {
                this.debouncedGetSuggestions();
            } else {
                this.suggestions = [];
                this.showSuggestions = false;
            }
        },

        async getSuggestions() {
            if (!this.productName) return;

            const storeId = this.merchant.id;

            try {
                const response = await searchApi.get('/v1/search/public/products/suggestions', {
                    params: {
                        q: this.productName,
                        min_score: this.minScore,
                        store_id: storeId,
                    },
                });
                const suggestionArray = response.data?.data || [];

                if (Array.isArray(suggestionArray) && suggestionArray.length > 0) {
                    this.suggestions = suggestionArray.slice(0, 9);
                    this.showSuggestions = true;
                } else {
                    this.suggestions = [];
                    this.showSuggestions = false;
                }
            } catch (error) {
                console.error('Erro ao buscar sugestões:', error);
                this.suggestions = [];
                this.showSuggestions = false;
            }
        },

        onArrowDown() {
            if (this.suggestions.length === 0) return;
            if (this.currentIndex < this.suggestions.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        },

        onArrowUp() {
            if (this.suggestions.length === 0) return;
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.suggestions.length - 1;
            }
        },

        onEnter() {
            if (this.currentIndex >= 0 && this.currentIndex < this.suggestions.length) {
                this.selectSuggestion(this.suggestions[this.currentIndex]);
            } else {
                this.search('search_icon');
            }
        },

        selectSuggestion(suggestion) {
            this.productName = suggestion;
            this.showSuggestions = false;

            this.search('dropdown');
        },

        onBlur() {
            setTimeout(() => {
                this.showSuggestions = false;
                this.isInputFocused = false;
            }, 200);
        },

        onFocus() {
            this.isInputFocused = true;

            if (this.productName.length <= 1 && this.topSuggestions.length > 0) {
                this.suggestions = this.topSuggestions;
                this.showSuggestions = true;
                return;
            }

            if (this.productName.length > 1 && this.suggestions.length > 0) {
                this.showSuggestions = true;
            }
        },

        highlightMatch(suggestion) {
            if (!this.productName) return suggestion;

            const input = this.productName;
            if (!suggestion.toLowerCase().startsWith(input.toLowerCase())) {
                // fallback para o comportamento antigo se não for prefixo
                return suggestion.replace(
                    new RegExp(`(${input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'i'),
                    '<span>$1</span>',
                );
            }
            const normal = suggestion.substr(0, input.length);
            const bold = suggestion.substr(input.length);
            return `${normal}<b>${bold}</b>`;
        },
    },
};
</script>

<style lang="scss" scoped>
.search-container {
    position: relative;
    width: 100%;
}

.search-bar input {
    border: 1px solid var(--black-lightest);
    transition: border-color 0.2s;

    &.input-focused {
        border-radius: var(--theme-border-radius);
        border: 2px solid var(--black-dark-color-contrast);
        outline: none;
    }

    &.suggestions-border-active {
        border-radius: var(--theme-border-radius) var(--theme-border-radius) 0 0;
        border: 2px solid var(--black-dark-color-contrast);
        border-bottom: 1px solid #E5E5E5;
    }
}

.search-bar input:hover {
    border-color: #B5B5B5;
}

.suggestions-box {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--white);
    border-radius: 0 0 var(--theme-border-radius) var(--theme-border-radius);
    margin-top: -1px;
    max-height: none;
    border: 2px solid var(--black-dark-color-contrast);
    padding: 3px;
    border-top: 1.5px solid #E5E5E5;
}

.suggestions-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.suggestions-box li {
    padding: 10px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    background: white;
    color: rgb(var(--black-dark-rgb));
    transition: background 0.15s, color 0.15s;
    border-radius: var(--theme-border-radius);
}

.suggestions-box li.active,
.suggestions-box li:hover {
    background-color: var(--white-smoke);
    color: #666666;
}

.suggestions-box li b {
    font-weight: var(--font-black);
    color: inherit;
}
</style>
