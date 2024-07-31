import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('preview', [
            'isPreview',
        ]),
    },

    mounted() {
        this.$store.dispatch('queryParams/load');
        this.$store.dispatch('pixels/load');
        this.$store.dispatch('preview/load');

        window.addEventListener('load', event => {
            const params = new URLSearchParams(window.location.search);
            const editedSection = params.get('section');

            if (params.get('preview') && editedSection) {
                Promise
                    .all(Array.from(document.images)
                        .filter(img => !img.complete)
                        .map(img => new Promise(resolve => {
                            img.onload = img.onerror = resolve;
                        })))
                    .then(() => {
                        setTimeout(() => {
                            this.$store.dispatch('preview/focusOnSection', editedSection);
                        }, 500); // Timeout set because of footer delay appearing
                    });
            }
        });

        if (!this.isPreview) {
            return;
        }

        window.addEventListener('message', event => {
            if (event.data === 'clean-sections') {
                this.$store.dispatch('preview/setActiveSection', null);
                return;
            }

            if (typeof event.data === 'string') {
                this.$store.dispatch('preview/setActiveSection', event.data);

                this.$store.dispatch('preview/focusOnSection', event.data);
                return;
            }

            this.$store.dispatch('preview/updateParams', event.data);
        });
    },
};
