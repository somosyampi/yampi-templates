<template>
    <div class="holder-newsletter-form">
        <form
            id="form-newsletter"
            @submit.prevent="submit"
        >
            <label
                class="-hide"
                for="newsletter-email"
            >E-mail</label>
            <div class="holder-input">
                <input
                    id="newsletter-email"
                    v-model="email"
                    type="email"
                    name="newsletter-email"
                    :placeholder="placeholder"
                >

                <ErrorText :text="getError('email')" />
            </div>

            <LoaderButton
                class="btn btn-secundary"
                :sending="sending"
                :title="buttonText"
            />
        </form>

        <ModalNewsletter ref="modalNewsletter" />
    </div>
</template>

<script>
import errorsMixin from '@/mixins/errors';
import rocket from '@/modules/axios/rocket';
import trackingByApi from '@/mixins/tracking/api';

export default {
    name: 'Newsletter',

    mixins: [
        errorsMixin,
        trackingByApi,
    ],

    props: {
        placeholder: {
            type: String,
            default: 'Digite seu e-mail',
        },

        buttonText: {
            type: String,
            default: 'Cadastre-se',
        },
    },

    data: () => ({
        email: '',
        sending: false,
        modalSuccessOpened: false,
    }),

    methods: {
        async submit() {
            this.sending = true;
            this.clearErrors();

            try {
                await rocket.post('leads', {
                    email: this.email,
                });

                this.$refs.modalNewsletter.showModal();
                this.email = '';

                this.handleTrackApi('newsletter-inscribed');
            } catch (e) {
                console.error(e);
                this.setErrorsFromResponse(e);
            } finally {
                this.sending = false;
            }
        },
    },
};
</script>
