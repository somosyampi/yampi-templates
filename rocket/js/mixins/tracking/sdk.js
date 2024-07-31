import mixpanel from 'mixpanel-browser';

const mixpanelKey = window.Yampi.mixpanel.key;

if (mixpanelKey) {
    mixpanel.init(mixpanelKey);
}

export default {
    methods: {
        handleTrackSDK(event, options = {}) {
            const allOptions = {
                ...this.includeGlobalInfo(),
                ...options,
            };

            if (!mixpanelKey) {
                return;
            }

            mixpanel.track(event, allOptions);
        },

        includeGlobalInfo() {
            const merchant = this.$store.getters['merchant/merchant'];

            const info = {
                ambiente: window.Yampi.env,
                company_owner_name: merchant.company.name,
                merchant_alias: merchant.alias,
                merchant_id: merchant.id,
            };

            return info;
        },
    },
};
