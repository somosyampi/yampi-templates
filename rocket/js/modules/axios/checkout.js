import axios from './base';
import _merge from 'lodash/merge';
import { utms } from '../../mixins/helpers';

const baseQueries = {
    store_token: window.merchant.checkout.store_token,
    cart_token: window.Yampi.cart_token,
    metadata: {
        source_platform: 'store_v2'
    }
};

const checkout = axios.create({
    transformRequest: [
        data => data && _merge(data, utms, baseQueries),
        ...axios.defaults.transformRequest,
    ],

    params: baseQueries,
});

export default checkout;
