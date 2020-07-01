import Vue from 'vue'
import VueResource from "vue-resource"
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
import modal from '@/components/modal_annote'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'
import { exportDefaultSpecifier } from 'babel-types';

Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

    
Vue.use(VueSession)

export default {
    name: 'detailMission',
    components: { 
        modal,
        menuLeft,
        navBar
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')  
        }
        let reccupActif = JSON.parse(localStorage.Actif)
        let refdti = reccupActif.RefDti
        //appel de la demande en JSON
        let token = localStorage.Token
        let codusr = localStorage.CodUsr
        let serverName = localStorage.serverName
        this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Dti_Json', {
            RefDti: refdti,
            Token: token,
            CodUsr: codusr
       }).then(function(res){
            this.StrTpt = res.body.StrDti[0].StrTpt
            this.Dti = res.body.StrDti[0]
            localStorage.setItem('Str', JSON.stringify(res.body.StrDti[0].StrTpt))
        })
        localStorage.setItem('navTitre', 'Missions')
        localStorage.setItem('navMsg', 'Détail de la mission ' + refdti)
    },
    methods: {
        logout: function () {
            this.$session.destroy()
            this.$router.push('/')
        },
        goBack() {
            localStorage.setItem('backToActivite', 1)
            window.history.go(-1)
        },
        showModalAnnote() {          
            this.isModalVisible = true
        },
        closeModalAnnote() {
            this.isModalVisible = false
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
        showModalAffect() {
            let reccup = document.getElementById("affect")
            reccup.style.display = "block"
            //recuperation de la liste des sociétés
            let serverName = localStorage.serverName
            let token = localStorage.Token
            let codusr = localStorage.CodUsr
            this.$http.post(serverName + '/include/ressources/data/get-all-societe.php', {
                Dispo: "O",
                Token: token,
                CodUsr: codusr
            }).then(function (result) {
                this.ListeSte = result.body.LstElt
            })
        },
        closeModalAffect() {
            let reccup = document.getElementById("affect")
            reccup.style.display = "none"           
        },
        bonTpt() {
            let reccup = JSON.parse(localStorage.Actif)
            let reftpt = reccup.RefTpt
            let serverName = localStorage.serverName            
            if (localStorage.client == "Charenton"){
                window.open(serverName + '/include/ressources/data/Fax_ste.php?RefTpt='+ reftpt)
            }else{          
                window.open(serverName + '/include/ressources/data/Bon_ste.php?RefTpt='+ reftpt)
            }
        },
        histo() {
            let reccup = JSON.parse(localStorage.Actif)
            let reccupste = JSON.parse(localStorage.ste)
            let codusr = localStorage.CodUsr
            let correspondSte = reccupste.find(Tcodste => Tcodste.CodSte === codusr)
            let refste = correspondSte.RefElt
            let refdti = reccup.RefDti
            localStorage.setItem('refste', refste)
            localStorage.setItem('refdti', refdti)                
            this.$router.push('/demandeHistorique')
        },
        validST() {
            let reccup = JSON.parse(localStorage.Actif)
            let reftpt = reccup.RefTpt
            let codste = reccup.CodSte
            let reftdr = reccup.RefTdr
            let token = localStorage.Token
            let stelst = document.getElementById("listeSte").value
            let steman = document.getElementById("steman").value
            let siren = document.getElementById("siren").value
            let SsttceNom = ""            
            if (steman === "") {
                SsttceNom = stelst
            }
            else {
                SsttceNom = steman
            }
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tdr',{
                Etat: "plus",
                JSON: true,
                QuiDem: "P",
                RefTpt: reftpt,
                CodSte: codste,
                RefTdr: reftdr,
                Token: token,
                SsttceNom: SsttceNom,
                SsttceSiren: siren
            }).then(function(result){
                if (result.body.success == true){
                    location.reload()
                }
                else {
                    if(result.body.errors != undefined)
                        alert(result.body.errors.msg)
                    else if(result.body.error != undefined)
                        alert(result.body.error)
                    else 
                        alert("Une erreur indéfinie est survenue, merci de contacter votre administrateur")
                }
            })
            let reccupModAffect = document.getElementById("affect")
            reccupModAffect.style.display = "none"      
        },
         effST() {
            let reccup = document.getElementById("sous-traitance")
            reccup.style.display = "none"
            localStorage.setItem('BitST', 0)

        },
        affST() {
            let reccup = document.getElementById("sous-traitance")
            reccup.style.display = "block"
            localStorage.setItem('BitST', 1)
        },
        displaySTman() {
            let reccup = this.selectSte
            let reccupSaisieSte = document.getElementById("SaisieSte")
            if (reccup == "Société non présente dans la liste") {
                reccupSaisieSte.style.display = "block"
            } else {
                reccupSaisieSte.style.display = "none"
            }
        },
        //actions pour les boutons
        accepter() {
            let reccup = JSON.parse(localStorage.Actif)
            let reftpt = reccup.RefTpt
            let codste = reccup.CodSte
            let reftdr = reccup.RefTdr
            let token = localStorage.Token
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tdr',{
                Etat: "plus",
                JSON: true,
                QuiDem: "P",
                RefTpt: reftpt,
                CodSte: codste,
                RefTdr: reftdr,
                Token: token
            }).then(function(result){
                if (result.body.success == true){
                    this.$router.push('/mission')
                }
                else {
                    alert(result.body.errors[0].msg)
                }
            })
        },
        closeModalRefus() {
            let reccup = document.getElementById("refus")
            reccup.style.display = "none";            
        },
        refuser() {
            let serverName = localStorage.serverName
            let token = localStorage.Token
            let codusr = localStorage.CodUsr
            this.$http.post(serverName + '/include/ressources/data/get-lst-not.php?Token=' + token + '&CodUsr=' + codusr,)
            .then(function(result){
                this.arbo = result.body
                this.child = result.body[0].children
                localStorage.setItem('children', JSON.stringify(result.body[0].children))
            })
            let reccupModalRefus = document.getElementById("refus")
            reccupModalRefus.style.display = "block"
        },
        afficherArea(items, index){
                localStorage.setItem('indexChild', index)
                if(items.Libre == 1){
                    let reccup = document.getElementsByClassName('area')[index]
                    if (reccup.className == "hidden area" || reccup.className == "area hidden"){
                        reccup.classList.remove("hidden")
                    }
                    else {
                        reccup.classList.add("hidden", "area")
                    }
                }
            },
        refuserMission() {
            let reccup = JSON.parse(localStorage.Actif)
            let reftpt = reccup.RefTpt
            let codste = reccup.CodSte
            let reftdr = reccup.RefTdr
            let token = localStorage.Token
            let indexChild = localStorage.indexChild
            let child = JSON.parse(localStorage.children)
            let codnot = child[indexChild].CodNot
            let reccupNot = document.getElementsByClassName("resize-vertical")
            let notes = reccupNot[indexChild].value
            let concat = codnot +'\:'+ notes
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tdr',{
                Etat: "refu",
                JSON: true,
                QuiDem: "P",
                RefTpt: reftpt,
                CodSte: codste,
                RefTdr: reftdr,
                Token: token,
                Notes: concat
            }).then(function(result){
                if (result.body.success == true){
                    this.$router.push('/mission')
                }
                else {
                    alert(result.body.error)
                }
            })
        },
        demarrer() {
            let reccup = JSON.parse(localStorage.Actif)
            let reftpt = reccup.RefTpt
            let codste = reccup.CodSte
            let token = localStorage.Token
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tpt_Reg',{
                QuiDem: "P",
                RefTpt: reftpt,
                CodSte: codste,
                EtatTrs: "D",
                Token: token,
                Action: "E"
            }).then(function(result){
                if (result.body.success == true){
                    this.$router.push('/mission')
                }
                else {
                    alert(result.body.errors[0].msg)
                }
            })            
        },
        terminer(){
            let reccup = JSON.parse(localStorage.Actif)
            let reftpt = reccup.RefTpt
            let codste = reccup.CodSte
            let token = localStorage.Token
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tpt_Reg',{
                QuiDem: "P",
                RefTpt: reftpt,
                CodSte: codste,
                EtatTrs: "T",
                Token: token,
                Action: "E"
            }).then(function(result){
                if (result.body.success == true){
                    this.$router.push('/mission')
                }
                else {
                    alert(result.body.errors[0].msg)
                }
            })            
        },
    },
    data() {
        return {
            Tpt: JSON.parse(localStorage.Actif),
            isModalVisible: false,
            arbo: [],
            child: [],
            Dti: [],
            StrTpt: [],
            Table: [],
            Typ:[],
            Mod:[],
            contag : "",
            libaccomp:"",
            libpartic:"",
            BMR: "",
            ar: "",
            sexeP:"",
            options:"",
            ListeSte:"",
            selectSte: ""
        }
    },
    created() {
        let reccup = JSON.parse(localStorage.Actif)
        let reccupTable = JSON.parse(localStorage.Table)
        let reccupStr = JSON.parse(localStorage.Str)
        
        // find des libellés type de transport
        for (let i = 0; i < reccupStr.length; i++) {
            if(reccupStr[i].Origine !== " " ){
                let valTyp = reccupStr[i].typTpt
                let tableTyp = reccupTable.StrTypTpt.Array
                let correspondTyp = tableTyp.find(TTyp => TTyp.typTpt == valTyp)
                this.Typ[i] = correspondTyp.LibTypTpt
            }
        }
        // find des libellés mode de transport
        for (let j = 0; j < reccupStr.length; j++) {
           if(reccupStr[j].Origine !== " " ){ 
                let valMod = reccupStr[j].ModTpt
                let tableMod = reccupTable.StrModTpt.Array
                let correspondMod = tableMod.find(Tmod => Tmod.CodModTpt == valMod)
                this.Mod[j] = correspondMod.LibModTpt
           }
        }
        
        // find des libellés accompagnants
        let accomps = reccup.Accomps
        let tableAccomp = reccupTable.StrAccomp.Array
        let correspondAccomp = tableAccomp.find(Taccomps => Taccomps.Accomp == accomps)
        this.libaccomp = correspondAccomp.LibAccomp
        
        // find des libellés particularités
        let partics = reccup.Partics
        let incrementPartics = ''
        let tablePartics = reccupTable.StrPartic.Array
        for (let i = 0 ; i < partics.length ; i++){            
            let correspondPartic = tablePartics.find(Tpartic => Tpartic.Partic == partics[i])
            let transit = correspondPartic.LibPartic + ', '
            incrementPartics += transit
        }
       
        this.libpartic = incrementPartics.slice(0,-2)
        // find des libellés précautions
        let contag = reccup.Contag
        let tableContag = reccupTable.StrContag.Array
        let correspondContag = tableContag.find(Tcontag => Tcontag.CodContag == contag)
        this.contag = correspondContag.LibContag
        
        //recup et transformation du BMR
        let bmr = reccup.IsoBMR
        if (bmr === 'N'){this.BMR = "Non"}
        else if (bmr === 'O'| bmr === null){this.BMR = "Oui"}
        
        //recup et transformation du poids
        let poids = reccup.Poids
        if (poids === 0 | poids === null) {
            this.Tpt.Poids = "non renseigné"
        }else{
            this.Tpt.Poids = poids + ' kg'
        }
        
        //find des allez/retour
        let AR = reccup.TDR_AR
        if      (AR === '1') this.ar = "Oui";
        else if (AR === '0') this.ar = "Non";
        else                 this.ar = "???";
        
        //recuperer et changer le code du sexe du patient
        let sexe = reccup.Sexe
        if      (sexe === 'M') this.sexeP = "Masculin";
        else if (sexe === 'F') this.sexeP = "Feminin";
        else if (sexe === 'I') this.sexeP = "Indétérminé";
        else if (sexe === 'U') this.sexeP = "Inconnu";
        else                   this.sexeP = "???";
    },
    updated() {
        let reccupActif = JSON.parse(localStorage.Actif)        
        let reccupStr = JSON.parse(localStorage.Str)

        //mise en avant du transport concerné danss la mission
        let reccupall = document.getElementsByClassName("section-tpt")
        let reftpt = reccupActif.RefTpt
        let correspondRef = reccupStr.findIndex(Tref => Tref.RefTpt === reftpt)
        reccupall[correspondRef].className = "section-tpt highlight"
        
        //affichage du message pour le transport retour en plus
        let reccupTptRetour = document.getElementById("tptRetour")
        if(reccupActif.TDR_AR === "1"){
            reccupTptRetour.style.display = "block"
        } 
        
        // affichage conditionnel des boutons d'actions
        let tpt = this.Tpt
        let refuser = document.getElementById("refuser")
        let demarrer = document.getElementById("demarrer")
        let accepter = document.getElementById("accepter")
        let terminer = document.getElementById("terminer")
        let rejeter = document.getElementById("rejeter")
        let affecter = document.getElementById("affecter")
        let bontpt = document.getElementById("imprimer")
        let blocIdent = document.getElementById("blocIdent")
        switch (tpt.suivi){                    
            case "PRO":
                demarrer.style.display = "none"                    
                terminer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
                bontpt.style.display = "none"
                blocIdent.style.display = "none"
                if(tpt.DLimAccFormatted == "Expiré"){
                    accepter.style.display = "none"
                    refuser.style.display = "none"
                }
            break                 
            case "ACC":
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
            break             
            case "ANN": 
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
                demarrer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
                bontpt.style.display = "none"
            break
            case "REF":  
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
                demarrer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
                bontpt.style.display = "none"
            break
            case "B":
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
                demarrer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
                bontpt.style.display = "none"
            break
            case "TER":
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
                demarrer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
            break 
            case "FIN":
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
                demarrer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
            break
            case "FMI":
                refuser.style.display = "none"                    
                terminer.style.display = "none"
                accepter.style.display = "none"
                demarrer.style.display = "none"
                rejeter.style.display = "none"
                affecter.style.display = "none"
            break
            case "DEB":                  
                refuser.style.display = "none"                    
                accepter.style.display = "none"
                demarrer.style.display = "none"
                affecter.style.display = "none"
            break
        }
        //changement de la couleur de la pastille selon le sexe du patient
        let reccup = JSON.parse(localStorage.Actif)
        let sexe = reccup.Sexe
        let reccupRond = document.getElementById('pastille')
        if (sexe === 'M') {reccupRond.className = "id c-m"}
        else {reccupRond.className = "id c-w"}
        // affichage conditionnel du nom de naissance
        let nomnai = reccup.NomNai
        let reccupNom = document.getElementById('NomNai')
        if (nomnai === "") {reccupNom.style.display = "none"}
        //enlever les transports vides (rang a vide)
        let testAR = document.getElementsByClassName("testVide")
        let trs = document.getElementsByClassName("section-tpt")
        for (let i = 0; i < testAR.length; i++) {
            if (testAR[i].innerText === ""){trs[i].style.display = "none"}
        }
    } 
}