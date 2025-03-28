<template>
    <Transition name="fade">
        <div
            v-if="showPreviewWarning"
            class="preview-warning"
        >
            <span class="preview-warning--text">
                Esta é uma prévia da sua loja com os arquivos de código que foram salvos.
                Publique a loja para tornar esta versão disponível para seus clientes.
            </span>

            <button
                class="preview-warning--close"
                @click="closePreview"
            >
                <i class=" icon icon-close-modal-white" />
            </button>
        </div>
    </Transition>
</template>

<script>
import { mapGetters } from '~/vuex';

export default {
    name: 'PreviewWarning',

    data() {
        return {
            previewIsClosed: false,
        };
    },

    computed: {
        ...mapGetters('preview', ['isIframe']),

        showPreviewWarning() {
            if (this.isIframe) {
                return false;
            }

            return !this.previewIsClosed;
        },
    },

    methods: {
        closePreview() {
            this.previewIsClosed = true;
        },
    },
};
</script>
