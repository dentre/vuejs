import Vue from 'vue'
import VueResource from "vue-resource"
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
import menuInscri from '@/components/menuInscri'
import footerInscri from '@/components/footerInscri'
import TabHor from '../TimeScheduler/calendar.vue'
import AGSTAND from '@/components/agrementStandar'
import AGPARTIC from '@/components/agrementParticulier'
import LibPerso from '../../../../include/LibJS';

Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

export default {
    name: 'inscription',
    components: {
        menuInscri,
        footerInscri,
        TabHor,
        AGSTAND,
        AGPARTIC
    },
    methods: {
        step01() {            
            if (this.step01errors.length > 0) {
                alert("Certains champs sont en erreur, merci de corriger votre inscription")
            } else {
                let recupNom = document.getElementById("Nom").value
                this.Nom = recupNom
                let recupRaison = document.getElementById("Raison").value
                this.Raison = recupRaison
                let recupTel = document.getElementById("Tel").value
                this.Tel = recupTel
                let recupMail = document.getElementById("Mail").value
                this.Mel = recupMail
                let recupMdp = document.getElementById("Psw").value

                let serverName = localStorage.serverName
                if (recupNom !== "" || recupMail !== "" || recupMdp !== "" || recupRaison !== "" || recupTel !== "") {
                    this.$http.post(serverName + '/include/ressources/data/set-ste-inscri.php', {
                        Step: "01",
                        Action: "insert",
                        Contact: recupNom,
                        LibSte: recupRaison,
                        TelSte: recupTel,
                        Email: recupMail,
                        PswSte: recupMdp
                    }).then(function (res) {
                        if (res.body.success == true) {
                            this.CodSte = res.body.CodSte
                            this.token = res.body.token
                            this.$http.post(serverName + '/include/ressources/data/get-stats-tdr.php?CodSte=' + res.body.CodSte + '&Token=' + res.body.token,
                            ).then(function (res) {
                                this.NomHor = res.body.NomHor
                                this.nbElt = res.body.NbElt
                            })
                            this.goToStep("02")
                            alert("Votre compte Ste a bien été crée, votre code Ste est : " + res.body.CodSte + ", un mail récapitulatif vous a été transmis")
                        }
                        else {
                            alert(res.body.error)
                        }
                    })
                }
                else {
                    alert("Tous les champs sont obligatoire")
                }
            }
        },

        step02() {
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/set-ste-inscri.php', {
                Step: "02",
                Action: "insert",
                Charte: "1",
                TDR: "1",
                CodSte: this.CodSte
            }).then(function (res) {
                if (res.body.success == true) {
                    this.token = res.body.token
                    this.goToStep("03")
                } else {
                    alert(res.body.error)
                }
            })
        },
        step03() {
            let codste = this.CodSte
            let recupCPSW = document.getElementById("formCPSW").value
            let recupRaison = document.getElementById("formRaison").value
            let recupNum = document.getElementById("formNum").value
            let recupSiren = document.getElementById("formSiren").value
            let recupNom = document.getElementById("formNom").value
            let recupAdresse = document.getElementById("formAdresse").value
            let recupCP = document.getElementById("formCP").value
            let recupVille = document.getElementById("formVille").value
            let recupTel = document.getElementById("formTel").value
            let recupMob = document.getElementById("formMob").value
            let recupFax = document.getElementById("formFax").value
            let recupBtnS03 = document.getElementById("BtnS03")
            let recupAmbNB = document.getElementById("ambNB").value
            this.AmbNB = recupAmbNB
            if (recupAmbNB == "") {
                recupAmbNB = 0
                this.AmbNB = recupAmbNB
            }
            let recupParaM = document.getElementById("paraM").checked
            let recupPsy = document.getElementById("psy").checked
            let recupPedia = document.getElementById("pedia").checked
            let recupBaria = document.getElementById("baria").checked
            let recupVslNB = document.getElementById("vslNB").value
            this.VslNB = recupVslNB
            if (recupVslNB == "") {
                recupVslNB = 0
                this.VslNB = recupVslNB
            }
            let recupTaxiNB = document.getElementById("taxiNB").value
            this.TaxiNB = recupTaxiNB
            if (recupTaxiNB == "") {
                recupTaxiNB = 0
                this.TaxiNB = recupTaxiNB
            }
            let recupTPMRNB = document.getElementById("TPMRNB").value
            this.TPMRNB = recupTPMRNB
            if (recupTPMRNB == "") {
                recupTPMRNB = 0
                this.TPMRNB = recupTPMRNB
            }
            if (this.AmbNB > 0) {
                localStorage.setItem('btnAMB', true)
            }
            else { localStorage.setItem('btnAMB', false) }
            if (this.VslNB > 0) { localStorage.setItem('btnVSL', true) }
            else { localStorage.setItem('btnVSL', false) }
            if (this.TaxiNB > 0) { localStorage.setItem('btnTAXI', true) }
            else { localStorage.setItem('btnTAXI', false) }
            if (this.TPMRNB > 0) { localStorage.setItem('btnTPMR', true) }
            else { localStorage.setItem('btnTPMR', false) }
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/set-ste-inscri.php', {
                CodSte: codste,
                Action: "insert",
                Step: "03",
                PswSte: recupCPSW,
                LibSte: recupRaison,
                Agrement: recupNum,
                Siren: recupSiren,
                Contact: recupNom,
                AdrSte: recupAdresse,
                CPost: recupCP,
                Ville: recupVille,
                TelSte: recupTel,
                SmsSte: recupMob,
                FaxSte: recupFax,
                NbAmb: recupAmbNB,
                NbVsl: recupVslNB,
                NbTpmr: recupTPMRNB,
                NbTaxi: recupTaxiNB,
                ParaMed: recupParaM,
                Psychia: recupPsy,
                Pedia: recupPedia,
                Surcharge: recupBaria
            }).then(function (res) {
                if (res.body.success == true) {
                    this.token = res.body.token
                    this.goToStep("04")
                    this.affichageS04()
                } else {
                    alert(res.body.error)
                }
            })
        },
        affichageS04() {
            //step04 btn type de vehicule
            let recupbtnAMB = document.getElementById("btnAmb")
            let recupbtnVSL = document.getElementById("btnVSL")
            let recupbtnTAXI = document.getElementById("btnTaxi")
            let recupbtnTPMR = document.getElementById("btnTPMR")
            let btnAMB = localStorage.btnAMB
            let bntVSL = localStorage.btnVSL
            let btnTAXI = localStorage.btnTAXI
            let btnTPMR = localStorage.btnTPMR
            if (btnAMB == "false" || btnAMB == "undefined") {
                recupbtnAMB.style.display = "none"
            } else { recupbtnAMB.style.display = "block" }
            if (bntVSL == "false" || bntVSL == "undefined") {
                recupbtnVSL.style.display = "none"
            } else { recupbtnVSL.style.display = "block" }
            if (btnTAXI == "false" || btnTAXI == "undefined") {
                recupbtnTAXI.style.display = "none"
            } else { recupbtnTAXI.style.display = "block" }
            if (btnTPMR == "false" || btnTPMR == "undefined") {
                recupbtnTPMR.style.display = "none"
            } else { recupbtnTPMR.style.display = "block" }
        },
        affTab(item) {
            let tabAMB = document.getElementById('tabAMB')
            let tabVSL = document.getElementById('tabVSL')
            let tabTAXI = document.getElementById('tabTAXI')
            let tabTPMR = document.getElementById('tabTPMR')
            switch (item) {
                case 'AMB':
                    tabAMB.style.display = 'block'
                    tabTAXI.style.display = 'none'
                    tabTPMR.style.display = 'none'
                    tabVSL.style.display = 'none'
                    break
                case 'VSL':
                    tabVSL.style.display = 'block'
                    tabAMB.style.display = 'none'
                    tabTAXI.style.display = 'none'
                    tabTPMR.style.display = 'none'
                    break
                case 'TAXI':
                    tabTAXI.style.display = 'block'
                    tabVSL.style.display = 'none'
                    tabAMB.style.display = 'none'
                    tabTPMR.style.display = 'none'
                    break
                case 'TPMR':
                    tabTPMR.style.display = 'block'
                    tabVSL.style.display = 'none'
                    tabAMB.style.display = 'none'
                    tabTAXI.style.display = 'none'
                    break
            }
        },
        step04() {
            let codste = this.CodSte
            let token = this.token
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/get-societe.php', {
                CodSte: codste,
                Token: token
            }).then(function (res) {
                let transmissionModes = []
                let transmissionLibelles = ["tel", "sms", "app", "web", "mel"]
                transmissionLibelles.push("telsms")
                //toujours garder a la fin (concatenation de tel et sms)
                for (let i = 0; i < transmissionLibelles.length; i++) {
                    let transmode = transmissionLibelles[i]
                    transmissionModes[transmode] = []
                    for (let j = 0; j < this.nbElt; j++) {
                        let key = parseInt(j) + 1
                        let recupID = transmode + String(j)
                        let recupRes = transmode + String(key)
                        let recupEl = document.getElementById(recupID)
                        if (transmode == "telsms") {
                            let sms = "sms" + String(key)
                            let tel = "tel" + String(key)
                            if (res.body[sms] === 1 && res.body[tel] === 1) {
                                recupEl.setAttribute('checked', 1)
                            }
                        }
                        else if (res.body[recupRes] === 1) {
                            recupEl.setAttribute('checked', 1)
                        }
                    }
                }
                this.InfoSte = res.body
            })
            let calAMB = []
            let calVSL = []
            let calTAXI = []
            let calTPMR = []
            let tabAMB = document.getElementById('tabAMB')
            let tabVSL = document.getElementById('tabVSL')
            let tabTAXI = document.getElementById('tabTAXI')
            let tabTPMR = document.getElementById('tabTPMR')
            for (let i = 0; i < tabAMB.children.length; i++) {
                if (localStorage.btnAMB == "true") {
                    let recupAMBDebut = tabAMB.children[i].children[1].children[0].children[0].children[1].value
                    let recupAMBFin = tabAMB.children[i].children[1].children[0].children[1].children[1].value
                    let labelAMBID = tabAMB.children[i].children[0].children[0].innerHTML
                    calAMB[i] = {
                        'id': labelAMBID,
                        'start': recupAMBDebut,
                        'end': recupAMBFin
                    }
                }
                if (localStorage.btnVSL == "true") {
                    let recupVSLDebut = tabVSL.children[i].children[1].children[0].children[0].children[1].value
                    let recupVSLFin = tabVSL.children[i].children[1].children[0].children[1].children[1].value
                    let labelVSLID = tabVSL.children[i].children[0].children[0].innerHTML
                    calVSL[i] = {
                        'id': labelVSLID,
                        'start': recupVSLDebut,
                        'end': recupVSLFin
                    }
                }
                if (localStorage.btnTAXI == "true") {
                    let recupTAXIDebut = tabTAXI.children[i].children[1].children[0].children[0].children[1].value
                    let recupTAXIFin = tabTAXI.children[i].children[1].children[0].children[1].children[1].value
                    let labelTAXIID = tabTAXI.children[i].children[0].children[0].innerHTML
                    calTAXI[i] = {
                        'id': labelTAXIID,
                        'start': recupTAXIDebut,
                        'end': recupTAXIFin
                    }
                }
                if (localStorage.btnTPMR == "true") {
                    let recupTPMRDebut = tabTPMR.children[i].children[1].children[0].children[0].children[1].value
                    let recupTPMRFin = tabTPMR.children[i].children[1].children[0].children[1].children[1].value
                    let labelTPMRID = tabTPMR.children[i].children[0].children[0].innerHTML
                    calTPMR[i] = {
                        'id': labelTPMRID,
                        'start': recupTPMRDebut,
                        'end': recupTPMRFin
                    }
                }
            }
            console.log(calAMB, calVSL, calTAXI, calTPMR)
            //            let calAMB = []
            //            let calVSL = []
            //            let calTAXI = []
            //            let calTPMR = []
            //            if(localStorage.btnAMB == "true"){
            //                calAMB = JSON.parse(localStorage.calendarAMB)
            //            }
            //            if(localStorage.btnVSL == "true"){
            //                calVSL = JSON.parse(localStorage.calendarVSL)
            //            }
            //            if(localStorage.btnTAXI == "true"){
            //                calTAXI = JSON.parse(localStorage.calendarTAXI)
            //            }
            //            if(localStorage.btnTPMR == "true"){
            //                calTPMR = JSON.parse(localStorage.calendarTPMR)
            //            }
            //            this.$http.post(serverName + '/include/ressources/data/set-ste-inscri.php', {
            //                CodSte: codste,
            //                Action: "insert",
            //                Step:"04",
            //                calendarAMB : calAMB,
            //                calendarVSL : calVSL,
            //                calendarTAXI : calTAXI,
            //                calendarTPMR : calTPMR               
            //            }).then(function(res) {
            //                if (res.body.success == true) {
            //                    this.token = res.body.token
            let recupTDtel = document.getElementsByClassName("telTD")
            let recupTDtelsms = document.getElementsByClassName("telsmsTD")
            let recupTDsms = document.getElementsByClassName("smsTD")
            let recupTDapp = document.getElementsByClassName("appTD")
            let recupTDweb = document.getElementsByClassName("webTD")
            let recupTDmel = document.getElementsByClassName("melTD")
            let recupConf = JSON.parse(localStorage.config)
            let transmission = recupConf.Transmission
            for (let i = 0; i < recupTDtel.length; i++) {
                if (transmission.tel == false) {
                    recupTDtel[i].setAttribute("disabled", "")
                    recupTDtelsms[i].setAttribute("disabled", "")
                }
                else if (transmission.sms == false) {
                    recupTDsms[i].setAttribute("disabled", "")
                    recupTDtelsms[i].setAttribute("disabled", "")
                }
                else if (transmission.app == false) {
                    recupTDapp[i].setAttribute("disabled", "")
                }
                else if (transmission.web == false) {
                    recupTDweb[i].setAttribute("disabled", "")
                }
                else if (transmission.mel == false) {
                    recupTDmel[i].setAttribute("disabled", "")
                }
            }
            this.goToStep("05")
            //                }
            //                else {
            //                    alert(res.body.error)
            //                }
            //            })       
        },
        step05() {
            let codste = this.CodSte
            let token = this.token
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/get-dpt.php'
            ).then(function (res) {
                this.Dpt = res.body.Array
            })
            let config = JSON.parse(localStorage.config)
            let transmissionModes = []
            let transmissionLibelles = ["tel", "sms", "app", "web", "mel", "telsms"]
            let stringAjax = ""
            for (let j = 0; j < transmissionLibelles.length; j++) {
                let transmode = transmissionLibelles[j]
                transmissionModes[transmode] = []
                for (let i = 0; i < this.nbElt; i++) {
                    let key = parseInt(i) + 1
                    let recupID = transmode + String(i)
                    transmissionModes[transmode][key] = document.getElementById(recupID).checked
                    transmissionModes[transmode][key] = transmissionModes[transmode][key] == true ? 1 : 0
                    if (transmode == "telsms" && transmissionModes[transmode][key] == 1) {
                        stringAjax += '&sms' + [key] + '=' + 1
                        stringAjax += '&tel' + [key] + '=' + 1
                    }
                    else {
                        stringAjax += '&' + transmode + [key] + '=' + transmissionModes[transmode][key]
                    }
                }
            }
            console.log(stringAjax)
            //            this.$http.post(serverName + '/include/ressources/data/set-ste-inscri.php?CodSte=' + codste + '&Action=insert&Step=05' + stringAjax, 
            //            ).then(function(res) {
            //                if (res.body.success == true) {
            //                    this.token = res.body.token
            this.goToStep("06")
            //                }
            //                else {
            //                    alert(res.body.error)
            //                }
            //            })
        },
        step06() {
            let tabAG = []
            let config = JSON.parse(localStorage.config)
            if (config.Client == "Charenton") {
                let recupblock = document.getElementsByClassName("container-agreement particulier")
                for (let i = 0; i < recupblock.length; i++) {
                    let recupTAXI = '"Taxi" : "' + recupblock[i].children[0].children[0].children[0].checked + '", '
                    let recupVSL = '"VSL" : "' + recupblock[i].children[0].children[1].children[0].checked + '", '
                    let recupAMB = '"AMB" : "' + recupblock[i].children[0].children[2].children[0].checked + '", '
                    let departements = '"departement" : "' + recupblock[i].children[1].children[1].children[0].children[0].children[1].children[0].value + '", '
                    let NumMarche = '"Numero de marche" : "' + recupblock[i].children[1].children[1].children[1].children[0].children[0].children[0].value + '", '
                    let vehiculeNB = '"nombre de vehicule" : "' + recupblock[i].children[1].children[1].children[1].children[1].children[0].children[0].value + '", '
                    let paraM = '"ParaMed" : "' + recupblock[i].children[1].children[1].children[1].children[2].children[0].children[0].children[0].checked + '", '
                    let psy = '"Psychiatrie" : "' + recupblock[i].children[1].children[1].children[1].children[2].children[0].children[1].children[0].checked + '", '
                    let pedia = '"Pediatrie" : "' + recupblock[i].children[1].children[1].children[1].children[2].children[0].children[2].children[0].checked + '", '
                    let baria = '"Bariatrie" : "' + recupblock[i].children[1].children[1].children[1].children[2].children[0].children[3].children[0].checked + '"'
                    let tabBase = '{' + recupAMB + recupVSL + recupTAXI + departements + NumMarche + vehiculeNB + paraM + psy + pedia + baria + '}'
                    tabAG.push(JSON.parse(tabBase))
                }
            }
            else {
                let recupblock = document.getElementsByClassName("container-agreement standart")
                for (let i = 0; i < recupblock.length; i++) {
                    let recupTAXI = '"Taxi" : "' + recupblock[i].children[0].children[0].children[0].checked + '", '
                    let recupVSL = '"VSL" : "' + recupblock[i].children[0].children[1].children[0].checked + '", '
                    let recupAMB = '"AMB" : "' + recupblock[i].children[0].children[2].children[0].checked + '", '
                    let departements = '"departement" : "' + recupblock[i].children[1].children[1].children[0].children[0].children[1].children[0].value + '", '
                    let villes = '"villes" : "' + recupblock[i].children[1].children[1].children[0].children[1].children[1].children[0].value + '", '
                    let agrementNB = '"agrement" : "' + recupblock[i].children[1].children[1].children[1].children[0].children[0].children[0].value + '", '
                    let vehiculeNB = '"nombre de vehicule" : "' + recupblock[i].children[1].children[1].children[1].children[1].children[0].children[0].value + '", '
                    let dateAG = '"date de validite" : "' + recupblock[i].children[1].children[1].children[1].children[2].children[0].children[0].value + '"'
                    let tabBase = '{' + recupAMB + recupVSL + recupTAXI + villes + departements + agrementNB + vehiculeNB + dateAG + '}'
                    tabAG.push(JSON.parse(tabBase))
                }
            }
            console.log(tabAG)
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/get-secteurs.php').then(function (res) {
                console.log(res.body)
            })
            this.goToStep("07")
        },
        step07() {
            this.goToStep("08")
        },
        verif(elem) {
            if (elem.target.type == "email") {
                let mail = document.getElementById("Mail")
                let mailverif = document.getElementById("MailVerif")
                let errorDiv = LibPerso.getNextSibling(elem.target, ".error")
                let errorDivVerif = LibPerso.getNextSibling(mailverif, ".error")

                if (!LibPerso.checkEmail(elem.target.value)) {
                    elem.target.classList.add("red")
                    errorDiv.innerHTML = "L'adresse email doit être au format xxxx@xxxx.xx"
                    errorDiv.style.display = "block"
                    if (!this.step01errors.includes("mail"))
                        this.step01errors.push("mail")
                }
                else {
                    elem.target.classList.remove("red")
                    errorDiv.style.display = "none"
                    this.step01errors.splice(this.step01errors.indexOf('mail'), 1 );
                }

                if (mail.value != mailverif.value) {
                    errorDivVerif.innerHTML = "L'adresse email et sa confirmation ne correspondent pas"
                    errorDivVerif.style.display = "block"
                    if (!this.step01errors.includes("mail"))
                        this.step01errors.push("mail")
                } else if (LibPerso.checkEmail(mail.value) && LibPerso.checkEmail(mailverif.value)) {
                    errorDivVerif.style.display = "none"
                    this.step01errors.splice(this.step01errors.indexOf('mail'), 1 );
                }
            
            }

            if (elem.target.type == "password") {
                console.info(LibPerso.checkPassword(elem.target.value))
            }
        },
        verif02() {


            let recupBtnS02 = document.getElementById("BtnS02")
            let recupBtnDS02 = document.getElementById("btnDS02")
            let recupRadio = document.getElementById("oui").checked
            let recupChk = document.getElementById("charte").checked
            if (recupRadio == true && recupChk == true) {
                recupBtnS02.style.display = "block"
                recupBtnDS02.style.display = "block"
            } else {
                recupBtnS02.style.display = "none"
                recupBtnDS02.style.display = "block"
            }

        },
        verif03() {
            let recupPSW = document.getElementById("formPSW").value
            let recupCPSW = document.getElementById("formCPSW").value
            let recupRaison = document.getElementById("formRaison").value
            let recupNum = document.getElementById("formNum").value
            let recupSiren = document.getElementById("formSiren").value
            let recupNom = document.getElementById("formNom").value
            let recupAdresse = document.getElementById("formAdresse").value
            let recupCP = document.getElementById("formCP").value
            let recupVille = document.getElementById("formVille").value
            let recupTel = document.getElementById("formTel").value
            let recupMob = document.getElementById("formMob").value
            let recupFax = document.getElementById("formFax").value
            let recupAmb = document.getElementById("amb").checked
            let recupBtnS03 = document.getElementById("BtnS03")
            if (recupAmb == true) {
                let recupAmbNB = document.getElementById("ambNB").value
                let recupParaM = document.getElementById("paraM").checked
                let recupPsy = document.getElementById("psy").checked
                let recupPedia = document.getElementById("pedia").checked
                let recupBaria = document.getElementById("baria").checked
            }
            let recupVsl = document.getElementById("vsl").checked
            if (recupVsl == true) {
                let recupVslNB = document.getElementById("vslNB").value
            }
            let recupTaxi = document.getElementById("taxi").checked
            if (recupTaxi == true) {
                let recupTaxiNB = document.getElementById("taxiNB").value
            }
            let recupTPMR = document.getElementById("TPMR").checked
            if (recupTPMR == true) {
                let recupTPMRNB = document.getElementById("TPMRNB").value
            }
            if (recupRaison !== "" && recupNum !== "" && recupSiren !== "" && recupNom !== "" && recupAdresse !== "" && recupCP !== "" && recupVille !== "" && recupTel !== "" && recupMob !== "") {
                recupBtnS03.style.display = "block"
            } else { recupBtnS03.style.display = "none" }
        },
        delockChk(item) {
            let recupType = item
            let recupAmb = document.getElementById("amb")
            let recupTaxi = document.getElementById("taxi")
            let recupVsl = document.getElementById("vsl")
            let recupTPMR = document.getElementById("TPMR")
            let recupParaM = document.getElementById("paraM")
            let recupPsy = document.getElementById("psy")
            let recupPedia = document.getElementById("pedia")
            let recupBaria = document.getElementById("baria")
            let recupAmbNB = document.getElementById("ambNB")
            let recupTaxiNB = document.getElementById("taxiNB")
            let recupVslNB = document.getElementById("vslNB")
            let recupTPMRNB = document.getElementById("TPMRNB")
            switch (item) {
                case "AMB":
                    recupTaxi.setAttribute("disabled", "")
                    recupParaM.removeAttribute("disabled")
                    recupPsy.removeAttribute("disabled")
                    recupPedia.removeAttribute("disabled")
                    recupBaria.removeAttribute("disabled")
                    recupAmbNB.removeAttribute("disabled")
                    if (recupAmb.checked == false) {
                        recupTaxi.removeAttribute("disabled")
                        recupParaM.setAttribute("disabled", "")
                        recupPsy.setAttribute("disabled", "")
                        recupPedia.setAttribute("disabled", "")
                        recupBaria.setAttribute("disabled", "")
                        recupAmbNB.setAttribute("disabled", "")
                    }
                    break
                case "VSL":
                    recupTaxi.setAttribute("disabled", "")
                    recupVslNB.removeAttribute("disabled")
                    if (recupTPMR.checked == false && recupVsl.checked == false && recupAmb.checked == false) {
                        recupTaxi.removeAttribute("disabled")
                        recupVslNB.setAttribute("disabled", "")
                    }
                    break
                case "TPMR":
                    recupTaxi.setAttribute("disabled", "")
                    recupTPMRNB.removeAttribute("disabled")
                    if (recupTPMR.checked == false && recupVsl.checked == false && recupAmb.checked == false) {
                        recupTaxi.removeAttribute("disabled")
                        recupTPMRNB.setAttribute("disabled", "")
                    }
                    break
                case "TAXI":
                    recupVsl.setAttribute("disabled", "")
                    recupTaxiNB.removeAttribute("disabled")
                    recupTPMR.setAttribute("disabled", "")
                    recupAmb.setAttribute("disabled", "")
                    recupParaM.setAttribute("disabled", "")
                    recupPsy.setAttribute("disabled", "")
                    recupPedia.setAttribute("disabled", "")
                    recupBaria.setAttribute("disabled", "")
                    if (recupTaxi.checked == false) {
                        recupAmb.removeAttribute("disabled")
                        recupVsl.removeAttribute("disabled")
                        recupTPMR.removeAttribute("disabled")
                        recupTaxiNB.setAttribute("disabled", "")
                    }
                    break
            }
        },
        precedent(step) {
            switch (step) {
                case "02":
                    this.goToStep("01")
                    break
                case "03":
                    this.goToStep("02")
                    break
                case "04":
                    this.goToStep("03")
                    break
                case "05":
                    this.goToStep("04")
                    break
                case "06":
                    this.goToStep("05")
                    break
                case "07":
                    this.goToStep("06")
                    break
                case "08":
                    this.goToStep("07")
                    break
            }
        },
        goToStep(step = "01") {
            for (let el of document.querySelectorAll('.section-inscription'))
                el.style.visibility = 'hidden'


            if (step == "06" && JSON.parse(localStorage.config).Client == "Charenton") {
                document.getElementById("step06BIS").style.display = "block"
            } else {
                document.getElementById("step" + step).style.display = "block"
            }

            for (let el of document.querySelectorAll('#num-steps'))
                el.style.visibility = 'hidden'

            document.getElementById("l" + step).classList = "active"
            this.NumPage = step
        },
        addAgrement() {
            this.compo.push(AGSTAND)
        },
        deleteAgrement(dataindex) {
            for (let i in this.compo) {
                if (parseInt(i) == parseInt(dataindex))
                    this.compo.splice(this.compo.indexOf(this.compo[i]), 1)
            }
        },
        affVille() {
            let serverName = localStorage.serverName
            let numDep = this.SelectDpt
            this.$http.post(serverName + '/include/ressources/data/get-Communes.php?numDep=' + numDep).then(function (res) {
                this.Communes = res.body.LstCom
                let recupSelectVille = document.getElementById('Selectville')
                recupSelectVille.removeAttribute("disabled")
            })
        }
    },
    mounted() {
        let recupStep01 = document.getElementById("step01")
        recupStep01.style.display = "block"
    },
    data() {
        let config = JSON.parse(localStorage.config)
        let serverName = localStorage.serverName
        let url = config.Liens.charte
        let charte = serverName + url
        let treedata = '[{"Secteur" : "Landes", "CodSec" : "40", "Niveau" : "0", "CodSecParent" : "null", "Zone" : [{"Secteur" : "Dax", "CodSec" : "40080", "Niveau" : "1", "CodSecParent" : "40", "Zone" : [{"Secteur" : "Gond", "CodSec" : "4008050", "Niveau" : "2", "CodSecParent" : "40080", "Zone" : ""},{"Secteur" : "Sablar", "CodSec" : "400880", "Niveau" : "2", "CodSecParent" : "40080", "Zone" : ""},{"Secteur" : "Carnot", "CodSec" : "400868", "Niveau" : "2", "CodSecParent" : "40080", "Zone" : ""}]},{"Secteur": "Mdm", "CodSec" : "40190", "Niveau" : "1", "CodSecParent" : "40", "Zone" : "" } ]}]'
        return {
            step01errors: [],
            CodSte: "",
            token: "",
            Nom: "",
            nbElt: "",
            Raison: "",
            Tel: "",
            Mel: "",
            Charte: charte,
            NumPage: "01",
            AmbNB: 0,
            VslNB: 0,
            TaxiNB: 0,
            TPMRNB: 0,
            NomHor: "",
            InfoSte: "",
            compo: [],
            Dpt: [],
            SelectDpt: "",
            Communes: [],
            SelectVille: "",
            treeData: JSON.parse(treedata)
        }
    },
}