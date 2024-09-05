<template>
    <modal
        ref="reviewBaseModal"
        name="review"
        title="Avalie o produto"
    >
        <template #subtitle>
            {{ product.name }}
        </template>

        <form ref="ReviewFormRef">
            <label for="review-rating">QUANTIDADE DE ESTRELAS</label>

            <br>

            <i
                v-for="index in times(5)"
                :key="index"
                class="icon"
                :class="`icon-star-${index < form.rating ? 'gold' : 'grey'}`"
                @click="form.rating = index + 1"
            />

            <br>

            <label
                class="custom-margin"
                for="review-name"
            >NOME</label>
            <input
                id="review-name"
                v-model="form.name"
                type="text"
                name="name"
                :class="{ error: hasError('name') }"
                placeholder="Ex.: Adriana"
                maxlength="60"
            >
            <ErrorText :text="getError('name')" />

            <label for="review-email">E-MAIL</label>
            <input
                id="review-email"
                v-model="form.email"
                type="email"
                name="email"
                :class="{ error: hasError('email') }"
                placeholder="Ex.: adriana@gmail.com"
            >
            <ErrorText :text="getError('email')" />

            <label for="review-message">AVALIAÇÃO</label>

            <textarea
                id="review-message"
                v-model="form.message"
                type="text"
                name="review"
                :class="{ error: hasError('message') }"
                placeholder="Escreva o que você achou deste produto..."
                rows="4"
                maxlength="250"
            />

            <CharacterLimitText
                class="text-left inline-block"
                :limit="250"
                :current-text-length="form.message.length"
            />

            <ErrorText :text="getError('message')" />

            <image-selector
                ref="ImageUploader"
                amount="3"
                :images-urls="form.images"
                @changeImageUrls="handleImageUrls"
                @uploading="handleUploading"
            />

            <div class="alert -yellow">
                • Sua avaliação está sujeita à aprovação por nossa equipe <br>
                • Seus dados não serão divulgados <br>
                • Não publicaremos termos ofensivos ou de baixo calão.
            </div>

            <div v-if="showError" class="alert -red">
                <b>Opa! Você está enviando muitas avaliações seguidas.</b><br>
                Aguarde 1 minuto para enviar mais.
            </div>
        </form>

        <template slot="footer">
            <loader-button
                class="btn -block btn-secundary"
                :sending="sending"
                :disabled="uploading"
                @click="submit"
            >
                Enviar avaliação
            </loader-button>
        </template>
    </modal>
</template>

<script>
import { mapGetters } from '~vuex';
import rocket from '@/modules/axios/rocket';
import errorsMixin from '@/mixins/errors';
import trackingByApi from '@/mixins/tracking/api';
import _ from '~lodash';

export default {
    name: 'ModalReview',

    mixins: [
        errorsMixin,
        trackingByApi,
    ],

    data: () => ({
        sending: false,
        form: {
            name: '',
            email: '',
            message: '',
            rating: 5,
            images: [],
        },
        uploading: false,
        showError: false,
    }),

    computed: {
        ...mapGetters('product', [
            'product',
        ]),
    },

    methods: {
        times: _.times,

        handleUploading(status) {
            this.uploading = status;
        },

        handleImageUrls({ event, imageNumber, imageUrl }) {
            return {
                DELETE: () => {
                    this.form.images.splice(imageNumber, 1);
                },
                APPEND: () => {
                    if (this.form.images.length < 3) {
                        const index = this.form.images.length ? _.lastIndexOf(this.form.images) : 0;
                        this.$set(this.form.images, index, imageUrl);
                    }
                },
            }[event]();
        },

        showModal() {
            this.resetForm();
            this.$refs.reviewBaseModal.showModal();

            this.handleTrackApi('product-review-intended');
        },

        closeModal() {
            this.$refs.reviewBaseModal.closeModal();
            this.$nextTick(() => this.resetForm());
        },

        resetForm() {
            this.form = {
                name: '',
                email: '',
                message: '',
                rating: 5,
                images: [],
            };
        },

        async submit() {
            this.sending = true;

            try {
                const submittableForm = { ...this.form };
                submittableForm.images = _.compact(submittableForm.images);

                await rocket.post(`products/${this.product.id}/reviews`, submittableForm);

                this.closeModal();

                this.handleTrackApi('product-review-entered', {
                    'photo-entered': this.form.images.length,
                    'review-grade': this.form.rating,
                });

                this.$emit('success');
            } catch (e) {
                if (e.response.status === 429) {
                    this.showError = true;
                }

                this.setErrorsFromResponse(e);
            } finally {
                this.sending = false;
            }
        },
    },
};
</script>
