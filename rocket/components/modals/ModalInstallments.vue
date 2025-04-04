<template>
    <Modal
        ref="installmentsBaseModal"
        name="installments"
        title="Parcelamento"
        :scrollable="true"
        @close="cleanData"
    >
        <template slot="subtitle">
            {{ product.name }}
        </template>

        <div style="margin-bottom: 34px;">
            <div class="select-title">
                BANDEIRA
            </div>
            <CustomSelect
                :value="selectedAlias"
                :icon-url="iconUrl"
                @change="handleSelectCard"
            >
                <option
                    v-for="{ name, alias } in creditCardOnly"
                    :key="name"
                    :value="alias"
                    v-text="name"
                />
            </CustomSelect>
        </div>
        <div>
            <Loader
                v-if="loading"
                :height="50"
                :margin="13"
            />

            <div v-else>
                <div
                    v-if="get(installments, 'installments', []).length"
                    :class="{ '-loading': loading }"
                >
                    <div class="table-title">
                        Valores para 1 unidade do produto
                    </div>
                    <table class="table">
                        <tr>
                            <th>Nº parcela</th>
                            <th>Valor da parcela</th>
                            <th>Total do produto</th>
                        </tr>

                        <tr
                            v-for="installment in installments.installments"
                            :key="installment.installment_value"
                        >
                            <td>{{ installment.installment }}</td>
                            <td>{{ cleanText(installment.text) }}</td>
                            <td>{{ installment.amount_formated }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
import _ from '~/lodash';
import BaseInstallments from '@/components/product/installments/BaseInstallments.vue';

export default {
    name: 'ModalInstallments',

    extends: BaseInstallments,

    props: {
        product: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            selected: [],
        };
    },

    computed: {
        selectedCard() {
            return this.selected.length
                ? this.selected[0]
                : this.defaultCard;
        },

        iconUrl() {
            return this.selectedCard?.icon_url || '';
        },

        selectedAlias() {
            return this.selectedCard?.alias || '';
        },
    },

    watch: {
        product() {
            this.handleSelectCard(this.selectedAlias);
        },
    },

    created() {
        this.handleSelectCard(this.selectedAlias);
    },

    methods: {
        get: _.get,

        async handleSelectCard(selectedCardAlias) {
            try {
                if (!selectedCardAlias) {
                    return;
                }

                this.selected = this.merchant.payments.filter(
                    payment => payment.alias === selectedCardAlias,
                );

                this.installments = await this.handleInstallments(
                    selectedCardAlias,
                );
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },

        showModal() {
            this.$refs.installmentsBaseModal.showModal();
        },

        cleanData() {
            this.selected = [];
            this.handleSelectCard(this.selectedAlias);
        },

        closeModal() {
            this.$refs.installmentsBaseModal.closeModal();
        },

        cleanText(text) {
            return _.trimEnd(text, ' *');
        },
    },
};
</script>
