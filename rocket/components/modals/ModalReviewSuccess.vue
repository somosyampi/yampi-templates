<template>
    <modal
        ref="reviewBaseModal"
        name="review-success"
    >
        <i class="icon icon-success"></i>

        <div class="theme-title modal-success-title">
            Avaliação enviada<br>
            com sucesso!
        </div>

        <button class="btn btn-secundary -success" @click="closeModal">Fechar</button>
    </modal>
</template>

<script>

export default {
    name: 'ModalReview',

    methods: {
        showModal() {
            this.$refs['reviewBaseModal'].showModal();
        },

        closeModal() {
            this.$refs['reviewBaseModal'].closeModal();
        }
    }
}
</script>
