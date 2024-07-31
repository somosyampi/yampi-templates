<template>
    <modal
        ref="questionBaseModal"
        name="question-success"
    >
        <i class="icon icon-success"></i>

        <div class="theme-title modal-success-title">
            Recebemos sua dúvida
        </div>

        <div class="modal-success-subtitle">
            Enviaremos uma resposta no e-mail <br>
            cadastrado assim que possível.
        </div>

        <button class="btn btn-secundary -success" @click="closeModal">Fechar</button>
    </modal>
</template>

<script>
import Modal from '@/components/generic/Modal';

export default {
    name: 'ModalQuestion',

    components: { Modal },

    methods: {
        showModal() {
            this.$refs['questionBaseModal'].showModal();
        },

        closeModal() {
            this.$refs['questionBaseModal'].closeModal();
        }
    }
}
</script>
