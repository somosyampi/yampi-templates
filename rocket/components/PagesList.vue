<template>
    <div class="pages-list flex" v-if="isMobile">
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
import SideBarTrigger from './SideBarTrigger.vue';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'PagesList',

    mixins: [
        mobileMixin,
    ],

    components: { SideBarTrigger },

    props: {
        pageList: {
            type: Array,
            required: true,
        },

        selectedPage: {
            type: String,
            required: true,
        }
    },

    mounted() {},

    data: () => ({ }),

    methods: {
        openPage(value) {
            this.$redirectTo(value);
        },

        activePage() {
            return `/atendimento/${this.selectedPage}`;
        }
    },
};
</script>
