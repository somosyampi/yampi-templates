<template>
    <Modal
        ref="stockNotificationsModal"
        name="stock-notifications"
    >
        <div class="flex flex-col -vcenter text-center">
            <i class="icon icon-success" />

            <div class="theme-title modal-success-title">
                Sucesso!
            </div>

            <div class="modal-success-subtitle">
                Você receberá um e-mail quando este produto estiver em estoque
            </div>

            <button
                class="btn btn-secundary -success"
                @click="closeModal"
            >
                Fechar
            </button>
        </div>
    </Modal>
</template>

<script>

export default {
    name: 'ModalStockNotificationsSuccess',

    methods: {
        showModal() {
            this.$refs.stockNotificationsModal.showModal();
        },

        closeModal() {
            this.$refs.stockNotificationsModal.closeModal();
        },
    },
};
</script>
