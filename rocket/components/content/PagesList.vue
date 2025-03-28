<template>
    <div
        v-if="isMobile"
        class="pages-list flex"
    >
        <select
            is="custom-select"
            id="pages-select"
            name="pages"
            :value="activePage()"
            @change="openPage"
        >
            <option
                v-for="page in pageList"
                :key="page.slug"
                :value="page.path"
            >
                {{ page.name }}
            </option>
        </select>
    </div>
</template>

<script>
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'PagesList',

    mixins: [
        mobileMixin,
    ],

    props: {
        pageList: {
            type: Array,
            required: true,
        },

        selectedPage: {
            type: String,
            required: true,
        },
    },

    data: () => ({ }),

    mounted() {},

    methods: {
        openPage(value) {
            this.$redirectTo(value);
        },

        activePage() {
            return `/atendimento/${this.selectedPage}`;
        },
    },
};
</script>
