<template>
    <div
        v-if="hasCustomizations"
        class="text-center"
    >
        <div
            v-if="sku.allow_sell_without_customization"
            class="-all-optional"
            @click="toggleShowContent"
        >
            <span class="link-alike">Personalize o Produto</span>

            <SelectArrow
                class="icon icon-select-arrow"
                :class="{ '-up': showContent }"
            />
        </div>

        <div
            v-if="showContent"
            class="main-product-customization text-left"
        >
            <div class="-title">
                Personalizar produto
            </div>

            <div
                v-for="customization in customizations"
                :key="customization.id"
                class="customization"
            >
                <label :for="`customization-${customization.id}`">
                    {{ customization.name }}

                    <span
                        v-if="isMandatoryCustomization(customization, sku.allow_sell_without_customization)"
                        class="required"
                    >*</span>
                </label>

                <input
                    v-if="customization.type === 'input'"
                    ref="customizationField"
                    v-mask="getMask(customization)"
                    type="text"
                    placeholder="Digite aqui..."
                    :maxlength="customization.max_chars"
                    :class="{ error: hasError(customization.id) }"
                    :value="values[customization.id]"
                    @input="setCustomizationValue(customization, $event.target.value, true)"
                    @change="checkValues(customization, values)"
                >

                <custom-select
                    v-else
                    ref="customizationField"
                    value=""
                    :class="{ error: hasError(customization.id) }"
                    @change="setCustomizationValue(customization, $event, true)"
                >
                    <option value="">
                        Selecionar...
                    </option>

                    <option
                        v-for="(value) in customization.values"
                        :key="value"
                        :value="value"
                        v-text="value"
                    />
                </custom-select>

                <ErrorText :text="getError(customization.id)" />

                <div class="flex -between">
                    <div class="-max-chars">
                        <template v-if="customization.type === 'input'">
                            Máximo de {{ customization.max_chars }} caracteres
                        </template>
                    </div>

                    <div
                        v-if="customization.price > 0"
                        class="-customization-price"
                    >
                        + {{ customization.price | formatMoney }}
                    </div>
                </div>
            </div>

            <div
                v-if="priceSum > 0"
                class="total-sum flex -between"
            >
                <div class="-text">
                    Valor total da personalização:
                </div>
                <div>{{ priceSum | formatMoney }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from '~lodash';
import BaseCustomization from '@/components/product/BaseCustomization.vue';
import { smoothScroll } from '@/mixins/helpers';
import errorsMixin from '@/mixins/errors';

export default {
    name: 'SkuCustomizations',

    extends: BaseCustomization,

    mixins: [errorsMixin],

    props: {
        sku: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        showContent: false,
        values: {},
        priceSum: 0,
    }),

    computed: {
        allOptional() {
            return this.customizations.every(customization => !customization.required);
        },

        customizations() {
            return _.get(this.sku, 'customizations.data', []);
        },

        hasCustomizations() {
            return !_.isEmpty(this.customizations);
        },
    },

    watch: {
        sku: {
            immediate: true,
            handler() {
                this.showContent = !_.get(this.sku, 'allow_sell_without_customization', true);
            },
        },

        values: {
            deep: true,
            handler() {
                this.calculateSum(this.customizations);
                this.$emit('change', this.values);
            },
        },
    },

    mounted() {
        this.bootValues();
    },

    methods: {
        smoothScroll,
        getMask(customization) {
            const tests = {
                letters: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{} ]/,
                numbers: /[0-9 ]/,
                all: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{}0-9 ]/,
            };

            return _.times(customization.max_chars, _.constant(tests[customization.allowed_values]));
        },

        calculateSum() {
            this.priceSum = this.customizations.reduce((acc, customization) => {
                let tempAcc = acc;

                if (this.values[customization.id]) {
                    tempAcc += customization.price;
                }

                return tempAcc;
            }, 0);
        },

        toggleShowContent() {
            this.showContent = !this.showContent;
        },

        bootValues() {
            this.customizations.forEach(customization => {
                this.setCustomizationValue(customization, '');
            });
        },

        setCustomizationValue(customization, payload, checkError = false) {
            this.$set(this.values, customization.id, payload);

            if (checkError) {
                this.checkValues(customization);
            }
        },

        checkValues(context = undefined) {
            if (!context) {
                this.clearErrors();
            } else {
                this.setError(context.id, '');
            }

            const invalidCustomizations = this.getInvalidCustomizations();

            if (_.isEmpty(invalidCustomizations)) {
                return true;
            }

            invalidCustomizations.forEach(customization => {
                this.setError(customization.id, 'Campo obrigatório');
            });

            this.smoothScroll(document.body, 0, this.$el.offsetTop);

            return false;
        },

        getInvalidCustomizations() {
            if (this.customizations.length === 0
                || _.get(this.sku, 'allow_sell_without_customization', true)) {
                return;
            }

            const emptyCustomizations = this.customizations
                .filter(customization => _.isEmpty(this.values[customization.id]));

            // all empty are not required
            if (emptyCustomizations.every(customization => !customization.required)) {
                return;
            }

            // mark required and not filled as mandatory field
            return emptyCustomizations.filter(customization => customization.required);
        },

        isMandatoryCustomization(customization, isProductNotMandatory) {
            if (!isProductNotMandatory) {
                return true;
            }

            return customization.required;
        }
    },
};
</script>
