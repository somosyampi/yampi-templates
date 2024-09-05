<script>
import { mapActions, mapGetters } from '~vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';
import productMixin from '@/mixins/product';

export default {
    name: 'BaseProduct',

    mixins: [productMixin],

    data: () => ({
        payload: [],
        loading: false,
        route: '',
        queryParams: '',
        alreadyViewed: false,
    }),

    computed: {
        ...mapGetters('preview', ['isPreview']),
    },

    mounted() {
        this.loading = true;
    },

    methods: {
        ...mapActions('environment', [
            'setRecomm',
        ]),

        async loadProducts() {
            try {
                this.loading = true;

                let url = `catalog/products/${this.validProduct.id}/${this.route}`;

                if (this.queryParams) {
                    url = this.$applyQueriesToUrl(url, this.queryParams);
                }

                const { data } = await api.get(url);

                if (!data.data.length && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                if (data.recomm_id) {
                    this.setRecomm(data.recomm_id);

                    data.data.forEach(product => {
                        product.url_path += `?has_recomm=1&recomm_id=${data.recomm_id}`;
                    });
                }

                this.payload = data.data;
            } catch (e) {
                if (e.response.status >= 400 && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }
            } finally {
                this.loading = false;
            }
        },

        async loadPlaceholders() {
            const { data } = await rocket.get(`/placeholders/${this.route}`);

            this.payload = data.data;
        },

        visibilityChanged(isVisible) {
            if (isVisible) {
                this.loadProducts();
            }
        },
    },
};
</script>
