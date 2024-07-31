<template>
    <modal
        ref="zipcodeBaseModal"
        name="zipcode"
        title="Simular frete"
    >
        <template slot="subtitle">
            Para o cep
            <span class="selected-zipcode">{{ firstQuote.zipcode | mask('#####-###') }}</span>
            <span class="-divisor"> | </span>
            <span class="selected-city">{{ firstQuote.city }} - {{ firstQuote.uf }}</span>
        </template>

        <table class="table">
            <tr>
                <th>Tipo</th>
                <th>Prazo</th>
                <th>Valor</th>
            </tr>

            <tr
                v-for="(quote, key) in data"
                :key="quote.quote_id"
            >
                <td>{{ quote.service_display_name }}</td>
                <td>{{ quote.formated_delivery_time }}</td>
                <td class="price">{{ quote.formated_price }}</td>
            </tr>
        </table>

        <div class="disclaimer">
            Prazo de entrega a partir da aprovação de pagamento <span class="display-hibrid">e envio ao operador logístico.</span>
        </div>
    </modal>
</template>

<script>
import _find from 'lodash/find';
import _trimEnd from 'lodash/trimEnd';
import Modal from '@/components/generic/Modal';

export default {
    name: 'ModalZipcode',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        Modal,
    },

    data: () => ({
        subtitle: '',
    }),

    computed: {
        firstQuote() {
            return _find(this.data) || {};
        },
    },

    methods: {
        showModal() {
            this.$refs.zipcodeBaseModal.showModal();
        },

        closeModal() {
            this.$refs.zipcodeBaseModal.closeModal();
        },
    }
}
</script>
