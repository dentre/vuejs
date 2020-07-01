import Vue from 'vue'
import VueSession from 'vue-session'
import VueResource from "vue-resource"
import VueLocalStorage from 'vue-localstorage'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'
import HotelDatePicker from 'vue-hotel-datepicker'
import LibPerso from '../../../../include/LibJS.js'
    
Vue.use(VueSession)
Vue.use(VueLocalStorage)
Vue.use(VueResource)

export default {
    name: 'factu',
    components: { 
        menuLeft,
        navBar,
        HotelDatePicker
    },    
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')         
        }
        localStorage.setItem('navTitre', 'Statistiques')
        localStorage.setItem('navMsg', 'Tour de rôle')
    },
   
    methods: {
        logout() {
            localStorage.clear()
            this.$session.destroy()
            this.$router.push('/')
        },
        affAcc() {
            let reccupAcc = document.getElementById("StatsAcceptees")
            let reccupRef = document.getElementById("StatsRefusees")
            reccupAcc.style.display = "block"
            reccupRef.style.display = "none"
        },
        affRef() {
            let reccupAcc = document.getElementById("StatsAcceptees")
            let reccupRef = document.getElementById("StatsRefusees")
            reccupAcc.style.display = "none"
            reccupRef.style.display = "block"
        },
        affToutes() {
            let reccupAcc = document.getElementById("StatsAcceptees")
            let reccupRef = document.getElementById("StatsRefusees")
            reccupAcc.style.display = "block"
            reccupRef.style.display = "block"
        },
        clear() {
            location.reload()
        },
        refresh() {
           statsTab(this) 
        },
        onChangeDatePicker() {
            statTab(this)
        },
        onChangeListeSte() {
            let reccupVal = document.getElementById("listeSte").value
            let reccupste = JSON.parse(localStorage.ste)
            let correspondSte = reccupste.find(Tcodste =>Tcodste.LibSte === reccupVal)
            let codste = correspondSte.CodSte
            this.CodSte = codste
            this.ListSte = codste
            statsTab(this)
        },
        DateDebut(newDate){
            this.searchDateDeb = newDate
        },
        DateFin(newDate){
            this.searchDateFin = newDate
            statTab(this)
        },
        startDate(){
            let DelaiArchi = this.DelaiArchi
            let delai = DelaiArchi * 24 * 60 * 60 * 1000
            let now = new Date()
            let timestamp = now.getTime()
            let newTimestamp = timestamp - delai
            now.setTime(newTimestamp)            
            let jour = now.getDate()
            let mois = now.getMonth()
            let annee = now.getFullYear()
            let varReturn = annee+'-'+mois+'-'+jour 
            //return varReturn.toString()  
            return now
            
            //new Date(new Date().getFullYear()-1, new Date().getMonth()+6, 1)
        }
    },
    created() {
        this.CodSte = localStorage.CodUsr
        this.ListSte = localStorage.ListeSte
        this.ListeSte = JSON.parse(localStorage.ste)
        statsTab(this)
    },
    data(){
        return {
            DelaiArchi: localStorage.DelaiArchi,
            StatsAcc: [],
            StatsRef: [],
            searchDateDeb: '',
            searchDateFin: '',
            ListeSte:[],
            CodSte:'',
            ListSte:'',
            NomHor:[],
            ptBr: {
              night: 'Nuit',
              nights: 'Nuits',
              'day-names': ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
              'check-in': 'De :',
              'check-out': 'Jusqu\'a :',
              'month-names': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            }
        }
    }
}

function statsTab(instance){
    let serverName = localStorage.serverName
    let codste = instance.CodSte
    let listeste = instance.ListSte
    let token = localStorage.Token
    instance.$http.post( serverName + '/include/ressources/data/get-stats-tdr.php?CodSte=' + codste + '&LstSte=' + listeste + '&Token=' + token,).then(function(res){
        console.log("Refresh Tableau Statistiques")
        let acc = res.body.LstElt
        let transRef = acc.splice(3, 5)
        instance.StatsRef = transRef 
        let transAcc = acc.splice(0, 3)
        instance.StatsAcc = transAcc
        instance.NomHor = res.body.NomHor
    })
}

function statTab(instance){
    let serverName = localStorage.serverName
    let codste = instance.CodSte
    let listeste = instance.ListSte
    let token = localStorage.Token
    let initdatedeb = instance.searchDateDeb
    let initdatefin = instance.searchDateFin
    let datdeb = LibPerso.dateEnToFr(initdatedeb)
    let datfin = LibPerso.dateEnToFr(initdatefin)
    instance.$http.post( serverName + '/include/ressources/data/get-stats-tdr.php?CodSte=' + codste + '&LstSte=' + listeste + '&Token=' + token + '&DateDebut=' + datdeb + '&DateFin=' + datfin,).then(function(res){
        console.log("Refresh Tableau Statistiques")
        let acc = res.body.LstElt
        let transRef = acc.splice(3, 5)
        instance.StatsRef = transRef 
        let transAcc = acc.splice(0, 3)
        instance.StatsAcc = transAcc
        instance.NomHor = res.body.NomHor
    })
}