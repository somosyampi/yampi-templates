<template>
    <transition name="fade">
        <div class="cookies-warning" v-if="!policyIsAccepted">
            <p class="text">
                Utilizamos cookies para personalizar anúncios e melhorar a sua experiência no site. <span>Ao continuar</span> navegando, você concorda com a nossa <a href="/atendimento/politica-de-cookies">Política de cookies</a>.
            </p>        
            <button class="btn btn-secundary" @click="storeCookie">Ok, entendi</button>
        </div>
    </transition>
</template>
<script>
import Cookies from '~js-cookie';

export default {
    name: 'CookiesWarning',
    
    data() {
        return {
            policyIsAccepted: true,
            cookieName: 'policy_accepted'
        }
    },

    mounted() {
        setTimeout(() => {
            this.policyIsAccepted = Cookies.get(this.cookieName);
        }, 3000);
    },

    methods: {
        storeCookie () {
            if (!Cookies.get(this.cookieName)) {
                const today = new Date();
                const expiration = new Date(today.setFullYear(today.getFullYear() + 1));

                Cookies.set(this.cookieName, 'true', { expires: expiration });
                
                this.policyIsAccepted = true;
            }
        },
    },
}
</script>