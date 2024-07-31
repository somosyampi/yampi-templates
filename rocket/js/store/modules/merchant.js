export default {
    namespaced: true,

    state: {
        merchant: window.merchant,
    },

    getters: {
        merchant: state => state.merchant,
        defaultCard: (state, getters) => {
            if (!state.merchant.payments.length) {
                return null;
            };

            let [defaultPaymentMethod] = state.merchant.payments.filter(
                payment => payment.alias === (state.merchant.checkout.default_card),
            );

            if (defaultPaymentMethod) {
                return defaultPaymentMethod;
            }

            [defaultPaymentMethod] = getters.creditCardOnly;

            return defaultPaymentMethod;
        },
        creditCardOnly: state => state.merchant.payments.filter(payment => !['pix', 'billet', 'deposit', 'pix_in_installments', 'nupay'].includes(payment.alias)),
    },

    actions: {

    },

    mutations: {

    },
};
