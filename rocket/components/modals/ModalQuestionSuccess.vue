<template>
    <Modal
        ref="questionBaseModal"
        name="question-success"
    >
        <i class="icon icon-success" />

        <div class="theme-title modal-success-title">
            Recebemos sua dúvida
        </div>

        <div class="modal-success-subtitle">
            Enviaremos uma resposta no e-mail <br>
            cadastrado assim que possível.
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
    name: 'ModalQuestion',

    methods: {
        showModal() {
            this.$refs.questionBaseModal.showModal();
        },

        closeModal() {
            this.$refs.questionBaseModal.closeModal();
        },
    },
};
</script>
