<template>
    <Modal
        ref="newsletterBaseModal"
        name="newsletter"
    >
        <i class="icon icon-success" />
        <div class="theme-title modal-success-title">
            Sucesso!
        </div>

        <div class="modal-success-subtitle">
            Seu e-mail foi cadastrado.
        </div>

        <button
            class="btn btn-secundary -success"
            @click="closeModal"
        >
            Fechar
        </button>
    </Modal>
</template>

<script>

export default {
    name: 'ModalNewsletter',

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
