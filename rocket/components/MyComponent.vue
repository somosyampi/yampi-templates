<template>
    <div class="holder">
        <ul>
            <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>

        <LoaderButton
            :title="buyButtonText"
            :sending="false"
            class="btn btn-primary"
            @click="handleClick"
        />

        <div v-if="product" class="product">
            <p class="theme-title">{{ product.title }}</p>
            <p class="price">{{ product.prices.data.price_formated }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        buyButtonText: {
            type: String,
            default: 'Comprar agora'
        },
    },

    data() {
        return {
            items: [
                'Apple',
                'Juice',
                'Banana',
                'Orange',
                'Pineapple'
            ]
        }
    },

    computed: {
        product() {
            const selectedSku = window.vueInstance.$store.getters['product/selectedSku'];
            return selectedSku; 
        }
    },

    methods: {
        handleClick() {
            alert('Olá mundo');
        }
    },
}
</script>

<style lang="scss" scoped>
li {
    margin-left: 14px;
}

.holder {
    padding: 60px 0;
    border: 1px solid var(--default-background-color);
    border-radius: var(--theme-border-radius);
}
</style>