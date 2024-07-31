<template>
    <div>
        <splide 
            :options="options" 
            v-if="enabled"
        >
            <slot></slot>
        </splide>

        <slot v-else></slot>
    </div>
</template>

<script>
// import { Splide } from '@splidejs/vue-splide';
// import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

export default {
    name: 'OwlCarousel',

    components: {
        Splide,
    },

    props: {
        options: {
            type: Object,
            default() {
                return {}
            },
        },

        enabled: {
            type: Boolean,
            default: true,
        },

        customClass: {
            type: String,
            default: ''
        }
    },

    data() {
        return {};
    },

    methods: {
        getProperty(key, defaultValue) {
            return this.options[key] || defaultValue
        }
    },

    computed: {
        canAutoplay() {
            return !!this.autoplaySpeed;
        },

        autoplaySpeed() {
            return this.options.autoplayTimeout || this.options.autoplaySpeed || 0;
        }
    }
}
</script>
