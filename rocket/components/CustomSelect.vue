<template>
    <div :class="selectType">
        <img
            v-if="iconUrl"
            :src="iconUrl"
            class="icon svg-brand"
            :class="{ '-error': error || internalError }"
        >

        <select
            ref="standardSelect"
            v-bind="$attrs"
            v-model="selectedValue"
            :class="{ 'error': error || internalError }"
            @change="change"
        >
            <slot />
        </select>

        <SelectArrow
            class="icon icon-select-arrow"
            :class="{ '-error': error || internalError }"
        />
    </div>
</template>

<script>
import { mapGetters } from '~/vuex';

export default {
    name: 'CustomSelect',

    props: {
        value: {
            type: [String, Number],
            default: '',
        },

        iconUrl: {
            type: String,
            default: null,
        },

        error: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        selectedValue: null,
        internalError: false,
    }),

    computed: {
        ...mapGetters('preview', ['isIframe']),

        selectType() {
            if (this.iconUrl) {
                return 'custom-select-image-prefix relative';
            }
            return 'custom-select relative';
        },
    },

    watch: {
        value: {
            immediate: true,
            handler() {
                this.selectedValue = this.value;
            },
        },
    },

    methods: {
        change() {
            if (this.isIframe) {
                return;
            }

            this.validateInternal();

            this.$emit('change', this.selectedValue);
        },

        validateInternal() {
            if (!this.selectedValue) {
                this.internalError = true;
                return;
            }

            this.internalError = false;
        },
    },
};
</script>
