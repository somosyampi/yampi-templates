<template>
    <Modal
        ref="stockNotificationsModal"
        name="stock-notifications"
        title="Avise-me quando chegar"
        @close="resetForm"
    >
        <p class="helper-text">
            Nós te avisaremos por e-mail quando este produto estiver novamente em nosso estoque.
        </p>

        <div class="mb-30">
            <div class="product">
                <CustomImage
                    v-if="sku.images.data.length"
                    class="-loading"
                    :src="sku.images.data[0].url"
                    :alt="sku.name"
                    :thumbor="{ resize: '60x60' }"
                />
                <div class="text">
                    <p class="name">
                        {{ sku.title }}
                    </p>
                </div>
            </div>
        </div>

        <form
            id="form-stock-notifications"
            @submit.prevent="submit"
        >
            <label for="stock-notifications-name">NOME</label>
            <div class="holder-input mb-24">
                <input
                    id="stock-notifications-name"
                    v-model="form.name"
                    type="text"
                    name="stock-notifications-name"
                    placeholder="Adriana"
                    :class="{ error: hasError('name') }"
                    @input="setError('name', '')"
                >

                <ErrorText :text="getError('name')" />
            </div>

            <label for="stock-notifications-email">E-MAIL</label>
            <div class="holder-input">
                <input
                    id="stock-notifications-email"
                    v-model="form.email"
                    type="email"
                    name="stock-notifications-email"
                    placeholder="Ex.: adriana@gmail.com"
                    :class="{ error: hasError('email') }"
                    @input="setError('email', '')"
                >

                <ErrorText :text="getError('email')" />
            </div>

            <LoaderButton
                :sending="sending"
                title="Entrar na lista de espera"
                class="btn btn-secundary -block mt-24 mb-16"
                type="submit"
            />
        </form>
    </Modal>
</template>

<script>
import errorsMixin from '@/mixins/errors';
import rocket from '@/modules/axios/rocket';
import trackingBySDK from '@/mixins/tracking/sdk';

export default {
    name: 'ModalStockNotifications',

    mixins: [
        errorsMixin,
        trackingBySDK,
    ],

    props: {
        sku: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            sending: false,
            form: {
                name: '',
                email: '',
            },
        };
    },

    methods: {
        showModal() {
            if (this.$refs.stockNotificationsModal) {
                this.$refs.stockNotificationsModal.showModal();
            }
        },

        closeModal() {
            this.$refs.stockNotificationsModal.closeModal();
        },

        resetForm() {
            this.form.name = '';
            this.form.email = '';
            this.clearErrors();
        },

        async submit() {
            this.sending = true;

            const formData = {
                sku_id: this.sku.id,
                ...this.form,
            };
            try {
                await rocket.post(`/products/${this.sku.product_id}/stock-notifications`, formData);

                this.handleTrackSDK('notify_when_available_subscribed');

                this.closeModal();
                this.$emit('success');
            } catch (error) {
                this.setErrorsFromResponse(error);
            } finally {
                this.sending = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.helper-text {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 15px;
}
.product {
    background-color: var(--default-background-color);
    border-radius: var(--theme-border-radius);
    display: flex;
    align-items: center;
    margin: 0 auto 31px;
    padding: 17px 19px;
    width: 100%;

    img {
        height: 60px;
        margin: 0 15px 0 0;
        width: 60px;
        border-radius: var(--mini-cart-product-border-radius);
    }

    .name {
        color: var(--color-general-primary);
        font-size: 14px;
        line-height: 1.15;
        font-weight: var(--font-medium);
        word-break: break-word;
    }
}
</style>
