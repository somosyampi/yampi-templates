<script>
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _times from 'lodash/times';
import _constant from 'lodash/constant';
import errorsMixin from '@/mixins/errors';

export default {
    name: 'BaseCustomization',

    mixins: [errorsMixin],

    data: () => ({
        values: {},
        priceSum: 0,
        customization: {},
        showContent: false,
    }),

    computed: {
        allOptional() {
            return this.customizations.every(
                customization => !customization.required,
            );
        },

        customizations() {
            return _get(this.sku, 'customizations.data', []);
        },

        hasCustomizations() {
            return !_isEmpty(this.customizations);
        },
    },

    watch: {
        values: {
            deep: true,
            handler() {
                this.calculateSum(this.customizations);
                this.$emit('change', this.values);
            },
        },

        sku: {
            immediate: true,
            handler() {
                this.showContent = !_get(
                    this.sku,
                    'allow_sell_without_customization',
                    true,
                );
            },
        },
    },

    methods: {
        getMask(customization) {
            const tests = {
                letters: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{} ]/,
                numbers: /[0-9 ]/,
                all: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{}0-9 ]/,
            };

            return _times(
                customization.max_chars,
                _constant(tests[customization.allowed_values]),
            );
        },

        calculateSum(customizations) {
            this.priceSum = customizations.reduce((acc, customization) => {
                let tempAcc = acc;
                if (this.values[customization.id]) {
                    tempAcc += customization.price;
                }

                return tempAcc;
            }, 0);
        },

        setCustomizationValue(customization, payload, checkError = false) {
            this.$set(this.values, customization.id, payload);

            if (checkError) {
                this.checkValues(customization, this.values);
            }
        },

        checkValues(context = undefined, values) {
            if (!context) {
                this.clearErrors();
            } else {
                this.setError(context.id, '');
            }

            const invalidCustomizations = this.getInvalidCustomizations(values);

            if (_isEmpty(invalidCustomizations)) {
                return true;
            }

            invalidCustomizations.forEach(customization => {
                if (!context || _get(context, 'id') === customization.id) {
                    this.setError(customization.id, 'Campo obrigatório');
                }
            });

            return false;
        },

        getInvalidCustomizations(values) {
            if (this.customizations.length === 0) {
                return [];
            }

            const emptyCustomizations = this.customizations.filter(
                customization => _isEmpty(values[customization.id]),
            );

            // all are empty, we don't need to check
            if (
                this.sku.allow_sell_without_customization
                && emptyCustomizations.length === this.customizations.length
                && !this.showContent
            ) {
                return [];
            }

            // all empty are not required
            if (
                emptyCustomizations.every(
                    customization => !customization.required,
                )
            ) {
                return [];
            }

            // mark required and not filled as mandatory field
            return emptyCustomizations.filter(
                customization => customization.required,
            );
        },
    },
};
</script>
