import Vue from 'vue'
import VueSession from 'vue-session'
import modal from '@/components/modal_litige'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'

Vue.use(VueSession)

export default {
    name: 'detail',
    components: {
        modal,
        menuLeft,
        navBar,
    },
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }        
        localStorage.setItem('navTitre', 'Contrôle avant facturation')
        localStorage.setItem('navMsg', 'Détail du transport valorisé pour la demande ' + JSON.parse(localStorage.Actif).RefDtiPtah)          
    },
    
    methods: {
        logout: function () {
            this.$session.destroy()
            this.$router.push('/')
        },
        goBack() {
            localStorage.removeItem('Actif')
            localStorage.setItem('backToFactu', 1)
            window.history.go(-1)
        },
        goTarif() {
            let tarif = JSON.stringify(this.Factu)
            localStorage.setItem('Tarif', tarif)
            this.$router.push('/tarif')
        },
        detailPrec() {            
            if (localStorage.BitP === "1") {                                
                document.getElementById("ctnBtn").className = "section section-fact annim"                
                localStorage.setItem('TptSuiv', localStorage.Actif)
                localStorage.setItem('Actif', localStorage.TptPrec)                
                localStorage.removeItem('TptPrec')
                localStorage.setItem('BitS', 1)
                localStorage.setItem('BitP', 0)
                this.Actif = JSON.parse(localStorage.Actif)
                AffDetail(this)
                setTimeout(function () {
                    document.getElementById("ctnBtn").className = "section section-fact"
                }, 500)
            }
        },
        detailSuiv() {            
            if (localStorage.BitS === "1") {                                
                document.getElementById("ctnBtn").className = "section section-fact annim"                
                localStorage.setItem('TptPrec', localStorage.Actif)
                localStorage.setItem('Actif', localStorage.TptSuiv)                
                localStorage.removeItem('TptSuiv')
                localStorage.setItem('BitS', 0)
                localStorage.setItem('BitP', 1)
                this.Actif = JSON.parse(localStorage.Actif)
                AffDetail(this)
                setTimeout(function () {
                    document.getElementById("ctnBtn").className = "section section-fact"
                }, 500)

            }
        },
        valider() {
            let tptActif = JSON.parse(localStorage.Actif)
            let refTptPC2 = tptActif.RefTpt //Ptah
            let refTptPCA = tptActif.RefTptPtah 
            if (confirm("Etes-vous sûr de vouloir valider le transport valorisé " + refTptPCA)) {
                let reccupste = JSON.parse(localStorage.ste)
                // reccuperation du refSte (RefElt)                
                let correspondSte = reccupste.find(Tcodste => Tcodste.CodSte === localStorage.CodUsr)
                let refste = correspondSte.RefElt                
                this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_EtatFact', {
                    RefSte: refste,
                    QuiDem: 'P',
                    RefTpt: refTptPC2,
                    EtatFact: 'SOK',
                    Token: localStorage.Token,
                }).then(function (res) {
                    if (res.statusText === "OK") {
                        this.$router.push('/factu')
                    }
                })
            }
            localStorage.setItem("codVal", 1)
            localStorage.setItem("codLit", 0)
            localStorage.setItem("msgVAL", "Transport valorisé " + refTptPCA + " validé (n°de demande " + tptActif.RefDtiPtah + ")")
        },
        invalider() {
            let tptActif = JSON.parse(localStorage.Actif)
            let refTptPC2 = tptActif.RefTpt // Ref PC2
            let refTptPCA = tptActif.RefTptPtah // Ref PCA
            
            if (confirm("Etes-vous sûr de vouloir invalider le transport valorisé " + refTptPCA)) {
                // reccuperation du refSte (RefElt)                
                let correspondSte = JSON.parse(localStorage.ste).find(Tcodste => Tcodste.CodSte === localStorage.CodUsr)
                
                this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_EtatFact', {
                    RefSte: correspondSte.RefElt,
                    QuiDem: 'P',
                    RefTpt: refTptPC2,
                    EtatFact: 'VAM',
                    Token: localStorage.Token,
                }).then(function (res) {
                    if (res.statusText === "OK") {
                        this.$router.push('/factu')
                    }
                })
            }
        },
        pieces_jointes() {            
            document.getElementById("modal_PJ").style.display = "block"
            let tptActif = JSON.parse(localStorage.Actif)                                    
            // reccuperation du refSte (RefElt)            
            let correspondSte = JSON.parse(localStorage.ste).find(Tcodste => Tcodste.LibSte === tptActif.LibSte)            
            
            this.$http.post(localStorage.serverName + '/include/ressources/data/get-com-litige.php', {
                RefTpt: tptActif.RefTpt,
                RefSte: correspondSte.RefElt,
                Token: localStorage.Token
            }).then(function (res) {
                if (res.body.length > 0) {
                    document.getElementById("txtblock").value = res.body[0].LibCom
                    this.LitigeCom = res.body[0].LibCom
                    localStorage.setItem('litige', JSON.stringify(res.body[0]))
                }
                else {
                    localStorage.setItem('litige', JSON.stringify([]))
                }
            })
        },
        validerCom() {            
            let recupLitige = JSON.parse(localStorage.litige)
            let recup = JSON.parse(localStorage.Actif)                                    
            let reccupste = JSON.parse(localStorage.ste)            
            let correspondSte = reccupste.find(Tcodste => Tcodste.CodSte === codusr)
            this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Gest_Litige', {
                RefSte: correspondSte.RefElt,
                QuiDem: 'P',
                RefTpt: recup.RefTpt,
                LibCom: this.LitigeCom,
                PrixS: recupLitige.Prix,
                CodNot: recupLitige.CodNot,
                Token: localStorage.Token,
                CodUsr: localStorage.CodUsr
            }).then(function (res) {
                if (res.body.success == true) {
                    location.reload()
                }
            })
        },
        litige() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false            
            document.getElementById("modal_PJ").style.display = "none"            
            this.counterPJ = this.uploadedFiles.length + this.tabdoc.length
        },
        mobile() {            
            document.getElementById("burger").className = "navleft navleft-container nav-fix"
            document.getElementById("main").className = "dashboard-main blur wrap-mobile"
        },
        mobileCache() {            
            document.getElementById("burger").className = "navleft navleft-container"
            document.getElementById("main").className = "dashboard-main"
        },
        Upload(instanceFille = false) {
            let authorizedFormats = [
                'image/jpeg', 'image/png', 'application/pdf'
            ]
            let formData = new FormData()
            let tptActif = JSON.parse(localStorage.Actif)
            let correspondSte = JSON.parse(localStorage.ste).find(Tcodste => Tcodste.LibSte === tptActif.LibSte)
            let input = !instanceFille ? document.querySelector("#recupFileMod").files : document.querySelector("#recupFile").files
            let fileArray = Array.from(input);
            let typeErrorsMessage = ""
            for (let i = 0; i < fileArray.length; i++) {
                if (!authorizedFormats.includes(fileArray[i].type)) {
                    typeErrorsMessage += ("Fichier " + fileArray[i].name + " : format non autorisé \n")
                    fileArray.splice(i, 1)
                    i--
                }
                else if (fileArray[i].size > 2048000) {
                    typeErrorsMessage += ("Fichier " + fileArray[i].name + " : fichier trop volumineux (> 2MO) \n")
                    fileArray.splice(i, 1)
                    i--
                }
                else {
                    formData.append('InputName[]', fileArray[i])
                }
            }
            if (typeErrorsMessage != "") {
                alert(typeErrorsMessage)
            }
            let transfert = Array.from(fileArray)
            if (!instanceFille)                 
                this.uploadedFiles = this.uploadedFiles.concat(transfert)
            else
                instanceFille.uploadedFiles = instanceFille.uploadedFiles.concat(transfert)
            if (transfert.length > 0) {
                this.$http.post(localStorage.serverName + '/include/ressources/data/uploadDoc.php?CodUsr=' + localStorage.CodUsr + '&Token=' + localStorage.Token + '&CodSte=' + correspondSte.CodSte + '&ID=' + tptActif.RefTpt + '&Origine=PtahSte', formData).then(function (res) {
                    if (res.body.success == false) {
                        alert(res.body.message)
                    }
                })
            }
        },
        RecupUpload(item) {
            let tptActif = JSON.parse(localStorage.Actif)
            let reccupste = JSON.parse(localStorage.ste)                        
            let correspondSte = reccupste.find(Tcodste => Tcodste.LibSte === tptActif.LibSte)
            window.open(localStorage.serverName + '/include/ressources/data/downloadDoc.php?Origine=PtahSte&CodSte=' + correspondSte.CodSte + '&FileName=' + item.FileName + '&ID=' + tptActif.RefTpt + '&Token=' + localStorage.Token + '&CodUsr=' + localStorage.CodUsr )
        },
        deleteDoc(item, index) {
            if (confirm("Etes vous sur de vouloir supprimer cette pièce jointe ?")) {
                let tptActif = JSON.parse(localStorage.Actif)            
                let reccupste = JSON.parse(localStorage.ste)                
                let correspondSte = reccupste.find(Tcodste => Tcodste.LibSte === tptActif.LibSte)                
                this.$http.post(localStorage.serverName + '/include/ressources/data/deleteDoc.php?CodSte=' + correspondSte.CodSte + '&ID=' + tptActif.RefTpt + '&FileName=' + item.name + '&Origine=PtahSte&CodUsr=' + localStorage.CodUsr + '&Token=' + localStorage.Token,
                ).then(function (res) {
                    let msg = res.body.message
                    if (msg == "Fichier supprime") {
                        let origine = this.uploadedFiles
                        if (origine.length > 1) {
                            origine.splice(index, 1)
                            this.uploadedFiles = origine
                        }
                        else {
                            this.uploadedFiles = []
                        }
                    }
                })
            }
        },
        deleteDocG(item, index) {
            if (confirm("Etes vous sur de vouloir supprimer cette pièce jointe ?")) {
                let tptActif = JSON.parse(localStorage.Actif)
                let reccupste = JSON.parse(localStorage.ste)                
                let correspondSte = reccupste.find(Tcodste => Tcodste.LibSte === tptActif.LibSte)                                               
                this.$http.post(localStorage.serverName + '/include/ressources/data/deleteDoc.php?CodSte=' + correspondSte.CodSte + '&ID=' + tptActif.RefTpt + '&FileName=' + item.FileName + '&Origine=PtahSte&Token=' + localStorage.Token    + '&CodUsr=' + tptActif.LibSte,
                ).then(function (res) {
                    let msg = res.body.message
                    if (msg == "Fichier supprime") {
                        let origine = this.tabdoc
                        if (origine.length > 1) {
                            origine.splice(index, 1)
                            this.tabdoc = origine
                        }
                        else {
                            this.tabdoc = []
                        }
                    }
                })
            }
        },
        limite(maxlength) {
            let reccupTxt = document.getElementById("txtblock").value
            if (reccupTxt.length > maxlength) {
                reccupTxt = reccupTxt.substring(0, maxlength)
                alert('Votre texte ne doit pas dépasser ' + maxlength + ' caractères!')
            }
        }
    },
    mounted() {         
        let instance = this
        this.IntervalCheckStatut = setInterval(function(){
            checkStatut(instance)
        },10000) 
    },
    data() {
        return {
            Actif: JSON.parse(localStorage.Actif),
            isModalVisible: false,
            uploadedFiles: [],
            tabdoc: [],
            reftpt: localStorage.reftpt,
            Factu: [],
            Articles: [],
            Partics: [],
            CalculFact: "",
            counterPJ: "",
            Rang: "",
            LitigeCom:"",
            IntervalCheckStatut:false
        }
    },
    beforeDestroy(){
        clearInterval(this.IntervalCheckStatut)
    },
    created() {
        AffDetail(this)        
        let tptActif = JSON.parse(localStorage.Actif)
        let reccupste = JSON.parse(localStorage.ste)        
        let correspondSte = reccupste.find(Tcodste => Tcodste.LibSte === tptActif.LibSte)        
        if (this.Actif.EtatFact == 4 || this.Actif.EtatFact == 'Litige déclaré') {
            this.$http.post(localStorage.serverName + '/include/ressources/data/affDoc.php?Origine=PtahSte&CodSte=' + correspondSte.CodSte + '&ID=' + tptActif.RefTpt + '&Token=' + localStorage.Token + '&CodUsr=' + localStorage.CodUsr)
                .then(function (result) {
                    this.tabdoc = result.body.body.length > 0 ? Array.from(result.body.body) : []
                    this.counterPJ = this.tabdoc.length
                })
        }
    },
    updated() {        
        //gestion des affichages des boutons Precedant et Suivant
        let recupS = document.getElementById("btnSuiv")
        let recupP = document.getElementById("btnPrec")
        let recupBitS = localStorage.BitS
        let recupBitP = localStorage.BitP
        if (recupBitS == 1) {
            recupS.className = "detail arrow right"
            recupP.className = "detail arrow left disable"            
        }
        else if (recupBitP == 1) {
            recupS.className = "detail arrow right disable"
            recupP.className = "detail arrow left"            
        }
        else {           
            recupS.style.display = "none"
            recupP.style.display = "none"
        }
        let reccup = JSON.parse(localStorage.Actif)
        // affichage Allez/Retour
               
        this.Rang = reccup.RangTpt == "R" ? "Retour" : "Aller"
        
        //changement du genre
        let recupFactu = this.Factu
        let sexe = recupFactu.Sexe
        if (sexe === 'M' || sexe === 'Masculin') {
            this.Factu.Sexe = 'Masculin'
        }
        else if (sexe === 'F' || sexe === 'Feminin') {
            this.Factu.Sexe = 'Feminin'
        }

        //gestion du vehicule
        let recupVeh = this.Factu.TypVeh
        if (recupVeh == "A" || recupVeh == "Ambulance") {
            this.Factu.TypVeh = "Ambulance"
        }
        else if (recupVeh == "V" || recupVeh == "VSL") {
            this.Factu.TypVeh = "VSL"
        }

        let recupPastille = document.getElementById("pastille")
        let etat = reccup.EtatFact
        let valider = document.getElementById("btnValider")
        let litige = document.getElementById("btnLitige")
        let invalider = document.getElementById("btnInValider")
        let retour = document.getElementById("btnRetour")
        let piecesJointes = document.getElementById("btnPJ")
        let recupCalcul = this.CalculFact

        litige.style.display = "none"
        invalider.style.display = "none"
        piecesJointes.style.display = "none"
        valider.style.display = "none"
    
        if (recupCalcul == "OK" & etat == "Litige déclaré") {            
            valider.style.display = "inline-block"            
            piecesJointes.style.display = "inline-block"
            retour.style.display = "inline-block"
            recupPastille.className = "pastillenbrtpt sko"
        }
        if (recupCalcul == "OK" & etat == "Validé par la société") {            
            litige.style.display = "inline-block"
            invalider.style.display = "inline-block"            
            retour.style.display = "inline-block"
            recupPastille.className = "pastillenbrtpt sok"
        }
        if (recupCalcul == "OK" & etat == "Controlé en amont") {            
            valider.style.display = "inline-block"
            litige.style.display = "inline-block"            
            retour.style.display = "inline-block"
            recupPastille.className = "pastillenbrtpt vam"
        }

        if (recupCalcul == "Impossible") {       
            retour.style.display = "inline-block"            
            localStorage.removeItem('TptPrec')
            localStorage.removeItem('TptSuiv')
            recupPastille.style.display = "none"
        }
    }
}

function AffDetail(instance) {    
    let tptActif = JSON.parse(localStorage.Actif)        
    instance.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Fac_Tpt', {
        RefTpt: tptActif.RefTpt,
        Liste: 'Det',
        Token: localStorage.Token,
        CodUsr: localStorage.CodUsr
    }).then(function (res) {
        if (res.body != null) {
            let euros = res.body.Detail[0].Articles
            for (let i = 0; i < euros.length; i++) {
                if (euros[i].Unite == 'E') { euros[i].Unite = '€' }
            }
            let debit = res.body.Detail[0]
            if (debit.AC == 'H') debit.AC = "Hôpital" 
            if (debit.AC == 'P') debit.AC = "Patient" 
            if (debit.AC == 'I') debit.AC = "Indeterminé" 
            if (debit.AC == 'S') debit.AC = "CPAM" 
            instance.Factu = res.body.Detail[0]
            instance.Articles = res.body.Detail[0].Articles            
            localStorage.setItem('RefTarif', res.body.Detail[0].RefTarif)
            instance.Partics = res.body.Detail[0].Partics
            instance.CalculFact = "OK"
        }
        else {
            instance.CalculFact = "Impossible"
            instance.Factu = []
            instance.Articles = []
        }
        //gestion du prix négocié
        if(res.body.Detail[0].Prix != res.body.Detail[0].PrixFin) {
            document.getElementById('prixBase').style.textDecoration = "line-through"
            document.getElementById('prixNegoBlock').style.display = "flex"
        }
    })
}

function checkStatut(instance){        
    instance.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Fac_Tpt', {
        RefTpt: JSON.parse(localStorage.Actif),
        Liste: 'Det',
        Token: localStorage.Token,
        CodUsr: localStorage.CodUsr
    }).then(function (res) {        
        if (res.body != null) {
            if(res.body.Detail[0].EtatFactCar != instance.Actif.EtatFactCar){
                clearInterval(instance.IntervalCheckStatut)
                alert("L'état du transport valorisé vient d'être modifié par l'administrateur, vous allé être redirigé vers la liste des transports")                
                instance.$router.push('/factu')
            }            
        }        
    })   
}
