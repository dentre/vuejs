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
    name: 'informations',
    components: { 
        menuLeft,
        navBar
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')                      
        }
        localStorage.setItem('navTitre', 'Informations')
        localStorage.setItem('navMsg', 'Liste de documents')
        let codste = localStorage.CodUsr
        let token = localStorage.Token
        let codusr = localStorage.CodUsr
        let serverName = localStorage.serverName
        this.$http.post(serverName + '/include/ressources/data/affDoc.php?Origine=PtahSte&CodSte='+ codste +'&Token=' + token + '&CodUsr=' + codusr, ).then(function(res){
            if(res.body.success == true){
                this.listeDocS = res.body.body
            }
            else {
                alert(res.body.msg)
            }
        })
        this.$http.post(serverName + '/include/ressources/data/affDoc.php?Origine=PtahSte&CodSte=global&Token=' + token + '&CodUsr=' + codusr, ).then(function(res){
            if(res.body.success == true){
                this.listeDocG = res.body.body
            }
            else {
                alert(res.body.msg)
            }
        })
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
        },
        sort(s) {
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s
        },
        linkSte(item) {
            let codste = localStorage.CodUsr
            let token = localStorage.Token
            let codusr = localStorage.CodUsr
            let filename = item.FileName
            let serverName = localStorage.serverName
            window.open(serverName + '/include/ressources/data/downloadDoc.php?Origine=PtahSte&CodSte='+ codste + '&FileName=' + filename + '&Token=' + token + '&CodUsr=' + codusr)
        },
        linkG(item) {
            let filename = item.FileName
            let token = localStorage.Token
            let codusr = localStorage.CodUsr
            let serverName = localStorage.serverName
            window.open(serverName + '/include/ressources/data/downloadDoc.php?Origine=PtahSte&CodSte=global&FileName=' + filename +'&Token=' + token + '&CodUsr=' + codusr)
        },
        charte () {
            let reccup = JSON.parse(localStorage.config)
            let charte = reccup.Liens.charte
            window.open(charte, "charte", "scrollbars=no, location=no, width=900, height=900, resizable=no, top=100")
        },
        affDocG() {
            let reccupG = document.getElementById("global")
            let recupOngletG = document.getElementById("ongletG")
            let recupOngletS = document.getElementById("ongletS")
            let reccupS = document.getElementById("societe")
            reccupG.style.display = "block"
            reccupS.style.display = "none"
            recupOngletG.className = "tab tab-child-1 active"
            recupOngletS.className = "tab tab-child-1"
        },
        affDocS() {
            let reccupG = document.getElementById("global")
            let recupOngletG = document.getElementById("ongletG")
            let recupOngletS = document.getElementById("ongletS")
            let reccupS = document.getElementById("societe")
            reccupG.style.display = "none"
            reccupS.style.display = "block"
            recupOngletS.className = "tab tab-child-1 active"
            recupOngletG.className = "tab tab-child-1"
        }
    },
    data() {
        return{
            listeDocG: [],
            listeDocS: [],
            currentSort:'Nom',
            currentSortDir:'asc',
            pageSize:8000,
            currentPage:1,
        }
    },
    computed: {
        sortedListeDocG() {
            return this.listeDocG.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier
            return 0;
            }).filter((row, index) => {
                let start = (this.currentPage-1)*this.pageSize
                let end = this.currentPage*this.pageSize
                if(index >= start && index < end) return true
	       })
        },
        filteredListeDocG() {
            return this.sortedListeDocG.filter((item) =>{
                return item.Nom.match(this.search)
            })
        },
        sortedListeDocS() {
            return this.listeDocS.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter((row, index) => {
                let start = (this.currentPage-1)*this.pageSize;
                let end = this.currentPage*this.pageSize;
                if(index >= start && index < end) return true;
	       });
        },
        filteredListeDocS() {
            return this.sortedListeDocS.filter((item) =>{
                return item.Nom.match(this.search)
            })
        },
        counterDocG() {
            return this.listeDocG.length
        },
        counterDocS() {
            return this.listeDocS.length
        },
    },
    updated() {
        //icones pour liste global
        let liste = this.filteredListeDocG
        let reccupExt = document.getElementsByClassName("ext")
        let extTxt = document.getElementsByClassName("extTxt")
        for (let i = 0 ; i < liste.length ; i++){
            switch (liste[i].Extension) {
                case "pdf" :
                    reccupExt[i].className = "ext ico-action ico-pdf-filter"
                    extTxt[i].style.display = "none"
                break
                case "png" :
                    reccupExt[i].className = "ext ico-action icon-png"
                    extTxt[i].style.display = "none"
                break
                case "txt" :
                    reccupExt[i].className = "ext ico-action icon-txt"
                    extTxt[i].style.display = "none"
                break
                case "xlsx" : 
                case "xls" :
                    reccupExt[i].className = "ext ico-action icon-xls"
                    extTxt[i].style.display = "none"
                break
                case "docx" :
                case "doc" :
                    reccupExt[i].className = "ext ico-action icon-doc"
                    extTxt[i].style.display = "none"
                break
                default :
                    reccupExt[i].className = "ext"
                break
            }
        }
        //icones pour liste societe
        let listeste = this.filteredListeDocS
        let reccupExtS = document.getElementsByClassName("extS")
        let extTxtS = document.getElementsByClassName("extTxtS")
        for (let j = 0 ; j < listeste.length ; j++){
            switch (listeste[j].Extension) {
                case "pdf" :
                    reccupExtS[j].className = "extS ico-action ico-pdf-filter"
                    extTxtS[j].style.display = "none"
                break
                case "png" :
                    reccupExtS[j].className = "extS ico-action icon-png"
                    extTxtS[j].style.display = "none"
                break
                case "txt" :
                    reccupExtS[j].className = "extS ico-action icon-txt"
                    extTxtS[j].style.display = "none"
                break
                case "xlsx" : 
                case "xls" :
                    reccupExtS[j].className = "extS ico-action icon-xls"
                    extTxtS[j].style.display = "none"
                break
                case "docx" :
                case "doc" :
                    reccupExtS[j].className = "extS ico-action icon-doc"
                    extTxtS[j].style.display = "none"
                break
                default :
                    reccupExtS[j].className = "extS"
                break
            }
        }
    } 
}