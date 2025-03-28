<template>
    <div class="main-product-shipping">
        <label for="zipcode">SIMULAR FRETE</label>

        <form
            id="form-zipcode"
            @submit.prevent="submit"
        >
            <div class="-holder relative">
                <input
                    v-model="zipcode"
                    v-mask="'#####-###'"
                    data-1p-ignore
                    type="tel"
                    name="zipcode"
                    placeholder="Ex.: 00000-000"
                    :disabled="disabled"
                    :class="{ error: hasError('zipcode') }"
                >

                <LoaderButton
                    class="btn btn-secundary -small"
                    :sending="sending"
                    :disabled="disabled || !isValidCep"
                >
                    OK
                </LoaderButton>
            </div>

            <ErrorText :text="getError('zipcode')" />
        </form>

        <ModalZipcode
            ref="modalZipcode"
            :data="data"
        />
    </div>
</template>

<script>
import _ from '~/lodash';
import rocket from '@/modules/axios/rocket';
import errorsMixin from '@/mixins/errors';
import productMixin from '@/mixins/product';
import trackingByApi from '@/mixins/tracking/api';

export default {
    name: 'Zipcode',

    mixins: [
        errorsMixin,
        productMixin,
        trackingByApi,
    ],

    props: {
        quantity: {
            type: Number,
            default: 1,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        zipcode: window.Yampi.session.zipcode || '',
        sending: false,
        data: {},
    }),

    computed: {
        isValidCep() {
            return /^[0-9]{5}\-[\d]{3}$/.test(this.zipcode);
        },
    },

    methods: {
        showModal() {
            this.$refs.modalZipcode.showModal();
        },

        async submit() {
            this.sending = true;

            this.handleTrackApi('zipcode-entered', {
                location: 'product-page',
            });

            try {
                const total = this.validSku.prices.data.price;

                const { data } = await rocket.post(
                    `products/${this.validProduct.id}/shipping-costs`,
                    {
                        sku_id: this.validSku.id,
                        quantity: this.quantity,
                        zipcode: this.zipcode,
                        total: total * this.quantity,
                    },
                );

                this.data = _.get(data, 'data', {});

                if (Object.keys(this.data).length === 0) {
                    this.setError('zipcode', 'Ocorreu um erro ao cotar o frete');

                    return;
                }

                if (this.validProduct.custom_shipping) {
                    this.formatCustomShippingPrice();
                }

                this.showModal();
            } catch (e) {
                console.error(e);
                this.setError(
                    'zipcode',
                    _.get(e, 'response.data.message', 'Ocorreu um erro ao cotar o frete'),
                );
            } finally {
                this.sending = false;
            }
        },

        formatCustomShippingPrice() {
            const shippingOptions = Object.keys(this.data);
            let deliveryTime = 0;
            let city = '';
            let zipcode = '';
            let uf = '';
            shippingOptions.forEach(shippingOption => {
                if (this.data[shippingOption].delivery_time > deliveryTime) {
                    deliveryTime = this.data[shippingOption].delivery_time;
                    city = this.data[shippingOption].city;
                    zipcode = this.data[shippingOption].zipcode;
                    uf = this.data[shippingOption].uf;
                }
            });

            this.data = {
                CUSTOMIZADO: {
                    service_display_name: 'FRETE',
                    service_id: 'shipping_custom',
                    service_name: 'shipping_custom',
                    service_type_name: 'shipping_custom',
                    id: 'shipping_custom',
                    quote_id: 'shipping_custom',
                    real_price: this.validProduct.shipping_price,
                    formated_price: this.validProduct.shipping_price
                        ? this.$formatMoney(this.validProduct.shipping_price)
                        : 'Grátis',
                    delivery_time: deliveryTime,
                    formated_delivery_time: `até ${deliveryTime} dias úteis`,
                    zipcode,
                    city,
                    uf,
                },
            };
        },
    },
};
</script>
