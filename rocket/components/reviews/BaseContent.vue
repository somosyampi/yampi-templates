<script>
import { mapGetters } from '~/vuex';
import _ from '~/lodash';
import api from '@/modules/axios/api';

export default {

    props: {
        loading: {
            type: Boolean,
            default: false,
        },

        count: {
            type: Number,
            default: 0,
        },

        active: {
            type: Boolean,
            default: false,
        },

        showDates: {
            type: Boolean,
            required: true,
        },
    },

    data: () => ({
        payload: [],
        loaded: false,
        isLoading: false,
        route: '',
        pagination: {
            total: 0,
            loaded: 0,
            currentPage: 1,
            limit: 4,
        },
    }),

    computed: {
        ...mapGetters('product', [
            'product',
        ]),

        ...mapGetters('preview', ['isPreview']),

        showLoadMore() {
            return this.pagination.loaded < this.pagination.total;
        },
    },

    watch: {
        active() {
            this.loadData();
        },
    },

    mounted() {
        this.loadData();
        this.loadCount();
    },

    methods: {
        async loadData(nextPage = false, filterBy = 'newest') {
            if (!nextPage && (this.loaded || !this.active)) {
                return;
            }

            try {
                this.isLoading = true;
                this.$emit('update:loading', true);

                if (nextPage) {
                    this.pagination.currentPage += 1;
                }

                const url = this.$applyQueriesToUrl(`catalog/products/${this.route}`, {
                    product_id: this.product.id,
                    filterBy,
                    limit: this.pagination.limit,
                    page: this.pagination.currentPage,
                    include: 'photos',
                });

                const { data } = await api.get(url);

                this.payload.push(...data.data);
                this.pagination.loaded += data.data.length;
            } catch (e) {
                console.error(e);
            } finally {
                this.loaded = true;
                this.isLoading = false;
                this.$emit('update:loading', false);
            }
        },

        async loadCount() {
            try {
                const url = this.$applyQueriesToUrl(`catalog/products/${this.route}/count`, {
                    product_id: this.product.id,
                    limit: this.pagination.limit,
                });

                const { data } = await api.get(url);

                this.pagination.total = _.get(data, 'data.total', 0);
                this.$emit('update:count', this.pagination.total);
            } catch (e) {
                console.error(e);
            }
        },

        showModal() {
            this.$refs.modal.showModal();
        },

        showModalSuccess() {
            this.$refs.modalSuccess.showModal();
        },
    },
};
</script>
