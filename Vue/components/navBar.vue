<template>
    <div class="navbar navbar-container">
        <div @click="toggleMobileMenu()" class="toggle-sidebar-close"></div>  
        <div class="brand-client logo-client">
            <img :src="logo" alt="">
        </div>
        <div class="top">
            <h1>{{navTitre}} - <span class="light-title">{{navMsg}}</span> </h1>
        </div>
        <div class="notify-container"><a href="" class="notify"></a> </div>
        <div class="logout-container"><a class="logout" @click="logout()"></a></div>  
          <!--Element for custom SVG spinner -->
                 <div class="overlay-spinner"  style="display:none;"></div>   <!-- // ~ div class="overlay" if background else display none-->
                <svg id="svg-spinner" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"  style="display:none;">
                    <circle cx="24" cy="4" r="4" fill="#fff"/>
                    <circle cx="12.19" cy="7.86" r="3.7" fill="#0D6AFE"/>
                    <circle cx="5.02" cy="17.68" r="3.4" fill="#2c7af7"/>
                    <circle cx="5.02" cy="30.32" r="3.1" fill="#5796fa"/>
                    <circle cx="12.19" cy="40.14" r="2.8" fill="#6ba3fb"/>
                    <circle cx="24" cy="44" r="2.5" fill="#81aef9"/>
                    <circle cx="35.81" cy="40.14" r="2.2" fill="#90b7f7"/>
                    <circle cx="42.98" cy="30.32" r="1.9" fill="#9dc2fd"/>
                    <circle cx="42.98" cy="17.68" r="1.6" fill="#b5cff9"/>
                    <circle cx="35.81" cy="7.86" r="1.3" fill="#d6e3f9"/>
                </svg> 
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
        name: 'navBar',
        methods: {
            logout() {
                localStorage.clear()
                this.$session.destroy()
                this.$router.push('/')
            },
            toggleMobileMenu(){
                LibPerso.toggleMobileMenu()  
            } 
        },
        data() {
            let recupLogo = JSON.parse(localStorage.config)
            let logo = recupLogo.Liens.logo
            let serverName = localStorage.serverName
            let finalLogo = serverName + logo
            return{
                navTitre: localStorage.navTitre,
                navMsg: localStorage.navMsg,
                logo: finalLogo
            }
        }
    }
    
    
</script>