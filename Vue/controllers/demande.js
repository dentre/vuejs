import Vue from 'vue'
import VueResource from "vue-resource"
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'

Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

export default {
    name: 'demande',
    components: {
        menuLeft,
        navBar
    },
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')     
        }
        localStorage.setItem('navTitre', 'Demande')
        localStorage.setItem('navMsg', 'Test')
    },
    methods: {
        logout: function () {
            this.$session.destroy()
            this.$router.push('/')
        },
        goBack() {
            localStorage.removeItem('Actif')
            window.history.go(-1)
        },
        mobile() {
            let reccupMain = document.getElementById("main")
            let reccupNav = document.getElementById("burger")
            reccupNav.className = "navleft navleft-container nav-fix"
            reccupMain.className = "dashboard-main blur wrap-mobile"
        },
        mobileCache() {
            let reccupMain = document.getElementById("main")
            let reccupNav = document.getElementById("burger")
            reccupNav.className = "navleft navleft-container"
            reccupMain.className = "dashboard-main"
        }
    },
    created() {
        let dti = localStorage.dti
        let serverName = localStorage.serverName
        this.$http.post( serverName + '/demande/index.php?Origine=P&Action=Visu&ActDem=V&NoReturn=true&RefDti=' + dti ,)
        .then(function(res){
        }) 
    },
    data() {
        return {
            demande: '',
            navTitre: 'Demande',
            navMsg: 'Test'
        }
    }
}