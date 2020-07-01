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
    name: 'zone',
    components: { 
        menuLeft,
        navBar
    },    
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')                       
        }
        localStorage.setItem('navTitre', 'Société')
        localStorage.setItem('navMsg', 'Zone d\'activité')        
    },
    created() {
        let CodSte = localStorage.ste_actif
        let Token = localStorage.Token
        let CodUsr = localStorage.CodUsr
        let serverName = localStorage.serverName
        this.$http.post(serverName + '/include/ressources/data/get-Matrix.php?Token=' + Token + '&CodSte=' + CodSte + '&ListSte=' + CodSte + '&node=root&CodUsr='+ CodUsr,).then(function(result){
            if(result.body.succes == false){
                alert(result.body.error)
            } else {
                this.Zone = result.body[0].children
                let recupSte = result.body[0].Libelle.split('(')
                this.Ste = recupSte[0]
            }
        })
    },
    data() {
        return {
            Ste: [],
            Zone: []
        }
    },    
    methods: {
        logout: function () {
            localStorage.clear()
            this.$session.destroy()
            this.$router.push('/')
        },
        goBack() {
            this.$router.push('/dashboard')
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
    updated() {
        let config = JSON.parse(localStorage.config)
        let elemStats = document.getElementById('stats')
        let elemInfos = document.getElementById('infos')
        if (config.portail.elements.statistiques == false){            
            elemStats.setAttribute('hidden','')
        }
        if (config.portail.elements.informations == false){            
            elemInfos.setAttribute('hidden','')
        }
    } 
}