<template>
    <div class="discount-tag" v-if="value > 0">
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
        formattedValue () {
            return Math.round(this.value);
        },
    },
}
</script>
