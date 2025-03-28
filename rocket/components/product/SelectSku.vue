<template>
    <div class="sku-select">
        <p
            v-if="variations.length"
            class="helper-text"
            :class="{ '-error': selectWithErrors }"
        >
            Selecione uma opção
        </p>

        <div
            v-for="(variation, index) in variations"
            :key="variation.id"
            :class="variationsStyle"
            class="sku-option"
        >
            <label
                :for="`${variation.id}-${variation.name}`"
                v-text="variation.name"
            />

            <component
                :is="variationsSelectStyle"
                :id="`${variation.id}-${variation.name}`"
                ref="customSelect"
                :name="`${variation.id}-${variation.name}`"
                :value="selected[index]"
                :disabled="index > 0 && selected[index - 1] === 0"
                :error="selectWithErrors"
                :options="options[index]"
                @change="updateSelected(index, $event)"
            >
                <template v-if="variationsStyle === 'list'">
                    <option :value="0">
                        Selecionar...
                    </option>
                    <option
                        v-for="option in options[index]"
                        :key="option.id"
                        :value="option.id"
                        @click="updateVariation(option.id)"
                        v-text="option.value"
                    />
                </template>
            </component>
        </div>
    </div>
</template>

<script>
import _ from '~/lodash';
import productMixin from '@/mixins/product';
import { smoothScroll } from '@/mixins/helpers';

export default {
    name: 'SelectSku',

    mixins: [productMixin],

    props: {
        shouldScrollOnError: {
            type: Boolean,
            default: true,
        },

        variationsStyle: {
            type: String,
            default: 'list',
        },
    },

    data: () => ({
        selected: [],
        options: [],
        selectWithErrors: false,
    }),

    computed: {
        variations() {
            return _.get(this.validProduct, 'variations.data', []);
        },

        skus() {
            return _.get(this.validProduct, 'skus.data', []);
        },

        variationsSelectStyle() {
            const mapComponents = {
                list: 'custom-select',
                buttons: 'variant-button',
            };

            return mapComponents[this.variationsStyle];
        },
    },

    watch: {
        validProduct() {
            this.bootSelected();
        },
    },

    mounted() {
        this.bootSelected();
    },

    methods: {
        smoothScroll,

        bootSelected() {
            this.selected = _.times(this.variations.length, _.constant(0));

            if (this.variationsStyle === 'list' || this.variations.length === 1) {
                this.options = _.times(this.variations.length, () => ([]));

                this.loadOptions();

                return;
            }

            this.options = this.variations.map(variation => variation.values.data);
        },

        updateSelected(index, value) {
            this.selectWithErrors = false;

            this.$set(this.selected, index, value);

            for (let i = index + 1; i < this.variations.length; i++) {
                // clear the next options
                this.$set(this.selected, i, 0);
            }

            if (index < this.variations.length - 1) {
                this.loadOptions(index + 1);
            }

            this.checkIfValidSkuSelected();
        },

        updateVariation(optionId) {
            const skuData = this.product.skus;

            if (skuData === undefined) {
                return;
            }

            for (const item of this.product.skus.data) {
                for (const variation of item.variations) {
                    if (variation.value_id === optionId) {
                        this.$emit('updateVariation', {
                            imageUrl: item.images.data[0].url,
                            productId: item.product_id,
                        });

                        return;
                    }
                }
            }
        },

        checkIfValidSkuSelected() {
            if (this.selected.some(item => item === 0)) {
                return this.$emit('update');
            }

            const selectedSku = this.skus.find(sku => {
                const combinations = sku.combinations.split('-').map(item => parseInt(item, 10));

                return _.isEqual(_.sortBy(this.selected), _.sortBy(combinations));
            });

            return this.$emit('update', selectedSku);
        },

        loadOptions(index = 0) {
            const optionsValue = this.variationsStyle === 'list'
                ? this.filterVariationOptions(index)
                : this.mapUnavailableVariationOptions(index);
            this.$set(this.options, index, optionsValue);
        },

        mapUnavailableVariationOptions(index) {
            const options = this.variations[index].values.data;

            return options.map(option => {
                option.unavailable = false;

                if (option.blocked_sale === 1
                || !this.skus.some(sku => this.skuHasOption(sku, option))) {
                    option.unavailable = true;
                }

                return option;
            });
        },

        filterVariationOptions(index) {
            const options = _.get(this.variations, `${index}.values.data`, []);
            let optionsNoCache = [];

            optionsNoCache = this.availabilitySkuVariationsWithoutCache(options);

            if (index === 0) {
                return optionsNoCache.filter(option => option.blocked_sale != true);
            }

            return optionsNoCache.filter(option => {
                if (option.blocked_sale === true || options.blocked_sale === 1) {
                    return false;
                }

                // check if we have any sku with this option
                return this.skus.some(sku => this.skuHasOption(sku, option));
            });
        },

        availabilitySkuVariationsWithoutCache(options) {
            const result = [];

            for (const option of options) {
                let isOptionBlocked = true;

                for (const sku of this.skus) {
                    const hasMatchingVariation = sku.variations.some(variation => variation.value_id === option.id && sku.blocked_sale == false);

                    if (hasMatchingVariation) {
                        isOptionBlocked = false;
                        break;
                    }
                }

                option.blocked_sale = isOptionBlocked;
                result.push(option);
            }

            return result;
        },

        skuHasOption(sku, option) {
            if (sku.blocked_sale) {
                return false;
            }

            const combinations = sku.combinations.split('-').map(item => parseInt(item, 10));

            const partialCombination = [
                ...this.selected.filter(item => item), // get only valid selected ids
                option.id,
            ];

            return _.difference(partialCombination, combinations).length === 0;
        },

        verifySelect() {
            // validate all elements
            // this.$refs.customSelect.forEach(element => (element.error = !element.value));
            const invalidSelects = this.$refs.customSelect
                .filter(element => !element.selectedValue);

            // check if any element has error
            this.selectWithErrors = !!invalidSelects.length;

            if (this.selectWithErrors && this.shouldScrollOnError) {
                this.smoothScroll(document.body, 0, this.$el.offsetTop - (window.innerHeight / 6));
            }

            return this.selectWithErrors;
        },
    },
};
</script>
