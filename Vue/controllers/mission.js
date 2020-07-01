import Vue from 'vue'
import VueResource from "vue-resource"
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'
import HotelDatePicker from 'vue-hotel-datepicker'
import LibPerso from '../../../../include/LibJS.js'
Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

export default {
    name: 'mission',
    components: {
        menuLeft,
        navBar,
        HotelDatePicker
    },
    beforeCreate() {
        if (!localStorage.activiteCurrentPage >= 1) {
            localStorage.setItem("activiteCurrentPage", 1)
        }
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
        // Pour savoir si on revient sur Activité ou Journal
        if (localStorage.fenetreMission !== undefined) {
            this.fenetre = localStorage.fenetreMission
        } else {
            localStorage.setItem('fenetreMission', 'Activite')
        }

        localStorage.setItem('navTitre', 'Missions')
        localStorage.setItem('navMsg', 'Liste des missions')
    },
    created() {
        affTableau(this)
        let myInstance = this
        this.timer = setInterval(function () { affTableau(myInstance) }, 180000)
        manageDelais(myInstance)
    },
    mounted() {
        LibPerso.konamiCode()
        //gestion de relances des filtres
        this.activiteFiltres = getStoredFilters("Activite")
        this.journalFiltres = getStoredFilters("Journal")
        // passage a l'état proposé par defaut
        if (localStorage.BitPREMIERFiltre == 0) {
            setDefaultFiltres(this)
        }
        filtreInit(this)
    },
    watch: {
        search() {
            this.rechercheRapide()
        },
        fenetre() {
            this.closeModalMenu()
            this.refresh()
        },
        currentPage() {
            localStorage.setItem("activiteCurrentPage", this.currentPage)
        }
    },
    data() {
        return {
            counterG: 0,
            activiteFiltres: [],
            journalFiltres: [],
            Tpt: [],
            timer: '',
            stockTpt: [],
            storeTab: "",
            tabDelai: [],
            currentSort: 'RefTpt',
            currentSortDir: 'asc',
            pageSize: 12,
            currentPage: 1,
            search: '',
            searchNTpt: '',
            searchDate: '',
            searchArrivée: '',
            searchDépart: '',
            searchPatient: '',            
            counterStatut: [],
            statuts: ['PRO', 'ACC', 'DEB', 'ANN', 'TER', 'AUT'],            
            isModalVisible: false,
            arbo: [],
            child: [],
            rangEtRetour: "",
            dataModal: "",
            options: "",
            ListeSte: "",
            selectSte: "",
            searchDateDeb: '',
            searchDateFin: '',
            fenetre: 'Activite',
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
    computed: {
        sortedTpt() {
            return this.Tpt.sort((a, b) => {
                let modifier = 1
                let aSort = a[this.currentSort]
                let bSort = b[this.currentSort]
                if (this.currentSortDir === 'desc') modifier = -1;
                if (aSort < bSort) return -1 * modifier;
                if (aSort > bSort) return 1 * modifier;
                return 0;
            }).filter((row, index) => {
                if (localStorage.backToActivite == 1) {
                    this.currentPage = localStorage.activiteCurrentPage
                    localStorage.removeItem("backToActivite")
                }
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },
        filteredTpt() {
            return this.sortedTpt.filter((item) => {
                let tpt = JSON.parse(this.storeTab)
                this.Tpt = tpt
                return tpt
            })
        },        
        nbPages() {
            let P = this.Tpt.length / this.pageSize
            let Pfin = Math.ceil(P)
            return Pfin
        }
    },
    methods: {
        counter() {
            let counterG = 0            
            for (let i in this.statuts){
                counterG += this.counterStatut[this.statuts[i]]
            }                        
            return counterG
        },
        rechercheRapide() {
            let tpt = JSON.parse(localStorage.storeTpt)
            let mysearch = LibPerso.RemoveAccents(this.search.toUpperCase())
            for (let ligne = 0; ligne < tpt.length; ligne++) {
                let showLigne = false
                let columns = ["Ident", "suivi", "RefTpt", "DateAccTdr", "LibPartics", "DateTpt", "LibEtbDep", "VilEtbDep", "DateArr", "LibEtbArr", "VilEtbArr", "DateRdv"]
                for (columns in tpt[ligne]) {
                    let valeur = LibPerso.RemoveAccents(tpt[ligne][columns])
                    if (typeof valeur === 'string' && columns.includes(columns)) {
                        if (valeur.toUpperCase().match(mysearch)) {
                            showLigne = true
                            if (mysearch.length > 0) {
                                let depart = valeur.toUpperCase().match(mysearch).index
                                let fin = mysearch.length
                                tpt[ligne][columns] = LibPerso.markage(valeur, depart, fin)
                            }
                        }
                    }
                }
                if (showLigne == false) {
                    tpt.splice(ligne, 1)
                    ligne--
                }
            }
            this.Tpt = tpt
        },
        logout() {
            localStorage.clear()
            this.$session.destroy()
            this.$router.push('/')
        },
        sort(s) {
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
        nextPage() {
            if ((this.currentPage * this.pageSize) < this.Tpt.length) this.currentPage++
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--
        },
        finPage() {
            this.currentPage = this.nbPages
        },
        debutPage() {
            this.currentPage = 1
        },
        blockVisible() {
            let reccupBlock = document.getElementById("blockFiltres")
            reccupBlock.classList.add("is-visible")
        },
        blockInvisible() {
            let reccupBlock = document.getElementById("blockFiltres")
            reccupBlock.classList.remove("is-visible")
        },
        refreshtab() {
            this.refresh()
            clearInterval(this.timer)
        },
        showModal(item, event) {
            let tpt = this.dataModal = item
            //appel du tableau de correspondance, labels
            this.$http.post(localStorage.serverName + '/include/ressources/data/get-all-init.php?TypDti=U&Token=' + localStorage.Token).then(function (result) {
                localStorage.setItem('Table', JSON.stringify(result.body.Str[0]))
                let refdti = item.RefDti
                //appel de la demande en JSON
                this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Dti_Json&Token=' + localStorage.Token, {
                    RefDti: refdti
                }).then(function (res) {
                    localStorage.setItem('Str', JSON.stringify(res.body.StrDti[0].StrTpt))
                    // affichage conditionnel des boutons d'actions
                    hideByIds(["demarrer", "terminer", "rejeter", "refuser", "detail", "archiver", "accepter", "historique", "nbSeances", "affecter", "menuPossible", "bontpt"])
                    switch (tpt.suivi) {
                        case "PRO":
                            if (tpt.NombIte !== undefined) {
                                showById("nbSeances")
                            }
                            if (tpt.DLimAcc > 0) {
                                showByIds(["accepter", "refuser", "menuPossible"])
                            }
                            showById("detail")
                            break
                        case "ATT":
                            showByIds(["historique", "refuser", "detail", "menuPossible", "bontpt"])
                            break
                        case "ACC":
                            showByIds(["affecter", "historique", "demarrer", "rejeter", "detail", "menuPossible", "bontpt"])
                            break
                        case "ANN":
                        case "REF":
                            showByIds(["historique", "detail"])
                            break
                        case "B":
                            showById("historique")
                            break
                        case "TER":
                        case "FIN":
                        case "FMI":
                            showByIds(["historique", "detail", "bontpt"])
                            break
                        case "DEB":
                            showByIds(["historique", "terminer", "rejeter", "detail", "menuPossible", "bontpt"])
                            break
                    }

                    document.getElementById("modalMenu").style.display = "block"
                    let y = event.clientY

                    if (y > window.innerHeight / 2) {
                        y -= 260
                    }
                    document.getElementById("modalMenu").style.top = y + 'px'
                    document.getElementById("modalMenu").style.left = event.clientX + 'px'
                })
            })
        },
        closeModalMenu() {
            document.getElementById("modalMenu").style.display = "none"
        },
        closeModalRefus() {
            document.getElementById("refus").style.display = "none"
        },
        pushDetail(selectedTpt) {
            if (this.fenetre == "Journal")
                this.demande(selectedTpt)
            else {
                //appel du tableau de correspondance, labels
                this.$http.post(localStorage.serverName + '/include/ressources/data/get-all-init.php?TypDti=U&Token=' + localStorage.Token).then(function (result) {
                    localStorage.setItem('Table', JSON.stringify(result.body.Str[0]))
                    this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Dti_Json', {
                        RefDti: selectedTpt.RefDti,
                        Token: localStorage.Token
                    }).then(function (res) {
                        localStorage.setItem('Str', JSON.stringify(res.body.StrDti[0].StrTpt))
                        let stringTptActif = LibPerso.unmark(JSON.stringify(selectedTpt))
                        localStorage.setItem('Actif', stringTptActif)
                        this.$router.push('/detailMission')
                    })
                })
            }
        },
        demande(item) {
            window.open(localStorage.serverName + "/include/ressources/data/Bon_Ste.php?RefTpt=" + item.RefTpt, "Demande", "scrollbars=no, location=no, width=900, height=900, resizable=no, top=100")
        },
        mobile() {
            document.getElementById("main").className = "dashboard-main blur wrap-mobile"
            document.getElementById("burger").className = "navleft navleft-container nav-fix"
        },
        mobileCache() {
            document.getElementById("main").className = "dashboard-main"
            document.getElementById("burger").className = "navleft navleft-container"
        },
        clear() {
            location.reload()
        },
        refresh() {
            affTableau(this)
        },
        bonTpt() {
            let fichier = "Bon_ste.php"
            if (localStorage.client == "Charenton") {
                fichier = "Fax_ste.php"
            }
            window.open(localStorage.serverName + '/include/ressources/data/' + fichier + '?RefTpt=' + this.dataModal.RefTpt)
        },
        histo() {
            let reccupste = JSON.parse(localStorage.ste)
            let correspondSte = reccupste.find(Tcodste => Tcodste.CodSte === localStorage.CodUsr)
            localStorage.setItem('Ident', this.dataModal.Ident)
            localStorage.setItem('refste', correspondSte.RefElt)
            localStorage.setItem('refdti', this.dataModal.RefDti)
            this.$router.push('/demandeHistorique')
        },
        linkFenetre(fenetre) {
            filtreEmpty(this)
            this.fenetre = fenetre
            this.currentPage = 1
            localStorage.setItem("activiteCurrentPage", 1)
            localStorage.setItem("fenetreMission", fenetre)
        },
        filtre(statut) {
            toggleFiltre(this, statut)
            filtreInit(this)
            affTableau(this)
        },
        //actions pour les boutons
        archiver() {
            this.$http.post(localStorage.serverName + '/include/ressources/data/set-elt.php?ActElt=Mod&CodElt=ManAnnul=1&TabElt=Pca_&RefElt=' + this.DataModal.RefAff + '&Token=' + localStorage.Token).then(function (res) {
                let msgVal = ''
                if (msgVal === "OK") {
                    location.reload()
                }
            })
        },
        showModalAffect() {
            document.getElementById("affect").style.display = "block"
            document.getElementById("modalMenu").style.display = "none"
            //recuperation de la liste des sociétés
            this.$http.post(localStorage.serverName + '/include/ressources/data/get-all-societe.php', {
                Dispo: "O",
                Token: localStorage.Token
            }).then(function (result) {
                this.ListeSte = result.body.LstElt
            })
        },
        closeModalAffect() {
            document.getElementById("affect").style.display = "none"
        },
        validSousTraitant() {
            let SsttceNom = ""
            if (document.getElementById("steman").value === "") {
                SsttceNom = document.getElementById("listeSte").value
            } else {
                SsttceNom = document.getElementById("steman").value
            }
            this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tdr', {
                Etat: "plus",
                JSON: true,
                QuiDem: "P",
                RefTpt: this.dataModal.RefTpt,
                CodSte: this.dataModal.CodSte,
                RefTdr: this.dataModal.RefTdr,
                Token: localStorage.Token,
                SsttceNom: SsttceNom,
                SsttceSiren: document.getElementById("siren").value
            }).then(function (result) {
                if (result.body.success == true) {
                    location.reload()
                } else {
                    alert(result.body.errors.msg)
                }
            })
        },
        displaySousTraitantManuel() {
            if (this.selectSte == "SocieteManuel") {
                document.getElementById("SaisieSte").style.display = "block"
            } else {
                document.getElementById("SaisieSte").style.display = "none"
            }
        },
        accepter() {
            this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tdr', {
                Etat: "plus",
                JSON: true,
                QuiDem: "P",
                RefTpt: this.dataModal.RefTpt,
                CodSte: this.dataModal.CodSte,
                RefTdr: this.dataModal.RefTdr,
                Token: localStorage.Token
            }).then(function (result) {
                if (result.body.success == true) {
                    location.reload()
                } else {
                    alert(result.body.error)
                }
            })
        },
        refuser() {
            this.$http.post(localStorage.serverName + '/include/ressources/data/get-lst-not.php?Token=' + localStorage.Token)
                .then(function (result) {
                    this.arbo = result.body
                    this.child = result.body[0].children
                    localStorage.setItem('children', JSON.stringify(result.body[0].children))
                })
            document.getElementById("refus").style.display = "block"
            document.getElementById("modalMenu").style.display = "none"
        },
        afficherArea(items, index) {
            localStorage.setItem('indexChild', index)
            if (items.Libre == 1) {
                let zoneCommentaire = document.getElementsByClassName('area')[index]
                if (zoneCommentaire.className == "hidden area" || zoneCommentaire.className == "area hidden") {
                    zoneCommentaire.classList.remove("hidden")
                } else {
                    zoneCommentaire.classList.add("hidden", "area")
                }
            }
        },
        RefuserMission() {
            let child = JSON.parse(localStorage.children)
            let notes = document.getElementsByClassName("resize-vertical")[localStorage.indexChild].value
            let concat = child[localStorage.indexChild].CodNot + '\:' + notes

            this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tdr', {
                Etat: "refu",
                JSON: true,
                QuiDem: "P",
                RefTpt: this.dataModal.RefTpt,
                CodSte: this.dataModal.CodSte,
                RefTdr: this.dataModal.RefTdr,
                Token: localStorage.Token,
                Notes: concat
            }).then(function (result) {
                if (result.body.success == true) {
                    location.reload()
                } else {
                    alert(result.body.error)
                }
            })
        },
        demarrer() {
            this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tpt_Reg', {
                QuiDem: "P",
                RefTpt: this.dataModal.RefTpt,
                CodSte: this.dataModal.CodSte,
                EtatTrs: "D",
                Token: localStorage.Token,
                Action: "E"
            }).then(function (result) {
                if (result.body.success == true) {
                    location.reload()
                } else {
                    alert(result.body.errors[0].msg)
                }
            })
        },
        terminer() {
            this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Tpt_Reg', {
                QuiDem: "P",
                RefTpt: this.dataModal.RefTpt,
                CodSte: this.dataModal.CodSte,
                EtatTrs: "T",
                Token: localStorage.Token,
                Action: "E"
            }).then(function (result) {
                if (result.body.success == true) {
                    location.reload()
                } else {
                    alert(result.body.errors[0].msg)
                }
            })
        },
        DateDebut(newDate) {
            this.searchDateDeb = newDate
        },
        DateFin(newDate) {
            this.searchDateFin = newDate
            this.currentPage = 1
            affTableau(this)
        }
    },
    updated() {
        document.getElementById("link-activite").classList.remove("active")
        document.getElementById("link-journal").classList.remove("active")
        document.getElementById("link-" + this.fenetre.toLowerCase()).classList.add("active")
        let tpt = this.dataModal
        //affichage du message pour le transport retour en plus
        let reccupTptRetour = document.getElementById("tptRetour")
        if (tpt.TDR_AR === "1") {
            reccupTptRetour.style.display = "block"
        }
        //gestion des pastille couleurs
        let recupLst = this.filteredTpt
        for (let i = 0; i < recupLst.length; i++) {
            let ciblePastille = document.getElementsByClassName("pastilleEtat")[i]
            let cibleCheck = document.getElementsByClassName("trCheck")[i]

            if (recupLst[i].suivi == "PRO" || recupLst[i].suivi == "ACC") {
                ciblePastille.className = "pastilleEtat " + recupLst[i].suivi
                cibleCheck.classList.remove("ann")
            }
            else if (isAnn(recupLst[i])) {                
                ciblePastille.className = "pastilleEtat ANN"
                cibleCheck.classList.add("ann")
            }
            else if (recupLst[i].suivi == "DEB") {
                ciblePastille.className = "pastilleEtat DEB"
                cibleCheck.classList.remove("ann")
            }
            else if (recupLst[i].suivi == "FMI" || recupLst[i].suivi == "FIN" || recupLst[i].suivi == "TER") {
                ciblePastille.className = "pastilleEtat TER"
                cibleCheck.classList.remove("ann")
            }
            else{
                ciblePastille.className = "pastilleEtat AUT"
                cibleCheck.classList.remove("ann")
            }  
        }
    }
}
function affTableau(instance) {
    //filtreEmpty(instance)
    //instance.closeModalMenu()
    LibPerso.showSpinner()
    // Activité ou journal ?
    instance.fenetre = localStorage.fenetreMission
    let listeMissions = instance.fenetre == "Activite" ? "SteA" : "SteJ"
    let paramAjax = {
        Liste: listeMissions,
        CodSte: localStorage.ListeSte,
        Token: localStorage.Token,
        Version: 2
    }

    if (!(instance.searchDateDeb == undefined && instance.searchDateFin == undefined) && !(instance.searchDateDeb == "" && instance.searchDateFin == "")) {
        paramAjax.DateTpt = LibPerso.dateEnToFr(instance.searchDateDeb) + ';' + LibPerso.dateEnToFr(instance.searchDateFin)
    }

    instance.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Tpt_Reg', paramAjax).then(function (res) {
        filtreInit(instance)
        localStorage.setItem('storeTpt', JSON.stringify(res.body.LstTpt))
        instance.Tpt = res.body.LstTpt
        //transformation du rangTpt pour integrer le +Retour
        let tabTransports = res.body.LstTpt        
        for(let i in instance.statuts){
            instance.counterStatut[instance.statuts[i]] = 0
        }
        for (let i = 0; i < tabTransports.length; i++) {
            let afficheLigne = false
            // rien coché, on affiche tout
            if ((instance.activiteFiltres.length == 0 && instance.fenetre == "Activite") || (instance.journalFiltres.length == 0 && instance.fenetre == "Journal")) {
                afficheLigne = true
            }
            // gestion du nom de naissance
            if (tabTransports[i].NomNai != "") {
                tabTransports[i].Ident = tabTransports[i].Nom + " (" + tabTransports[i].NomNai + "), " + tabTransports[i].Prenom
            }
            if (tabTransports[i].RangTpt !== "R" && tabTransports[i].TDR_AR === "1") {
                tabTransports[i].RangTpt += "R"
            }
            //changement du format date
            if (tabTransports[i].DateTpt.length == 8) {
                let depdate = tabTransports[i].DateTpt.slice(0, -2)
                let findate = tabTransports[i].DateTpt.slice(6)
                instance.Tpt[i].DateTpt = depdate + "20" + findate
            }
            // compteurs et affichage conditionné aux filtres
            if ((tabTransports[i].suivi == "FIN" || tabTransports[i].suivi == "FMI" || tabTransports[i].suivi == "TER")  && this.fenetre == "Journal" ) {
                instance.counterStatut['TER']++
                if ((instance.activiteFiltres.indexOf('TER') != -1 && this.fenetre == "Activite") || (instance.journalFiltres.indexOf('TER') != -1 && this.fenetre == "Journal")) {
                    afficheLigne = true
                }
            }
            if (tabTransports[i].suivi == "DEB" && this.fenetre == "Activite") {
                instance.counterStatut['DEB']++
                if (instance.activiteFiltres.indexOf('DEB') != -1) {
                    afficheLigne = true
                }
            }
            if (tabTransports[i].suivi == "PRO" && this.fenetre == "Activite") {
                instance.counterStatut['PRO']++
                if (instance.activiteFiltres.indexOf('PRO') != -1) {
                    afficheLigne = true
                }
            }
            if (tabTransports[i].suivi == "ACC" && this.fenetre == "Activite") {
                instance.counterStatut['ACC']++
                if (instance.activiteFiltres.indexOf('ACC') != -1) {
                    afficheLigne = true
                }
            }
            if ((tabTransports[i].suivi == 'DEB') && this.fenetre == "Journal") {
                instance.counterStatut['AUT']++
                if (instance.journalFiltres.indexOf('AUT') != -1) {
                    afficheLigne = true                    
                }
            }
            if (isAnn(tabTransports[i])) {
                instance.counterStatut['ANN']++
                tabTransports[i].suivi = "ANN"
                if ((instance.activiteFiltres.indexOf('ANN') != -1 && this.fenetre == "Activite") || (instance.journalFiltres.indexOf('ANN') != -1 && this.fenetre == "Journal")) {
                    afficheLigne = true
                }
            }
            if (afficheLigne == false) {
                tabTransports.splice(i, 1)
                i--
            }
        }
        instance.storeTab = JSON.stringify(tabTransports)
        instance.Tpt = tabTransports
        instance.counterG = instance.counter()
        LibPerso.hideSpinner()
        if (document.getElementById("counter-missions")) document.getElementById("counter-missions").style.display = "inline"
    })
}

function manageDelais(instance, addvalue = 0) {
    for (let i = 0; i < instance.filteredTpt.length; i++) {
        let fDLim = Number(instance.filteredTpt[i].DLimAcc)
        if (instance.filteredTpt[i].suivi == "PRO" && fDLim > 0) {
            instance.filteredTpt[i].DLimAcc = fDLim + addvalue
            instance.filteredTpt[i].DLimAccFormatted = LibPerso.secondsToHMS(instance.filteredTpt[i].DLimAcc)
        }
        else if (instance.filteredTpt[i].suivi == "PRO" && fDLim <= 0) {
            instance.filteredTpt[i].DLimAccFormatted = "Expiré"
        }
    }
    setTimeout(function () {
        manageDelais(instance, -1)
    }, 1000)
}

function filtreEmpty() {
    let clist = document.getElementsByClassName("checkboxStatutMission")
    for (let i = 0; i < clist.length; ++i) {
        clist[i].checked = false
    }
}

function filtreInit(instance) {
    instance.activiteFiltres = getStoredFilters("Activite")
    instance.journalFiltres = getStoredFilters("Journal")
    instance.currentPage = 1
    filtreEmpty()
    let filtres = instance.fenetre == "Activite" ? instance.activiteFiltres : instance.journalFiltres
    for (let i = 0; i < filtres.length; i++) {
        document.getElementById("ico" + filtres[i]).checked = true
    }
}

function isAnn(transport) {
    //return (transport.suivi == "ANN" || (transport.Liste == 'J' && (transport.EtatTpt == 'A' || transport.EtatTpt == 'X' || transport.EtatTpt == 'F')))
    return (transport.suivi == "ANN")
}

function setDefaultFiltres(instance) {
    instance.activiteFiltres = ["PRO"]
    instance.journalFiltres = ["TER"]
    localStorage.setItem("activiteFiltres", JSON.stringify(instance.activiteFiltres))
    localStorage.setItem("journalFiltres", JSON.stringify(instance.journalFiltres))
    localStorage.setItem('BitPREMIERFiltre', 1)
}

// récupère les filtres stockés dans le localstorage
function getStoredFilters(fenetre) {
    if (fenetre == "Journal")
        return localStorage.journalFiltres == undefined ? [] : JSON.parse(localStorage.journalFiltres)
    else if (fenetre == "Activite")
        return localStorage.activiteFiltres == undefined ? [] : JSON.parse(localStorage.activiteFiltres)
}

// Ajoute ou supprime un filtre
function toggleFiltre(instance, filtre) {
    let filtres = instance.fenetre == "Activite" ? instance.activiteFiltres : instance.journalFiltres
    if (filtres.indexOf(filtre) == -1)
        filtres.push(filtre)
    else
        filtres.splice(filtres.indexOf(filtre), 1)

    let itemToStore = "activiteFiltres"
    if (instance.fenetre == "Journal") {
        itemToStore = "journalFiltres"
    }
    localStorage.setItem(itemToStore, JSON.stringify(filtres))
}

function hideById(elemId) {
    document.getElementById(elemId).style.display = "none"
}

function showById(elemId, type = "block") {
    document.getElementById(elemId).style.display = type
}

function hideByIds(elemsArray) {
    for (let i in elemsArray) {
        hideById(elemsArray[i])
    }
}

function showByIds(elemsArray) {
    for (let i in elemsArray) {
        showById(elemsArray[i])
    }
}