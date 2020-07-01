<template>
    <div id="burger" class="navleft navleft-container">
        <div @click="toggleMobileMenu()" class="toggle-sidebar-opened"></div>
        <div class="brand logo">
            <router-link to="/home" class="home">
                <img src="../images/logoptah-120x47.png" alt="">
            </router-link>
            <p class="brand-sommary">Portail des sociétés de transports hospitaliers </p>
        </div>
        <div class="nav-col nav-primary">
            <ul>
                <li id="home">
                    <router-link to="/home" class="home">Accueil</router-link>
                </li>
                <li id="dashboard">
                    <router-link to="/dashboard" class="user">Société</router-link>
                </li>
                <li id="mission">
                    <router-link to="/mission" class="mission">Missions</router-link>
                </li>
                <li id="stats">
                    <router-link to="/statistique" class="stat">Statistiques</router-link>
                </li>
                <li id="factu">
                    <router-link to="/factu" class="fact">Contrôle avant facturation</router-link>
                </li>
                <li id="infos">
                    <router-link to="/informations" class="info">Informations</router-link>
                </li>
            </ul>
        </div>
        <div class="avatar-container">
            <div class="bubble-container">
                <div class="bubble">
                    <p>Tous vos documents dans l’onglet informations</p>
                </div>
            </div>
            <div class="avatar">
                <img src="../images/avatar.png" alt="">
            </div>
        </div>
        <div class="logout-container">
            <ul>
                <li><a href="" class="logout" @click="logout()">Quitter</a></li>
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
        name: 'menuLeft',
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
        mounted() {
            let recupConfig = JSON.parse(localStorage.config)
            let portail = recupConfig.portail.elements
            let recupHome = document.getElementById("home")
            let recupDashboard = document.getElementById("dashboard")
            let recupMission = document.getElementById("mission")
            let recupStats = document.getElementById("stats")
            let recupFactu = document.getElementById("factu")
            let recupInfos = document.getElementById("infos")
            let recupBlockFactu = document.getElementById("blockFactu")
            if (portail.home == false) {
                recupHome.style.display = "none"
            }
            if (portail.dashboard == false) {
                recupDashboard.style.display = "none"
            }
            if (portail.mission == false) {
                recupMission.style.display = "none"
            }
             if (portail.facturation == false ) {
                 recupFactu.style.display = "none"
                 if(recupBlockFactu != undefined)
                    recupBlockFactu.style.display = "none"
             }
             if (portail.infos == false) {
                 recupInfos.style.display = "none"
             }
             if (portail.stats == false) {
                 recupStats.style.display = "none"
             }
        }
    }
</script>