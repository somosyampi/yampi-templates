<template>
    <div
        class="cashback"
        :class="`align-${textAlign}`"
    >
        <i class="cashback-icon icon icon-money" />
        <span class="cashback-text">
            Ganhe <span class="green">{{ percentAmount }}% de cashback</span>
        </span>
    </div>
</template>

<script>

export default {
    name: 'Cashback',

    props: {
        percentAmount: {
            required: true,
            type: Number,
        },

        textAlign: {
            type: String,
            default: 'left',
            validator: value => ['left', 'center'].includes(value),
        },
    },
};
</script>
