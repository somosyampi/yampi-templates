<template>
    <label :for="`review-image-${item}`">
        <div
            v-if="showDeleteButton"
            class="review-image-delete-button"
            @click="handleDelete"
        >&times; </div>

        <div class="images-selector">
            <slot name="images" />
        </div>

        <input
            :id="`review-image-${item}`"
            ref="inputFile"
            class="image-selector-input"
            type="file"
            :name="formName"
            :multiple="isMultiple"
            accept="image/jpg, image/png, image/jpeg"
            :disabled="disabled"
            @change="handleChange"
        >
    </label>
</template>

<script>
export default {
    name: 'InputImage',

    props: {
        item: {
            type: Number,
            required: true,
        },

        showDeleteButton: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        isMultiple: {
            type: Boolean,
            default: false,
        },

        limit: {
            type: Number,
            default: 1,
        },

        uplodaded: {
            type: Number,
            required: true,
        },
    },

    computed: {
        formName() {
            return this.isMultiple ? 'file[]' : 'file';
        },
    },

    methods: {
        resize(settings) {
            const { file } = settings;

            const { maxSize } = settings;
            const reader = new FileReader();
            const image = new Image();
            const canvas = document.createElement('canvas');
            const dataURItoBlob = dataURI => {
                const bytes = dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
                const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
                const max = bytes.length;
                const ia = new Uint8Array(max);
                for (let i = 0; i < max; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ia], { type: mime });
            };
            const resize = () => {
                let { height, width } = image;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg');

                const blob = dataURItoBlob(dataUrl);

                return new File([blob], file.name);
            };
            return new Promise((ok, no) => {
                if (!file.type.match(/image.*/)) {
                    no(new Error('Not an image'));
                    return;
                }
                reader.onload = readerEvent => {
                    image.onload = () => ok(resize());
                    image.src = readerEvent.target.result;
                };
                reader.readAsDataURL(file);
            });
        },

        async appendNewImage(files) {
            const fileResizing = [];
            const formData = new FormData();

            const missingPhotos = this.limit - this.uplodaded;

            const allowedLength = files.length <= missingPhotos
                ? files.length : missingPhotos;

            for (let i = 0; i < allowedLength; i++) {
                fileResizing.push(this.resize({ file: files[i], maxSize: 2048 }));
            }

            await Promise.all(fileResizing).then(images => {
                for (let i = 0; i < images.length; i++) {
                    formData.append(this.formName, images[i]);
                }
            });

            return formData;
        },

        async handleChange(e) {
            const { files } = e.target || e.dataTransfer;

            const imageResize = await this.appendNewImage(files);

            this.$emit('change', {
                formData: imageResize,
                formName: this.formName,
            });
        },

        deleteInputFromClosingModal() {
            this.$refs.inputFile.value = null;
            this.dialog = '';
            this.imgSrc = '';
            this.fileName = '';
            this.imgUrl = '';
            this.file = '';
        },

        handleDelete(e) {
            this.deleteInputFromClosingModal();
            e.stopPropagation();
            e.preventDefault();
            this.$emit('deleteImage', this.item);
        },
    },
};
</script>
