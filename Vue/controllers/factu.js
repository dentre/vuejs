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
    beforeCreate: function () {
        if(!localStorage.factuCurrentPage >= 1){
            localStorage.setItem("factuCurrentPage", 1)
        }
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
        localStorage.setItem('navTitre', 'Contrôle avant facturation')
        localStorage.setItem('navMsg', 'Liste des transports valorisés ')      
        affTableau(this)
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$session.destroy()
            this.$router.push('/')
        },
        sort(s) {
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc'
            }
            this.currentSort = s
        },
        nextPage() {
            if((this.currentPage*this.pageSize) < this.Tpt.length) this.currentPage++
            this.rechercheRapide()
        },
        prevPage() {
            if(this.currentPage > 1) this.currentPage--
            this.rechercheRapide()
        },
        finPage(){
            this.currentPage = this.nbPages
            this.rechercheRapide()
        },
        debutPage() {
            this.currentPage = 1
            this.rechercheRapide()
        },
        pushDetailPastille(item, index) {
            let itemBase = item.LstTpt[index]
            let itemLst = item.LstTpt
            if (itemLst.length == 2 & index == 0){
                let recupSuiv = itemLst[1]
                localStorage.setItem('BitS', 1)
                localStorage.setItem('BitP', 0)
                localStorage.setItem('TptSuiv', JSON.stringify(recupSuiv))
                localStorage.removeItem('TptPrec')
            }
            else if (itemLst.length == 2 & index == 1){
                let recupPrec = itemLst[0]
                localStorage.setItem('BitS', 0)
                localStorage.setItem('BitP', 1)
                localStorage.setItem('TptPrec', JSON.stringify(recupPrec))
                localStorage.removeItem('TptSuiv')
            }
            else {
                localStorage.setItem('BitS', 0)
                localStorage.setItem('BitP', 0)
                localStorage.removeItem('TptSuiv')
                localStorage.removeItem('TptPrec')
            }
            localStorage.setItem('Actif', JSON.stringify(itemBase))
            this.$router.push('/detail')
        },
        pushDetail(item) {            
            if (item.LstTpt.length == 2){
                let recupSuiv = item.LstTpt[1]
                localStorage.setItem('BitS', 1)
                localStorage.setItem('BitP', 0)
                localStorage.setItem('TptSuiv', JSON.stringify(recupSuiv))
                localStorage.removeItem('TptPrec')
            }
            else {
                localStorage.setItem('BitS', 0)
                localStorage.setItem('BitP', 0)
                localStorage.removeItem('TptSuiv')
                localStorage.removeItem('TptPrec')
            }
            localStorage.setItem('Actif', JSON.stringify(item.LstTpt[0]))
            this.$router.push('/detail')
        },
        refreshtab() {
            location.reload()
            clearInterval(this.timer)
        },
        mobile() {            
            document.getElementById("burger").className = "navleft navleft-container nav-fix"
            document.getElementById("main").className = "dashboard-main blur wrap-mobile"
        },
        mobileCache() {        
            document.getElementById("burger").className = "navleft navleft-container"
            document.getElementById("main").className = "dashboard-main"
        },
        filtre(statut){
            toggleFiltre(this, statut)
            this.currentPage = 1    
            affTableau(this)
        },
        clear() {
            location.reload()
        },
        validerDti(item) {
            let reccup = item.LstTpt                        
            let confirmation = confirm("Etes-vous sûr de vouloir valider la demande valorisé " + item.RefDtiPtah + " contenant " + item.NbTpt + " transport(s)" )
                if (confirmation == true) {
                for (let i = 0 ; i<reccup.length ; i++) {
                    let reccuptpt = reccup[i].RefTpt
                    let reccupste = JSON.parse(localStorage.ste)
                    // reccuperation du refSte (RefElt)                    
                    let correspondSte = reccupste.find(Tcodste => Tcodste.CodSte === localStorage.CodUsr)                    
                    this.$http.post( localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_EtatFact', {
                        RefSte: correspondSte.RefElt,
                        QuiDem: 'P',
                        RefTpt: reccuptpt,
                        EtatFact: 'SOK',
                        Token: localStorage.Token,
                    }).then(function(res){
                         affTableau(this)
                    })
                }
            }
         },
        devaliderDti(item) {
            let reccup = item.LstTpt                        
            let confirmation = confirm("Etes-vous sûr de vouloir dé-valider la demande " + item.RefDtiPtah + " contenant " + item.NbTpt + " transport(s)" )
                if (confirmation == true) {
                for (let i = 0 ; i<reccup.length ; i++) {
                    let reccuptpt = reccup[i].RefTpt
                    let reccupste = JSON.parse(localStorage.ste)
                    // reccuperation du refSte (RefElt)                    
                    let correspondSte = reccupste.find(Tcodste => Tcodste.CodSte === localStorage.CodUsr)                                  
                    this.$http.post( localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_EtatFact', {
                        RefSte: correspondSte.RefElt,
                        QuiDem: 'P',
                        RefTpt: reccuptpt,
                        EtatFact: 'VAM',
                        Token: localStorage.Token,
                    }).then(function(res){
                        affTableau(this)
                    })
                }
            }
         },
        rechercheRapide() {
            let tpt = JSON.parse(localStorage.storeTpt)
            let mysearch = LibPerso.RemoveAccents(this.search.toUpperCase())
            for (let ligne = 0 ; ligne < tpt.length ; ligne++){
                let showLigne = false
                let columns = ["Ident", "RefDtiPtah", "DateDep", "LibEtbDep", "LibSte", "DistDti", "PrixDti"]
                for (columns in tpt[ligne]){
                    let valeur = LibPerso.RemoveAccents(tpt[ligne][columns])
                    if(typeof valeur === 'string' && columns.includes(columns) && columns != 'LstTpt'){
                        if(valeur.toUpperCase().match(mysearch)){
                            showLigne = true
                            if(mysearch.length > 0){
                                 let depart = valeur.toUpperCase().match(mysearch).index
                                 let fin = mysearch.length
                                 tpt[ligne][columns] = LibPerso.markage(valeur, depart, fin)

                            }
                        }
                    }
                }
                if(showLigne == false){
                    tpt.splice(ligne,1)
                    ligne--
                }
            }
            this.Tpt = tpt
        },
        DateDebut(newDate){
            this.searchDateDeb = newDate
        },
        DateFin(newDate){
            this.searchDateFin = newDate
            this.currentPage = 1
            affTableau(this)
        }
    },
    data() {
        return {
            factuFiltres : [],
            Tpt: [],
            currentSort:'RefDti',
            currentSortDir:'asc',
            pageSize:12,
            currentPage:1,
            search: '',            
            searchDateDeb: '',
            searchDateFin: '',
            counterVAM: 0,
            counterSKO: 0,
            counterSOK: 0,
            msgVAL: localStorage.msgVAL,
            msgLIT: localStorage.msgLIT,
            ptBr: {
              night: 'Nuit',
              nights: 'Nuits',
              'day-names': ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
              'check-in': 'De :',
              'check-out': 'Jusqu\'a :',
              'month-names': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            }
        }
    },
    mounted(){
        LibPerso.konamiCode()                  
        if ( localStorage.BitPREMIERFiltreFactu == 0 )
            setDefaultFiltres(this)               
        filtreInit(this)
    },
    watch: {
        search(){
            this.rechercheRapide()
        },
        currentPage(){
            localStorage.setItem("factuCurrentPage", this.currentPage)
        }
    },
    computed: {
        sortedTpt() {
            return this.Tpt.sort((a,b) => {
                let modifier = 1
                if(this.currentSortDir === 'desc') modifier = -1
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier
            return 0;
            }).filter((row, index) => {
                if(localStorage.backToFactu == 1){
                    this.currentPage = localStorage.factuCurrentPage
                    localStorage.removeItem("backToFactu")
                }

                let start = (this.currentPage-1)*this.pageSize
                let end = this.currentPage*this.pageSize
                if(index >= start && index < end) return true
	       });
        },
        filteredTpt() {
            return this.sortedTpt.filter((item) =>{
                let tpt = JSON.parse(localStorage.storeTpt)
                this.Tpt = tpt
                return tpt
            })
        },
        counter() {
            return this.Tpt.length
        },
        nbPages() {
            let P = this.Tpt.length / this.pageSize
            let Pfin = Math.ceil(P)
            return Pfin
        }
    },
    updated() {
        //gestion des pastille couleurs
        let recupPastille = document.getElementsByClassName("etat pastilles")
        let recupLst = this.filteredTpt
        for (let i = 0 ; i < recupLst.length ; i++){
            let cibleTabPastille = recupPastille[i]
            let ciblePastille = cibleTabPastille.getElementsByClassName("pastillenbrtpt")
            let lstTpt = recupLst[i].LstTpt
            let recupBtnV = document.getElementsByClassName("primary valider")[i]
            let recupBtnD = document.getElementsByClassName("primary devalider")[i]
            let recupVide = document.getElementsByClassName("vide")[i]
            for (let j = 0; j < lstTpt.length; j++) {
                let pastilleFinale = ciblePastille[j]
                switch(lstTpt[j].EtatFact){
                    case 'Controlé en amont' :
                        pastilleFinale.className = "pastillenbrtpt vam"
                    break
                    case 'Litige déclaré' :
                        pastilleFinale.className = "pastillenbrtpt sko"
                    break
                    case 'Validé par la société' :
                        pastilleFinale.className = "pastillenbrtpt sok"
                    break
                }
            }
            recupBtnV.style.display = "none"
            recupVide.style.display = "none"
            recupBtnD.style.display = "none"
            if (lstTpt.length > 1){                
                if ( lstTpt[0].EtatFact == "Validé par la société" & lstTpt[1].EtatFact == "Validé par la société"){                    
                    recupBtnD.style.display = "block"                    
                }
                else if ( lstTpt[0].EtatFact == "Controlé en amont" & lstTpt[1].EtatFact == "Controlé en amont"){
                    recupBtnV.style.display = "block"                    
                }
                else if ( lstTpt[0].EtatFact == "Validé par la société" & lstTpt[1].EtatFact == "Controlé en amont"){
                    recupBtnV.style.display = "block"                    
                }
                else if ( lstTpt[1].EtatFact == "Validé par la société" & lstTpt[0].EtatFact == "Controlé en amont"){
                    recupBtnV.style.display = "block"                    
                }
                else if ( lstTpt[0].EtatFact == "Litige déclaré" & lstTpt[1].EtatFact == "Litige déclaré"){                    
                    recupVide.style.display = "block"
                }
                else {                    
                    recupVide.style.display = "block"
                }
            }
            if (lstTpt.length == 1){
                if ( lstTpt[0].EtatFact == "Validé par la société"){                    
                    recupBtnD.style.display = "block"                    
                }
                else if ( lstTpt[0].EtatFact == "Controlé en amont"){
                    recupBtnV.style.display = "block"                    
                }
                else if ( lstTpt[0].EtatFact == "Litige déclaré"){                    
                    recupVide.style.display = "block"
                }
                else {                    
                    recupVide.style.display = "block"
                }
            }
        }
        // gestion du toaster        
        let reccupVal = document.getElementById("ToasterVAL")
        let reccupLit = document.getElementById("ToasterLIT")
        if(localStorage.codVal == 1){
            this.msgVAL = localStorage.msgVAL
            reccupVal.style.display = "block"
            let efface = setTimeout(function(){
                localStorage.setItem("codVal", 0)
                reccupVal.style.display = "none"
            },10000)
        }
        else if(localStorage.codLit == 1){
            this.msgLIT = localStorage.msgLIT
            reccupLit.style.display = "block"
            setTimeout(function(){
                localStorage.setItem("codLit", 0)
                reccupLit.style.display = "none"
            },10000)
        }
    }
}

function affTableau(instance) {
    LibPerso.showSpinner()            
    let correspondSte = JSON.parse(localStorage.ste).find(Tcodste => Tcodste.CodSte === localStorage.CodUsr)    
    let paramAjax = {
        Liste:'Ste',
        RefSte: correspondSte.RefElt,
        Token: localStorage.Token,
        CodUsr: localStorage.CodUsr,
    }
    if (!(instance.searchDateDeb == undefined && instance.searchDateFin == undefined) && !(instance.searchDateDeb == "" && instance.searchDateFin == "")) {        
        paramAjax.Dates = LibPerso.dateEnToFr(instance.searchDateDeb) + ';' + LibPerso.dateEnToFr(instance.searchDateFin)        
    }
    instance.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Fac_Tpt', paramAjax).then(function(res){
        let reccupTpt = res.body.DtiFact
        localStorage.setItem('storeTpt', JSON.stringify(res.body.DtiFact))
        // recuperation de l'etat des facure et remplacement des code par des labels et compteurs    
        instance.counterVAM = instance.counterSKO = instance.counterSOK = 0
        for (let i = 0; i < reccupTpt.length; i++) {
            //converstion des valeurs en chaine de caractère
            reccupTpt[i].DistDti += ' km'
            reccupTpt[i].PrixDti += ' €'
            // gestion du nom de naissance
            if (reccupTpt[i].NomNai != ""){
                reccupTpt[i].Ident = reccupTpt[i].NomMal + " (" + reccupTpt[i].NomNai + "), " + reccupTpt[i].Prenom
            }
            let afficheLigne = false
            let lstTpt = reccupTpt[i].LstTpt
            if(instance.factuFiltres.length == 0){
                    afficheLigne = true
                }
            for (let j = 0; j < lstTpt.length; j++) {
                lstTpt[j].EtatFactNum = lstTpt[j].EtatFact                
                if (lstTpt[j].EtatFactCar == 'VAM'){
                    lstTpt[j].EtatFact = 'Controlé en amont'
                    if(LibPerso.key_exists(instance.factuFiltres, 'VAM')){
                        afficheLigne = true
                    }                    
                    this.counterVAM++
                }
                if (lstTpt[j].EtatFactCar == 'SKO'){
                    lstTpt[j].EtatFact = 'Litige déclaré'
                    if(LibPerso.key_exists(instance.factuFiltres, 'SKO')){
                        afficheLigne = true
                    }                    
                    this.counterSKO++
                }
                if (lstTpt[j].EtatFactCar == 'SOK'){
                    lstTpt[j].EtatFact = 'Validé par la société'
                    if(LibPerso.key_exists(instance.factuFiltres, 'SOK')){
                        afficheLigne = true
                    }                    
                    this.counterSOK++
                }
            }
            if(afficheLigne == false){
                reccupTpt.splice(i,1)
                i--
            }
        }
        localStorage.setItem('storeTpt', JSON.stringify(reccupTpt))
        //gestion des montants
        instance.Tpt = reccupTpt
        LibPerso.hideSpinner()
    })
}

function toggleFiltre(instance, statut){
    if (!LibPerso.key_exists(instance.factuFiltres, statut)){
        instance.factuFiltres.push(statut)
        document.getElementById("ico"+statut).checked = true
    }
    else {
        LibPerso.key_unset(instance.factuFiltres, statut)
        document.getElementById("ico"+statut).checked = false
    }
       
    localStorage.setItem("factuFiltres", JSON.stringify(instance.factuFiltres))
}

function filtreInit(instance) {
    instance.factuFiltres = localStorage.factuFiltres == undefined ? [] : JSON.parse(localStorage.factuFiltres)    
    instance.currentPage = 1
    
    filtreEmpty()

    for (let i = 0; i < instance.factuFiltres.length; i++) {
        document.getElementById("ico" + instance.factuFiltres[i]).checked = true
    }
}

function setDefaultFiltres(instance) {        
    localStorage.setItem("factuFiltres", JSON.stringify(["VAM"]))
    localStorage.setItem('BitPREMIERFiltreFactu', 1)    
    filtreInit(instance)
}

function filtreEmpty() {
    let clist = document.getElementsByClassName("checkboxStatutFactu")
    for (let i = 0; i < clist.length; ++i) {
        clist[i].checked = false
    }
}