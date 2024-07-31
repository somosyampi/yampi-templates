import Vuex from 'vuex';
import cart from './modules/cart';
import environment from './modules/environment';
import filters from './modules/filters';
import merchant from './modules/merchant';
import pixels from './modules/pixels';
import preview from './modules/preview';
import product from './modules/product';
import queryParams from './modules/queryParams';
import screen from './modules/screen';
import theme from './modules/theme';
import buyTogether from './modules/buy-together';
import queue from './modules/queue';
import header from './modules/header';
import images from './modules/images';

export default new Vuex.Store({
    modules: {
        cart,
        environment,
        filters,
        merchant,
        pixels,
        preview,
        product,
        queryParams,
        screen,
        theme,
        queue,
        buyTogether,
        header,
        images,
    },
});
