<script>
import { mapGetters } from '~/vuex';
import _ from '~/lodash';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import queryParams from '@/mixins/queryParams';

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
        if (!this.shouldUseNewSearchStrategy) {
            this.loadData();
        }

        this.$store.subscribe(({ type, payload }) => {
            if (type !== 'filters/REMOVE_ACTIVE_FILTER') {
                return;
            }

            if (payload.key !== this.mainQueryString) {
                return;
            }

            this.filterRemoved(payload);
        });

        this.loading = false;
    },

    methods: {
        processQueryParams(payload) {
            if (!this.queryParams[this.mainQueryString]) {
                return payload;
            }

            const filterIds = this.queryParams[this.mainQueryString];

            if (!filterIds.length) {
                return payload;
            }

            payload.forEach(item => {
                item.active = filterIds.includes(item.id);
            });
            return payload;
        },

        async loadData() {
            try {
                this.loading = true;

                const filteredQueryParams = _.pick(this.queryParams, ['slug', 'q', 'context']);

                const url = this.$applyQueriesToUrl(`search/products/${this.route}`, filteredQueryParams);
                const { data } = await api.get(url);

                if (this.isPreview && _.isEmpty(data.data)) {
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
            const filterToRemove = this.currentPayload.find(item => item.id === filter.id);

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
