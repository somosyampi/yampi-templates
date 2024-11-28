<script>
import { mapGetters } from '~/vuex';
import _ from '~/lodash';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import queryParams from '@/mixins/queryParams';
import { isEmpty } from '@/mixins/helpers';

export default {
    name: 'BaseFilter',

    mixins: [
        queryParams,
    ],

    data: () => ({
        loading: true,
        route: '',
        payload: [],
    }),

    computed: {
        ...mapGetters('preview', ['isPreview']),
    },

    mounted() {
        this.loadData();

        this.$store.subscribe(({ type, payload }) => {
            if (type !== 'filters/REMOVE_ACTIVE_FILTER') {
                return;
            }

            if (payload.key !== this.mainQueryString) {
                return;
            }

            this.filterRemoved(payload);
        });
    },

    methods: {
        async loadData() {
            try {
                this.loading = true;

                const filteredQueryParams = _.pick(this.queryParams, ['slug', 'q', 'context']);

                const url = this.$applyQueriesToUrl(`search/products/${this.route}`, filteredQueryParams);
                const { data } = await api.get(url);

                if (this.isPreview && isEmpty(data.data)) {
                    await this.loadPlaceholders();
                    return;
                }

                this.payload = this.parsePayload(data.data);

                this.parseFilterStatuses(this.payload);
            } catch (e) {
                if (e.response.status >= 400 && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                console.error(e);
            } finally {
                this.loading = false;
            }
        },

        parsePayload(payload) {
            return payload.map(item => ({
                ...item,
                active: this.queryParams[this.mainQueryString].includes(item.id),
            }));
        },

        filterRemoved(filter) {
            const filterToRemove = this.payload.find(item => item.id === filter.id);

            if (filterToRemove) {
                filterToRemove.active = false;
            }
        },

        async loadPlaceholders() {
            const { data } = await rocket.get(`/placeholders/filter-${this.route}`);
            this.payload = this.parsePayload(data.data);
        },
    },
};
</script>
