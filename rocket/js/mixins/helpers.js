/* eslint-disable */
import qs from 'qs';
import Vue from 'vue';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _pickBy from 'lodash/pickBy';
import _trim from 'lodash/trim';
import _trimStart from 'lodash/trimStart';
import _startsWith from 'lodash/startsWith';
import Store from '../store/index';
import ThumborUrlBuilder from '@/modules/thumborUrlBuilder';

export function createPriceObjects({ basePath, pricePath }) {
    const $priceObjectsDTO = (paymentMethod) => {
        if (pricePath !== 'price_formatted') {
            return pricePath;
        }

        return {
            pix: 'price_formatted',
            billet: 'price_formated',
            promotional: 'price_formated'
        }[paymentMethod];
    }

    return {
      pix: {
        path: `${basePath}pix.${$priceObjectsDTO('pix')}`,
        text: 'no Pix',
      },
      billet: {
        path: `${basePath}billet.${$priceObjectsDTO('billet')}`,
        text: 'no boleto',
      },
      promotional: {
        path: `${basePath}${$priceObjectsDTO('promotional')}`,
        text: '',
      },
    };
}

export function asArray(data) {
    return Array.isArray(data)
        ? data
        : [data];
}

export function getImageMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}

export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
        c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

export function getCookie (name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export const randomString = () => Math.random()
    .toString(36)
    .substring(7);

export const baseUrl = window.location.origin || `${window.location.protocol}//${window.location.hostname}`;

export const utms = _pickBy(window.Yampi.session, (value, key) => value && key.startsWith('utm_'));

export const queryParamsToString = query => qs.stringify(query, {
    format: 'RFC1738',
    encodeValuesOnly: true,
    arrayFormat: 'brackets',
});

export const mapWithKeys = (obj, fn) => Object
    .fromEntries(Object.entries(obj).map(([key, value], index) => fn(value, key, index)));

export const formatMoney = (value, withCurrency = true) => Number(value).toLocaleString('pt-br', {
    style: withCurrency ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

export const checkoutUrl = (url, withExtras = false) => {
    const urlObj = new URL(url);
    const baseUrl = `${urlObj.origin}${urlObj.pathname}`;

    if (withExtras) {
        return applyQueriesToUrl(baseUrl, {
            ...utms,
            store_token: window.merchant.checkout.store_token,
            cart_token: window.Yampi.cart_token,
        });
    }

    return baseUrl;
};

export const shopperUrl = (url, withExtras = false) => {
    const urlObj = new URL(url);
    const baseUrl = `${urlObj.origin}${urlObj.pathname}`;

    if (withExtras) {
        return applyQueriesToUrl(baseUrl, {
            ...utms,
            store_token: window.merchant.checkout.store_token,
        });
    }

    return baseUrl;
};

export const awaitTicks = async (ticks = 1, cb = () => false) => {
    let count = 0;

    do {
        await Vue.nextTick();
        count++;
    } while (cb() || count > ticks);
};

export const applyQueriesToUrl = (url, queries) => {
    const queryStrings = queryParamsToString(queries);

    if (!_isEmpty(queryStrings)) {
        return `${url}?${queryStrings}`;
    }

    return url;
};

export const thumborize = (src, thumbor = {}) => new ThumborUrlBuilder(src, thumbor).generate();

export const redirectTo = (url, allowPreview = false) => {
    if (!allowPreview && Store.getters['preview/isPreview']) {
        return;
    }

    window.location = url;
};

export const cleanString = str => (str || '').replace(/\0/g, '');

export const forceHttp = (url, useHttps = false) => {
    const protocol = useHttps ? 'https://' : 'http://';

    return _startsWith(url, 'http') ? url : `${protocol}${_trimStart(url, ':/')}`;
};

export const safeCleanLink = link => {
    link = _trim(cleanString(link), ' \t\n\r\0\x0B');

    if (
        !['http://', 'https://', '/', '://'].some(valid => _startsWith(link, valid))
    ) {
        link = forceHttp(link);
    }

    return link;
};

export const getCreditCardIconUrl = (paymentsData, _alias) => {
    if (!paymentsData.length) {
        return '';
    }

    return paymentsData.filter(({ alias }) => alias === _alias)[0].icon_url;
};

function ease(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
}

function step(context) {

    const SCROLL_TIME = 468;
    const time = Date.now();
    let value;
    let currentX;
    let currentY;
    let elapsed = (time - context.startTime) / SCROLL_TIME;
    // avoid elapsed times higher than one
    elapsed = elapsed > 1 ? 1 : elapsed;
    // apply easing to elapsed time
    value = ease(elapsed);
    currentX = context.startX + (context.x - context.startX) * value;
    currentY = context.startY + (context.y - context.startY) * value;
    context.method.call(context.scrollable, currentX, currentY);
    // scroll more if we have not reached our destination
    if (
        currentX.toFixed(2) !== context.x.toFixed(2)
        || currentY.toFixed(2) !== context.y.toFixed(2)
    ) {
        return new Promise((resolve) => {
            window.requestAnimationFrame(resolve)
        }).then(step.bind(window, context));
    } else {
        return Promise.resolve('FINISHED');
    }
}

function scrollElement(x, y) {
    this.scrollLeft = x;
    this.scrollTop = y;
}

export const smoothScroll = async (el, x, y) => {
    /*
        Generalization of SmoothScroll.vue
         Note: As scroll-behavior css property doesn't work for mobile this is necessary
         Some of this code was extract from https://github.com/iamdustan/smoothscroll
    */
    let scrollable;
    let startX;
    let startY;
    let method;
    const startTime = Date.now();

    // define scroll context
    if (el === document.body) {
        scrollable = window;
        startX = window.scrollX || window.pageXOffset;
        startY = window.scrollY || window.pageYOffset;
        method = window.scroll || window.scrollTo;
    } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
    }

    // scroll looping over a frame
    await step({
        scrollable,
        method,
        startTime,
        startX,
        startY,
        x,
        y,
    });
};

export const pageParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

export default {
    computed: {
        $baseUrl: () => baseUrl,
    },

    filters: {
        formatMoney,
    },

    methods: {
        $get: _get,
        $randomString: randomString,
        $queryParamsToString: queryParamsToString,
        $mapWithKeys: mapWithKeys,
        $formatMoney: formatMoney,
        $checkoutUrl: checkoutUrl,
        $shopperUrl: shopperUrl,
        $awaitTicks: awaitTicks,
        $applyQueriesToUrl: applyQueriesToUrl,
        $thumborize: thumborize,
        $redirectTo: redirectTo,
        $safeCleanLink: safeCleanLink,
        $forceHttp: forceHttp,
        $cleanString: cleanString,
        $getCreditCardIconUrl: getCreditCardIconUrl,
    },
};
