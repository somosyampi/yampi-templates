<template>
    <div class="customization-content">
        <custom-radio-group
            v-if="sku.allow_sell_without_customization"
            :options="[
                {
                    key: 1,
                    value: false,
                    text: 'Não quero personalizar'
                },
                {
                    key: 2,
                    value: true,
                    text: 'Quero personalizar'
                }
            ]"
            :initial-value="false"
            :value="showContent"
            @pick="handlePickedOption"
        >
            <template #title>
                <div class="radio-optional-customization">
                    A personalização desse produto é <b>opcional</b>
                </div>
            </template>

            <template #subtitle>
                O que deseja fazer?
            </template>
        </custom-radio-group>

        <div
            v-if="showContent || !sku.allow_sell_without_customization"
            class="input-customization"
            role="form"
            aria-labelledby="customization-label"
        >
            <div
                v-for="customization in sku.customizations.data"
                :key="customization.id"
            >
                <div
                    id="customization-label"
                    class="input-customization-title"
                    :class="{ '-optional': !customization.required }"
                >
                    {{ customization.name }}
                </div>

                <input
                    v-if="customization.type === 'input'"
                    v-mask="getMask(customization)"
                    type="text"
                    placeholder="Digite aqui..."
                    :class="{
                        error: hasError(customization.id)
                    }"
                    :value="values[customization.id]"
                    @input="setCustomizationValue(customization, $event.target.value, true)"
                    @change="checkValues(customization, values)"
                >

                <custom-select
                    v-else
                    :value="values[customization.id]"
                    :class="{
                        error: hasError(customization.id)
                    }"
                    @change="setCustomizationValue(customization, $event, true)"
                >
                    <option value="">
                        Selecionar...
                    </option>

                    <option
                        v-for="value in customization.values"
                        :key="value"
                        :value="value"
                        v-text="value"
                    />
                </custom-select>

                <p
                    v-if="hasError(customization.id)"
                    class="error-message"
                    role="alert"
                >
                    {{ errors[customization.id] }}
                </p>

                <div class="row-spec">
                    <p class="customization-spec">
                        <span v-if="customization.type === 'input'">
                            Máximo de {{ customization.max_chars }} caracteres
                        </span>
                    </p>
                    <p
                        v-if="customization.price > 0"
                        class="customization-spec__value"
                    >
                        + {{ customization.price | formatMoney }}
                    </p>
                </div>
            </div>
            <div class="row-total">
                <p class="customization-total">
                    Valor total da personalização:
                </p>
                <p class="customization-total">
                    {{ priceSum | formatMoney }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import _ from '~/lodash';
import BaseCustomization from '@/components/product/BaseCustomization.vue';

export default {
    name: 'CustomizationContent',

    extends: BaseCustomization,

    props: {
        sku: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            skuCustomized: false,
        };
    },

    computed: {
        optionalCustomization() {
            return this.sku.customizations.data.filter(customization => !customization.required);
        },
    },

    watch: {
        values: {
            deep: true,
            handler(newValues) {
                this.skuCustomized = !!Object.values(newValues)
                    .filter(value => !!value.length).length;
            },
        },
    },

    methods: {
        updateAllCustomizations(value) {
            this.sku.customizations.data.forEach(customization => {
                this.setCustomizationValue(customization, value, false);
            });
        },

        handlePickedOption(optionPicked) {
            this.showContent = optionPicked;

            if (optionPicked) {
                this.updateAllCustomizations('');
            } else {
                this.updateAllCustomizations('');
            }
        },

        hasErrorInCustomizations() {
            this.customizations.forEach(customization => {
                this.checkValues(customization, this.values);
            });
        },

        getInvalidCustomizations() {
            if (this.customizations.length === 0) {
                return;
            }

            const emptyCustomizations = this.customizations
                .filter(customization => _.isEmpty(this.values[customization.id]));

            // all are empty, we don't need to check
            if (
                this.sku.allow_sell_without_customization
                && emptyCustomizations.length === this.customizations.length
                && !this.showContent
            ) {
                return;
            }

            // all empty are not required
            if (emptyCustomizations.every(customization => !customization.required)) {
                return;
            }

            // mark required and not filled as mandatory field
            return emptyCustomizations.filter(customization => customization.required);
        },
    },
};
</script>
