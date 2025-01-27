<template functional>
    <div class="rkt-link-container-row">
        <atom-link
            class="shopping-cart-link"
            label="Minhas compras"
            :href="props.redirectTo"
            title="Ir para minhas compras"
        />
    </div>
</template>

<script>

export default {
    name: 'ShoppingPageRow',

    props: {
        redirectTo: {
            type: String,
            required: true
        }
    },
};
</script>
