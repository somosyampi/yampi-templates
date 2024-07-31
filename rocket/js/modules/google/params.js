import { asArray } from '@/mixins/helpers';

const CURRENCY = 'BRL';

function money(value) {
    return parseFloat(value.toFixed(2));
}

const eventParams = {
    getDiscountValue(items, totalPrice) {
        return totalPrice - items.reduce(
            (itemsTotalPrice, item) => itemsTotalPrice + item.price,
            0,
        );
    },

    getDiscountByItems(totalPrice, items, totalDiscount) {
        const totalItems = items.length;

        if (!totalItems || totalDiscount >= 0) {
            return [];
        }

        const discounts = [];
        const discountPercentage = Math.abs(totalDiscount) / totalPrice;
        let discountsLeft = Math.abs(money(totalDiscount));

        for (let i = 1; i <= totalItems; i++) {
            const discount = (i < totalItems)
                ? items[i - 1].price * discountPercentage
                : discountsLeft;

            discounts.push(money(discount));
            discountsLeft = money(discountsLeft - discount);
        }

        return discounts;
    },

    getCategoriesAsParams(product) {
        const categoriesNames = product?.categories_names
            || product?.categories?.data.map(category => category.name);

        return this.transformCategoriesIntoParams(categoriesNames);
    },

    getBaseCurrencyParam(value) {
        return value ? {
            currency: CURRENCY,
            value: money(value),
        } : {};
    },

    getTargetAccountParam() {
        return {
            send_to: 'storeAnalytics',
        };
    },

    getItemsParam(options, products, quantities, totalPrice) {
        const items = this.transformItemsIntoParams(options, products, quantities);
        const discounts = this.getDiscountByItems(
            totalPrice,
            items,
            this.getDiscountValue(items, totalPrice),
        );

        return {
            ...this.getTargetAccountParam(),
            ...this.getBaseCurrencyParam(totalPrice),
            items: this.transformItemsWithDiscounts(items, discounts),
        };
    },

    transformItemsWithDiscounts(items, discounts) {
        if (!items.length || items.length !== discounts.length) {
            return items;
        }

        return items.map((item, key) => {
            item.discount = discounts[key];

            return item;
        });
    },

    transformCategoriesIntoParams(categoriesNames) {
        if (!Array.isArray(categoriesNames)) {
            return {};
        }

        const categories = {};

        categoriesNames
            .slice(0, 5)
            .forEach((category, index) => {
                const keyName = `item_category${(index ? index + 1 : '')}`;

                categories[keyName] = category;
            });

        return categories;
    },

    transformItemsIntoParams(options, products, quantities) {
        const items = [];

        options = asArray(options);
        products = asArray(products);

        options.forEach((option, index) => {
            const product = products[index] || products?.data[index];
            const quantity = quantities[index];

            items.push({
                item_id: option.option_id || option.id,
                item_name: option.name || option.title,
                item_brand: product?.brand?.name || product?.brand?.data?.name || '',
                item_variant: option.sku,
                price: parseFloat(option?.price || option?.prices?.data?.price || 0),
                quantity,
                ...this.getCategoriesAsParams(product),
            });
        });

        return items;
    },
};

export default eventParams;
