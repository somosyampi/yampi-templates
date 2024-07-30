<template>
    <div class="container holder-button">
        <LoaderButton 
            title="Esse é um botão customizado"
            :sending="sending"
            class="btn btn-primary"
            @click="handleClick"
        />
    </div>
</template> 

<script>
export default {
    data() {
        return {
            sending: false,     
        }
    },
    
    methods: {
        handleClick($event) {
            this.sending = true;
            setTimeout(() => {
                this.sending = false;
            }, 3000);
        }
    }
}
</script>

<style lang="scss" scoped>
.holder-button {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 50px;
} 
</style>