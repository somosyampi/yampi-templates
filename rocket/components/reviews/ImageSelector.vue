<template>
    <div>
        <div class="image-selector-label">
            Imagem do produto (opcional)
        </div>
        <div class="image-selector-container">
            <input-image
                v-for="n in parseInt(amount, 10)"
                :key="n"
                :item="n"
                :show-delete-button="!!(imagesUrls[n-1] && imagesUrls[n-1].length)"
                :disabled="checkIfDisabled(n)"
                :is-multiple="true"
                :limit="parseInt(amount, 10)"
                :uplodaded="imagesUrls.length"
                @change="(data) => handleChange(data)"
                @deleteImage="handleDelete"
            >
                <template #images>
                    <div
                        class="image-selector"
                        :class="{ 'disabled': checkIfDisabled(n) }"
                    >
                        <review-photo-loading-icon
                            v-if="loading[n-1]"
                        />

                        <review-photo-icon
                            v-else-if="!imagesUrls[n-1]"
                        />

                        <custom-image
                            v-else
                            class="review-thumb"
                            :src="imagesUrls[n-1]"
                        />
                    </div>
                </template>
            </input-image>
        </div>
    </div>
</template>

<script>
import _ from '~lodash';
import rocket from '@/modules/axios/rocket';

export default {
    name: 'ImageSelector',

    props: {
        amount: {
            type: [Number, String],
            required: true,
        },

        imagesUrls: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            loading: [false, false, false],
        };
    },

    computed: {
        lastIndexUrl() {
            return this.imagesUrls.length ? _.lastIndexOf(this.imagesUrls) : 0;
        },
    },

    methods: {
        handleDelete(imageNum) {
            this.$emit('changeImageUrls', { event: 'DELETE', imageNumber: imageNum - 1 });
        },

        checkIfDisabled(imageNum) {
            return this.imagesUrls.length < imageNum - 1;
        },

        async handleChange({ formData, formName }) {
            this.$emit('uploading', true);

            const missingUploadAmount = this.amount - this.imagesUrls.length;
            this.uploadedAmount = formData.getAll(formName).length;

            if (!this.uploadedAmount) return;

            if (!missingUploadAmount) return;

            for (let i = 0; i < this.uploadedAmount; i++) {
                if (this.lastIndexUrl + i <= this.amount) {
                    this.$set(this.loading, this.lastIndexUrl + i, true);
                }
            }

            const uploaded = await rocket({
                method: 'post',
                url: '/uploads',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { data: image } = uploaded;

            for (let i = 0; i < image.length; i++) {
                this.$emit('changeImageUrls', { event: 'APPEND', imageNumber: i, imageUrl: image[i] });
                this.$set(this.loading, this.lastIndexUrl - 1, false);
            }

            this.$emit('uploading', false);
        },
    },
};
</script>
