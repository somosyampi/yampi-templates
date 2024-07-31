import axios from './base';

const rocket = axios.create({
    baseURL: window.location.origin || `${window.location.protocol}//${window.location.hostname}`,
    headers: {
        'X-CSRF-TOKEN': window.Yampi.csrf_token,
    },
});

export default rocket;
