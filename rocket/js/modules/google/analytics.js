import events from './enums/events';
import eventParams from './params';
import { asArray } from '@/mixins/helpers';

function isEnabled() {
    return typeof gtag === 'function'
        && window?.merchant?.google?.analytics?.version === 4;
}

function dispatch(type, params) {
    if (!isEnabled()) {
        return;
    }

    // eslint-disable-next-line no-undef
    gtag('event', type, params);
}

const ga4 = {
    trackAddedItem(options, products, quantities, totalPrice) {
        dispatch(
            events.addToCart,
            eventParams.getItemsParam(options, products, quantities, totalPrice),
        );
    },

    trackRemovedItem(products, totalPrice) {
        products = asArray(products);
        totalPrice = totalPrice || products.reduce(
            (totalProductPrice, product) => totalProductPrice + product.price_total,
            0,
        );

        const quantities = products.map(product => product.quantity);

        dispatch(
            events.removeFromCart,
            eventParams.getItemsParam(products, products, quantities, totalPrice),
        );
    },

    trackViewItem(options, products, quantities, totalPrice) {
        dispatch(
            events.viewItem,
            eventParams.getItemsParam(options, products, quantities, totalPrice),
        );
    },
};

export default ga4;
