import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default {
    data: () => ({
        errors: {},
    }),

    computed: {
        hasErrors() {
            return Object.keys(this.errors).reduce((acc, alias) => {
                if (this.errors[alias].length > 0) {
                    return true;
                }
                return acc;
            }, false);
        },
    },

    methods: {
        getError(alias) {
            return _get(this.errors, alias);
        },

        hasError(alias) {
            return !_isEmpty(this.errors[alias]);
        },

        setErrorsFromResponse(e) {
            this.errors = this.$mapWithKeys(
                _get(e, 'response.data.errors', {}),
                (value, key) => [key, value[0]],
            );
        },

        setError(alias, message) {
            this.$set(this.errors, alias, message);
        },

        clearErrors() {
            this.errors = {};
        },
    },
};
