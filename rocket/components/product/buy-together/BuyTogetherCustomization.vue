<template>
    <div>
        <div
            class="products-customization"
            :class="{ error: customizationError }"
            @click="$emit('click')"
        >
            <div v-if="productsForCustomization.length && !Object.keys(customizedProducts).length">
                <p class="mt-12 mb-7">
                    Você tem
                    <span>{{ productsForCustomization.length }}</span>
                    {{ $tc('common.product', productsForCustomization.length) }}
                    <br>
                    para personalizar
                </p>
                <p class="helper-text">
                    Personalizar
                </p>
            </div>
            <div v-else>
                <p
                    :class="{
                        'none-products': productsUserAlreadyCustomized === 0,
                        'already-customized-products': productsUserAlreadyCustomized > 0,
                        'mt-12': shouldChangeMargin
                    }"
                    v-html="$tc('buy-together-customization.product-customization',
                                productsUserAlreadyCustomized)"
                />
                <p class="helper-text">
                    Editar
                </p>
            </div>
        </div>

        <ModalBuyTogetherCustomization
            ref="ModalBuyTogetherCustomization"
            @save="handleSave"
        />
    </div>
</template>

<script>
import { mapGetters } from '~vuex';

export default {
    name: 'BuyTogetherCustomization',

    props: {
        error: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            customizationError: false,
            screenWidth: window.innerWidth,
        };
    },

    computed: {
        ...mapGetters('buyTogether', ['productsForCustomization', 'customizedProducts']),

        ...mapGetters('theme', ['themeStyle']),

        productsUserAlreadyCustomized() {
            return Object.values(this.customizedProducts).filter(b => b.isPersonalized).length;
        },

        shouldChangeMargin() {
            if ((this.themeStyle.fonts_texts_size === 14
             && !!this.themeStyle.fonts_texts_family.match(/rubik/gi))
             || this.productsUserAlreadyCustomized > 0
             || this.screenWidth < 700) {
                return false;
            }

            return true;
        },
    },

    mounted() {
        window.addEventListener('resize', () => {
            this.screenWidth = window.innerWidth;
        });
    },

    methods: {
        handleCustomization() {
            this.$refs.ModalBuyTogetherCustomization.handleModal();
        },

        checkError() {
            this.customizationError = this.productsForCustomization.length
                !== Object.keys(this.customizedProducts).length;
        },

        handleSave() {
            this.$emit('save');
        },
    },
};

</script>
