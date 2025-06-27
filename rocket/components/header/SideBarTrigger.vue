<template>
    <div
        v-if="isMobile"
        :class="name + '-trigger-holder'"
    >
        <div
            :class="name + '-trigger'"
            @click="openMenu"
        >
            <div
                v-if="isActive"
                class="over-background"
                @mousedown="closeMenu"
            />
            <slot />
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/vuex';
import mobileMixin from '@/mixins/mobile';
import rocket from '@/modules/axios/rocket';

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
        },
    },

    data() {
        return {
            isActive: false,
        };
    },

    computed: {
        ...mapGetters('preview', [
            'isIframe',
        ]),
    },

    mounted() {
        this.isActive = document.body.classList.contains(this.activeClass);

        if (!this.isIframe) {
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
    },
};
</script>
