import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        mainQueryString: '',
    }),

    computed: {
        ...mapGetters('queryParams', [
            'queryParams',
        ]),

        ...mapGetters('preview', [
            'isPreview',
        ]),
    },

    methods: {
        ...mapActions('filters', [
            'addActiveFilter',
            'removeActiveFilter',
            'bootQueryParams',
        ]),

        ...mapActions('queryParams', [
            'setQueryParams',
            'removeQueryParams',
        ]),

        updateFilterStatus(filter, status) {
            if (this.isPreview) {
                return;
            }

            filter.active = status;

            this.checkFilterStatus(filter);

            this.setQueryParams({
                [this.mainQueryString]: filter.id,
                page: 1,
            });
        },

        parseFilterStatuses(filters) {
            filters.forEach(filter => this.checkFilterStatus(filter, false));
        },

        checkFilterStatus(filter, remove = true) {
            if (!filter.active && !remove) {
                return;
            }

            const method = filter.active ? 'addActiveFilter' : 'removeActiveFilter';

            this[method]({
                id: filter.id,
                key: this.mainQueryString,
                query: {
                    [this.mainQueryString]: filter.id,
                },
                alias: `${this.mainQueryString}-${filter.id}`,
                name: filter.name,
            });
        },
    },
};
