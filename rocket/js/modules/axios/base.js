import axios from 'axios';
import qs from 'qs';

axios.defaults.paramsSerializer = param => qs.stringify(param, { encode: false });

export default axios;
