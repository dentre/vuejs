<template>
<div>
        <div class="logo-dark">
            <img src="../images/logoptah-dark-77x77.png" alt="">
        </div>
        <div class="navigation-enrollment">
            <ul id="num-steps">
            <!-- navigation dynamique  -->
                <li id="l01" class="active">01</li>
                <li id="l02">02</li>
                <li id="l03">03</li>
                <li id="l04">04</li>
                <li id="l05">05</li>
                <li id="l06">06</li>
                <li id="l07">07</li>
                <li id="l08">08</li>
                <li class="final">100%</li>
            </ul>
        </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from "vue-resource"
    import VueSession from 'vue-session'
    import VueLocalStorage from 'vue-localstorage'
    import LibPerso from '../../../../include/LibJS.js'

    Vue.use(VueSession)
    Vue.use(VueResource)
    Vue.use(VueLocalStorage)

    export default {
        name: 'menuInscri',
        methods: {
            logout() {
                localStorage.clear()
                this.$session.destroy()
                this.$router.push('/')
            },
            toggleMobileMenu(){
                LibPerso.toggleMobileMenu()  
            }
        }
    }
</script>