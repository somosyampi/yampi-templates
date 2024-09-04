<template>
    <modal
        ref="newsletterBaseModal"
        name="newsletter"
    >
        <i class="icon icon-success"></i>
        <div class="theme-title modal-success-title">
            Sucesso!
        </div>

        <div class="modal-success-subtitle">
            Seu e-mail foi cadastrado.
        </div>

        <button class="btn btn-secundary -success" @click="closeModal">Fechar</button>
    </modal>
</template>

<script>
import Modal from '@/components/generic/Modal';

export default {
    name: 'ModalNewsletter',

    components: { Modal },

    methods: {
        showModal() {
            this.$refs.newsletterBaseModal.showModal();
        },

        closeModal() {
            this.$refs.newsletterBaseModal.closeModal();
        },
    },
};
</script>
