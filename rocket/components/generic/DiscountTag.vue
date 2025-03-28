<template>
    <div
        v-if="value > 0"
        class="discount-tag"
    >
        <span>{{ formattedValue }}</span>
    </div>
</template>

<script>
export default {
    name: 'DiscountTag',

    props: {
        value: {
            type: Number,
            default: 0,
        },
    },

    computed: {
        formattedValue() {
            return Math.round(this.value);
        },
    },
};
</script>
