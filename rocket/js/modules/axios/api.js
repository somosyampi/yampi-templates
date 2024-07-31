import axios from './base';

const api = axios.create({
    baseURL: `${window.Yampi.api_domain}/v2/${window.merchant.alias}/public/`,
});

export default api;
