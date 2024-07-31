<template>
    <div class="read-more">
        <div
            ref="text"
            class="-text"
            :class="textClass"
            :style="style"
        >
            <slot />
        </div>

        <div
            v-if="isExpandable"
            class="-button link-alike"
            @click="toggleExpand"
            v-text="buttonText"
        />
    </div>
</template>

<script>
export default {
    name: 'ReadMore',

    props: {
        maxLines: {
            type: Number,
            default: 3,
        },
        readLess: {
            type: String,
            default: '- Ler menos',
        },
        readMore: {
            type: String,
            default: '+ Ler mais',
        },
    },

    data: () => ({
        style: '',
        mounted: false,
        expanded: false,
        animating: false,
        isExpandable: false,
    }),

    computed: {
        textClass() {
            return {
                'ellipsis-multiline': !this.expanded,
                [`l${this.maxLines}`]: !!this.maxLines,
                expandable: this.isExpandable,
                animating: this.animating,
            };
        },

        buttonText() {
            return this.expanded ? this.readLess : this.readMore;
        },
    },

    watch: {
        expanded() {
            this.$nextTick(() => {
                let style = '';

                if (this.mounted && this.isExpandable && this.expanded) {
                    style = `height: ${this.$refs.text.scrollHeight}px;`;
                }

                this.style = style;
                this.animating = true;

                setTimeout(() => {
                    this.animating = false;
                }, 300);
            });
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.isExpandable = this.$refs.text.clientHeight < this.$refs.text.scrollHeight;
            this.mounted = true;
            this.removeLoadingClass();
        });
    },

    methods: {
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        removeLoadingClass() {
            const holder = document.querySelector('.category-description.-loading');

            if (holder) {
                holder.classList.remove('-loading');
            }
        },
    },
};
</script>
