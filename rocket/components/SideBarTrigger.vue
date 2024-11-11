<template>
    <div :class="name + '-trigger-holder'" v-if="isMobile">
        <div :class="name + '-trigger'" @click="openMenu">
            <div class="over-background"  @mousedown="closeMenu" v-if="isActive"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/vuex';
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'SideBarTrigger',

    mixins: [
        mobileMixin,
    ],

    props: {
        activeClass: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        }
    },

    mounted() {
        this.isActive = document.body.classList.contains(this.activeClass);

        if (!this.isPreview) {
            return;
        }

        this.$store.subscribe(({ type, payload }) => {
            if (type !== 'preview/PREVIEW_MOBILE_PARAMS' || this.activeClass !== 'active-filters') {
                return;
            }

            const filtersGroupParams = payload.filter(param => param.group === 'filters');

            if (filtersGroupParams.length) {
                this.openMenu();
            }
        });
    },

    data() {
        return {
            isActive: false,
        }
    },

    computed: {
        ...mapGetters('preview', [
            'isPreview',
        ]),
    },

    methods: {
        openMenu() {
            this.isActive = true;
            document.body.classList.add(this.activeClass);
        },

        closeMenu() {
            this.isActive = false;
            document.body.classList.remove(this.activeClass);
        },

        async loadPlaceholders() {
            const { data } = await rocket.get(`/placeholders/filter-${this.route}`);

            this.payload = this.parsePayload(data.data);
        },
    }
};
</script>
