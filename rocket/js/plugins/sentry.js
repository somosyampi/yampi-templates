import _get from 'lodash/get';

import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

export default {
    install (Vue) {
        const config = window.Yampi.sentry;

        if (!_get(config, 'enabled') || !_get(config, 'dsn')) {
            return;
        }

        Sentry.init({
            Vue: Vue,
            dsn: window.Yampi.sentry.dsn,
            integrations: _get(config, 'tracing') ? [new Integrations.BrowserTracing()] : [],
            tracesSampleRate: 1.0,
            tracingOptions: {
                trackComponents: true,
            },
        });

        Vue.prototype.$sentry = Sentry;
    },
};
