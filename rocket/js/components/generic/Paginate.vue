<template>
    <ul @click="onPagerClick" class="paginate">
        <li
            :class="{ active: current === 1, disabled }"
            v-if="pageCount > 0"
            class="number"
        >1</li>

        <li
            class="more"
            :class="{ disabled }"
            v-if="showPrevMore"
        >...</li>

        <li
            v-for="pager in pagers"
            :key="pager"
            :class="{ active: current === pager, disabled }"
            class="number"
            v-text="pager"
        ></li>

        <li
            class="more"
            :class="{ disabled }"
            v-if="showNextMore"
        >...</li>

        <li
            :class="{ active: current === pageCount, disabled }"
            class="number"
            v-if="pageCount > 1"
            v-text="pageCount"
        ></li>
    </ul>
</template>

<script>
import queryParams from '@/mixins/queryParams';

export default {
    name: 'Paginate',

    mixins: [
        queryParams,
    ],

    props: {
        value: {
            type: Number,
            required: true,
        },

        pageCount: {
            type: Number,
            default: 10,
        },

        pagerCount: {
            type: Number,
            default: 7,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    watch: {
        value: {
            immediate: true,
            handler() {
                this.current = this.value;
            },
        },
    },

    methods: {
        onPagerClick(event) {
            const target = event.target;

            if (target.tagName === 'UL' || this.disabled) {
                return;
            }

            let newPage = Number(event.target.textContent);
            const pageCount = this.pageCount;
            const currentPage = this.current;
            const pagerCountOffset = this.pagerCount - 2;

            if (target.className.indexOf('more') !== -1) {
                if (target.className.indexOf('quickprev') !== -1) {
                    newPage = currentPage - pagerCountOffset;
                } else if (target.className.indexOf('quicknext') !== -1) {
                    newPage = currentPage + pagerCountOffset;
                }
            }

            if (!isNaN(newPage)) {
                if (newPage < 1) {
                    newPage = 1;
                }

                if (newPage > pageCount) {
                    newPage = pageCount;
                }
            }

            if (newPage !== currentPage) {
                this.current = newPage;
                this.$emit('input', newPage);
            }
        },
    },

    computed: {
        pagers() {
            const pagerCount = this.pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;
            const currentPage = Number(this.current);
            const pageCount = Number(this.pageCount);
            let showPrevMore = false;
            let showNextMore = false;

            if (pageCount > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }

                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }

            const array = [];

            if (showPrevMore && !showNextMore) {
                const startPage = pageCount - (pagerCount - 2);
                for (let i = startPage; i < pageCount; i++) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 2; i < pagerCount; i++) {
                    array.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
                    array.push(i);
                }
            } else {
                for (let i = 2; i < pageCount; i++) {
                    array.push(i);
                }
            }

            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;

            return array;
        },
    },

    data: () => ({
        current: null,
        showPrevMore: false,
        showNextMore: false,
    }),
};
</script>
