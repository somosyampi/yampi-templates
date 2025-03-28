<template>
    <div class="grid-collection-box">
        <slot
            v-if="product"
            :product="product"
        />

        <BuyButton
            v-if="displayButton"
            :has-button-style="true"
            :is-text-and-icon-button="true"
            :product="product"
        >
            <IconAddToCart
                v-if="buttonHasIcon"
                :color="iconColor"
                width="20"
                height="20"
            />

            <span
                class="text"
                v-text="buttonText"
            />
        </BuyButton>
    </div>
</template>

<script>
import { mapGetters } from '~/vuex';
import api from '@/modules/axios/api';
import rocket from '@/modules/axios/rocket';

export default {
    name: 'GridCollectionBoxProduct',

    props: {
        productSlug: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        product: null,
    }),

    computed: {
        ...mapGetters('preview', ['isPreview']),

        ...mapGetters('theme', ['themeStyle']),

        buttonClass() {
            return [
                `--space-top-${this.themeStyle.grids_add_to_cart_space_between_price}`,
            ];
        },

        buttonText() {
            return this.themeStyle.grids_quickbuy_text_button || 'Adicionar ao carrinho';
        },

        buttonHasIcon() {
            return this.themeStyle.grids_add_to_cart_icon_text_button_display_icon;
        },

        iconColor() {
            const iconColorMapping = {
                primary: this.themeStyle.color_btn_primary_text,
                secondary: this.themeStyle.color_btn_secundary_text,
                custom: this.themeStyle.grids_add_to_cart_icon_text_button_text_color,
            };

            return iconColorMapping[this.themeStyle.grids_quickbuy_prices_color ?? 'custom'];
        },

        displayButton() {
            const buttonType = this.themeStyle.grids_add_to_cart_button_type;
            const isTextAndIconButton = buttonType === 'icon_and_text';
            const shouldShowButton = this.themeStyle.show_add_to_cart_button;

            return this.product && isTextAndIconButton && shouldShowButton;
        },
    },

    mounted() {
        this.loadProduct();
    },

    methods: {
        async loadProduct() {
            try {
                if (!this.productSlug && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                if (!this.productSlug) {
                    return;
                }

                const payload = await this.getProduct();

                if (this.isEmptyPayload(payload) && this.isPreview) {
                    await this.loadPlaceholders();

                    return;
                }

                this.product = payload;
            } catch (e) {
                if (e.response.status >= 400 && this.isPreview) {
                    await this.loadPlaceholders();
                }
            }
        },

        async getProduct() {
            try {
                const { data: payload } = await api.get(
                    `catalog/products/${this.productSlug}`,
                );

                return payload?.data ?? null;
            } catch (error) {
                console.error('Erro ao obter produto -', error);
                throw error;
            }
        },

        async loadPlaceholders() {
            const { data: payload } = await rocket.get(
                '/placeholders/grid-collection',
            );

            this.product = payload.data.product ?? null;
        },

        isEmptyPayload(payload) {
            return !payload || Object.keys(payload).length === 0;
        },
    },
};
</script>
