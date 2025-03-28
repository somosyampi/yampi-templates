<template>
    <div>
        <div
            v-for="kit_id in Object.keys(buyTogetherItems)"
            :key="kit_id"
            class="buy-together-cart-group__container"
        >
            <div class="buy-together-cart-group-title">
                Compre Junto
            </div>
            <div
                class="side-cart-remove"
                @click="() => $emit('removeCombo', {
                    kitId: kit_id,
                    totalPrice: finalPrices[kit_id]
                })"
            >
                <div>
                    <Trashcan />
                </div>
                <div class="remove-text">
                    Remover Tudo
                </div>
            </div>
            <div
                v-for="item in buyTogetherItems[kit_id]"
                :key="item.id"
                :class="{
                    loading: loading[item.id],
                    '-vcenter': item.kit_id
                }"
            >
                <ProductCartBox
                    :product="item"
                    :show-product-total-price="false"
                    :show-cart-savings="false"
                />
            </div>

            <div class="buy-together-total-value">
                <div class="row">
                    <div class="text discount-original-value">
                        {{ totalPrices[kit_id] | formatMoney }}
                    </div>
                    <div class="text after-discount-value">
                        {{ finalPrices[kit_id] | formatMoney }}
                    </div>
                </div>
                <div class="row discount-percent">
                    Desconto (-{{ (totalPrices[kit_id] - finalPrices[kit_id]) | formatMoney }})
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from '~/vuex';
import _ from '~/lodash';

export default {
    name: 'BuyTogetherCartGroup',

    props: {
        buyTogetherItems: {
            type: Object,
            required: true,
        },

        loading: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            totalPrices: {},
            finalPrices: {},
            totalDiscounts: {},
            comboByKitId: {},
        };
    },

    computed: {
        ...mapGetters('buyTogether', ['combos']),
    },

    watch: {
        combos: {
            handler() {
                this.calculateDiscountForAll();
            },
        },
    },

    mounted() {
        this.calculateDiscountForAll();
    },

    methods: {
        calculateDiscountForAll() {
            Object.keys(this.buyTogetherItems).forEach(kitId => this.getDiscount(kitId));
        },

        getTotalPrice(kitId) {
            return this.buyTogetherItems[kitId].reduce(
                (totalPrice, n) => totalPrice + Number(n.price),
                0,
            );
        },

        getCombo(kitId) {
            if (this.combos.length > 0) {
                this.comboByKitId[kitId] = _.omit(
                    this.combos.filter(combo => combo.id === parseInt(kitId, 10))[0],
                    ['products'],
                );

                this.cacheCombo(this.comboByKitId);

                return this.comboByKitId[kitId];
            }

            this.hydrateCombo();

            return this.comboByKitId[kitId];
        },

        getFinalPrice({ kitId, actualCombo }) {
            return actualCombo.discount_type === 'p'
                ? (1 - actualCombo.discount_value / 100) * this.getTotalPrice(kitId)
                : this.getTotalPrice(kitId) - actualCombo.discount_value;
        },

        getTotalDiscount({ kitId, actualCombo }) {
            return actualCombo.discount_type === 'p'
                ? (actualCombo.discount_value / 100) * this.getTotalPrice(kitId)
                : actualCombo.discount_value;
        },

        cacheCombo(data) {
            localStorage.setItem('buyTogetherCartGroupCombo', JSON.stringify(data));
        },

        hydrateCombo() {
            this.comboByKitId = JSON.parse(localStorage.getItem('buyTogetherCartGroupCombo'));
        },

        getDiscount(kitId) {
            const actualCombo = this.getCombo(kitId);

            if (!actualCombo) {
                return;
            }

            this.finalPrices = {
                ...this.finalPrices,
                [kitId]: this.getFinalPrice({ kitId, actualCombo }),
            };

            this.totalDiscounts = {
                ...this.totalDiscount,
                [kitId]: this.getTotalDiscount({ kitId, actualCombo }),
            };
            this.totalPrices = { ...this.totalPrices, [kitId]: this.getTotalPrice(kitId) };
        },
    },
};
</script>
