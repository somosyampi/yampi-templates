<template>
    <modal
        ref="questionBaseModal"
        name="question"
        title="Tire suas dúvidas"
    >
        <template slot="subtitle">
            {{ product.name }}
        </template>

        <form @submit.prevent="submit">
            <label for="question-username">NOME*</label>
            <input
                id="question-username"
                type="text"
                name="name"
                :class="{ error: hasError('name') }"
                placeholder="Ex.: Adriana"
                v-model="form.name"
            >
            <ErrorText :text="getError('name')"></ErrorText>

            <label for="question-email">E-MAIL*</label>
            <input
                id="question-email"
                type="text"
                name="email"
                :class="{ error: hasError('email') }"
                placeholder="Ex.: adriana@gmail.com"
                v-model="form.email"
            >
            <ErrorText :text="getError('email')"></ErrorText>

            <label for="question-message">DÚVIDA*</label>
            <textarea
                id="question-message"
                type="text"
                name="question"
                :class="{ error: hasError('message') }"
                placeholder="Escreva sua dúvida..."
                rows="4"
                v-model="form.message"
            ></textarea>
            <ErrorText :text="getError('message')"></ErrorText>

            <loader-button
                class="btn -block btn-secundary"
                :sending="sending"
            >
                Enviar dúvida
            </loader-button>
        </form>
    </modal>
</template>

<script>
import { mapGetters } from '~vuex';
import _ from '~lodash';
import rocket from '@/modules/axios/rocket';
import errorsMixin from '@/mixins/errors';

export default {
    name: 'ModalQuestion',

    mixins: [
        errorsMixin,
    ],

    data: () => ({
        sending: false,
        form: {
            name: '',
            email: '',
            message: '',
        },
    }),

    computed: {
        ...mapGetters('product', [
            'product',
        ]),
    },

    methods: {
        showModal() {
            this.resetForm();
            this.$refs.questionBaseModal.showModal();
        },

        closeModal() {
            this.$refs.questionBaseModal.closeModal();
            this.$nextTick(() => this.resetForm());
        },

        resetForm() {
            this.form = {
                name: '',
                email: '',
                message: '',
            };
        },

        async submit() {
            this.sending = true;

            try {
                await rocket.post(`products/${this.product.id}/questions`, this.form);

                this.closeModal();
                this.$emit('success');
            } catch (e) {
                this.setErrorsFromResponse(e);
            } finally {
                this.sending = false;
            }
        }
    }
}
</script>
