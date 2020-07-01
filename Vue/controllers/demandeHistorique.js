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
    name: 'demandeHistorique',
    components: {
        menuLeft,
        navBar
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')                
        }
        let refdti = localStorage.refdti
        let refste = localStorage.refste
        let token = localStorage.Token
        let codusr = localStorage.CodUsr
        let serverName = localStorage.serverName
        this.$http.post( serverName + '/include/ressources/data/get-lst-his.php?RefDti=' + refdti + '&RefSte=' + refste + '&Token=' + token + '&CodUsr=' + codusr ).then(function(res){
            this.histo = res.body.LstHis
        })
        let recup = JSON.parse(localStorage.Actif)
        let ident = recup.Ident
        localStorage.setItem('navTitre', 'Missions')
        localStorage.setItem('navMsg', 'Historique de la mission '+ refdti +' pour le patient :'+ ident)
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$session.destroy()
            this.$router.push('/')
        },
        goBack() {
            window.history.go(-1)
        },
    },
    data() {
        return {
            ident: localStorage.Ident,
            histo: [],
            dti: localStorage.refdti
        }
    },
}