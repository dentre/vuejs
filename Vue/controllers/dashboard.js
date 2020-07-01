import Vue from 'vue'
import VueResource from "vue-resource"
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'
import Multiselect from 'vue-multiselect'
import LibPerso from '../../../../include/LibJS.js'

Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

export default {
    name: 'dashboard',
    components: {
        menuLeft,
        navBar,
        Multiselect
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
        localStorage.setItem('navTitre', 'Société')
        localStorage.setItem('navMsg', 'Liste de sociétés')

        let serverName = localStorage.serverName
        let codste = localStorage.CodUsr
        let token = localStorage.Token
        this.$http.post(serverName + '/include/ressources/data/get-stats-tdr.php?CodSte=' + codste + '&Token=' + token).then(function (res) {
            this.NomHor = res.body.NomHor
            this.nbElt = res.body.NbElt
        })
        this.$http.post(serverName + '/include/ressources/data/get-lst-Ste.php', {
            CodSte: localStorage.CodUsr,
            Token: token
        }).then(function (resultat) {
            this.Ste = resultat.body.LstElt
        })
        this.$http.post(serverName + '/include/ressources/data/get-lst-PcaPartic.php',
        ).then(function (resultat) {
            this.lstPartics = resultat.body.LstPartics
        })
    },
    data() {
        return {
            nbHoraires : 6,
            informationsIncorrectes: [],
            Ste: [],
            lstPartics: [],
            nbElt: '',         
            particOkCheck: [],
            particKoCheck: [],
            InfoSte: [],
            NomHor: [],
            NomSte: "",
            AdrSte: "",
            CodPSte: "",
            VilSte: "",
            TelSte: "",
            SmsSte: "",
            Email: "",
            Contact: "",
            ParticOk:"",
            ParticKo:"",
            HorAmb: "",
            HorVsl: "",
            ParaMed: "",
            Psychiatrie: "",
            Bariatrique: "",
            Pediatrie: "",
            HorDebTdrAMB: [],            
            HorFinTdrAMB: [],            
            HorDebTdrTAP: [],            
            HorFinTdrTAP: [],            
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$session.destroy()
            this.$router.push('/')
        },
        pushSte(item) {
            localStorage.setItem('ste_actif', item.CodSte)
            this.$router.push('/zone')
        },
        showModal(item) {
            let codste = item.CodSte
            localStorage.setItem('codsteActif', item.CodSte)
            let Token = localStorage.Token
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/get-societe.php', { CodSte: codste, Token: Token }).then(function (res) {
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

                let recupTDtel = document.getElementsByClassName("telTD")                                
                let transmission = JSON.parse(localStorage.config).Transmission
                for (let i = 0; i < recupTDtel.length; i++) {
                    if (transmission.tel == false) {
                        recupTDtel[i].setAttribute("disabled", "")
                        document.getElementsByClassName("telsmsTD")[i].setAttribute("disabled", "")
                    }
                    if (transmission.sms == false) {
                        document.getElementsByClassName("smsTD")[i].setAttribute("disabled", "")
                        document.getElementsByClassName("telsmsTD")[i].setAttribute("disabled", "")
                    }
                    if (transmission.app == false) {
                        document.getElementsByClassName("appTD")[i].setAttribute("disabled", "")
                    }
                    if (transmission.web == false) {
                        document.getElementsByClassName("webTD")[i].setAttribute("disabled", "")
                    }
                    if (transmission.mel == false) {
                        document.getElementsByClassName("melTD")[i].setAttribute("disabled", "")
                    }
                }
                this.InfoSte = res.body
                this.NomSte = res.body.LibSte
                this.AdrSte = res.body.AdrSte
                this.CodPSte = res.body.CPoste
                this.VilSte = res.body.VilSte
                this.TelSte = res.body.TelSte
                this.SmsSte = res.body.SmsSte
                this.Email = res.body.Email
                this.Contact = res.body.Contact
                let strPOK = res.body.ParticOk
                let tabPOK = Array.from(strPOK)                            
                this.particOkCheck = tabPOK
                let strPKO = res.body.ParticKo
                let tabPKO = Array.from(strPKO)
                this.particKoCheck = tabPKO                
                this.HorAmb = res.body.HorAmb
                this.HorVsl = res.body.HorVsl
                this.ParaMed = res.body.ParaMed
                this.Psychiatrie = res.body.Psychiatrie
                this.Bariatrique = res.body.Surcharge
                this.Pediatrie = res.body.Pediatrie
                for(let i = 1; i <= this.nbHoraires; i++){
                    this.HorDebTdrAMB[i] = eval("res.body.HorDebTdrAMB"+i)
                    this.HorFinTdrAMB[i] = eval("res.body.HorFinTdrAMB"+i)
                    this.HorDebTdrTAP[i] = eval("res.body.HorDebTdrTAP"+i)
                    this.HorFinTdrTAP[i] = eval("res.body.HorFinTdrTAP"+i)                    
                }                
            })
            let reccupModal = document.getElementById("modalIG")
            this.afficheInfoSection("infos")
            reccupModal.style.display = "block"

        },
        checkEmail(event) {
            let errorDiv = LibPerso.getNextSibling(event.target, ".error")
            errorDiv.innerHTML = "L'email doit être au format xx@xx.x"

            if (LibPerso.checkEmail(event.target.value)) {
                errorDiv.style.display = "none"
                LibPerso.key_unset(this.informationsIncorrectes, 'email')
            } else {
                errorDiv.style.display = "block"
                if (!this.informationsIncorrectes.includes("email"))
                    this.informationsIncorrectes.push("email")
            }
        },
        closeModal() {
            document.getElementById("modalIG").style.display = "none"
        },
        chgMdp() {
            this.$http.post(localStorage.serverName + '/include/ressources/data/change-psw.php', {
                CodSte: localStorage.codsteActif,
                Token: localStorage.Token,
                Psw: document.getElementById("cfMdp").value
            }).then(function (res) {
                if (res.body.success == true) {
                    alert("Mot de passe mis à jour avec succès")
                } else {
                    alert("Echec de la mise à jour du mot de passe")
                }
            })
        },
        chgMdpPT() {
            this.$http.post(localStorage.serverName + '/include/ressources/data/set-infos-ptahtpt.php', {
                CodSte: localStorage.codsteActif,
                Token: localStorage.Token,
                PswMob: document.getElementById("recupMdpPT").value
            }).then(function (res) {
                if (res.body.success == true) {
                    alert("Mot de passe mis à jour avec succès")
                } else if (res.body.success == false) {
                    alert("Echec de la mise à jour du mot de passe")
                }
            })
        },
        checkMdp() {
            let recupBtn = document.getElementById("btnPsw")
            let recupChgMdp = document.getElementById("chgMdp")
            let recupCfMdp = document.getElementById("cfMdp")
            if (recupCfMdp.value !== recupChgMdp.value || recupChgMdp.value == "") {
                recupBtn.className = "button-valider disable"
                recupBtn.setAttribute("disabled", "")
            }
            else {
                recupBtn.className = "button-valider"
                recupBtn.removeAttribute("disabled")
            }
        },
        checkMdpPT() {
            let recupBtn = document.getElementById("btnPswPT")
            let recupChgMdp = document.getElementById("chgMdpPT")
            let recupCfMdp = document.getElementById("recupMdpPT")
            if (recupCfMdp.value !== recupChgMdp.value || recupChgMdp.value == "") {
                recupBtn.className = "button-valider disable"
                recupBtn.setAttribute("disabled", "")
            }
            else {
                recupBtn.className = "button-valider"
                recupBtn.removeAttribute("disabled")
            }
        },
        afficheInfoSection(section = "infos") {
            document.getElementById("modTransmissions").style.display = "none"
            document.getElementById("modHoraires").style.display = "none"
            document.getElementById("modInfos").style.display = "none"
            document.getElementById("modParametrage").style.display = "none"
            document.getElementById("ongletInfos").classList.remove("active")
            document.getElementById("ongletHoraires").classList.remove("active")
            document.getElementById("ongletTransmissions").classList.remove("active")
            document.getElementById("ongletParametrage").classList.remove("active")
            switch (section) {
                case "infos":
                    document.getElementById("modInfos").style.display = "block"
                    document.getElementById("ongletInfos").classList.add("active")
                    break;
                case "horaires":
                    document.getElementById("modHoraires").style.display = "block"
                    document.getElementById("ongletHoraires").classList.add("active")
                    break;
                case "parametrage":
                    document.getElementById("modParametrage").style.display = "block"
                    document.getElementById("ongletParametrage").classList.add("active")
                    break;
                case "transmissions":
                    document.getElementById("modTransmissions").style.display = "block"
                    document.getElementById("ongletTransmissions").classList.add("active")
                    break;
            }
        },
        enregistrerInfos() {
            if (this.informationsIncorrectes.length > 0) {
                alert("Certains champs sont en erreur, merci de corriger vos informations")  
            } else {
                let CodSte = localStorage.codsteActif
                let Token = localStorage.Token
                let ParticOk = this.particOkCheck.toString().replace(/,/g, "")
                let ParticKo = this.particKoCheck.toString().replace(/,/g, "")
                let NomSte = document.getElementById('NomSte').value
                let AdrSte = document.getElementById('AdrSte').value
                let CPoste = document.getElementById('CPoste').value
                let VilSte = document.getElementById('VilSte').value
                let TelSte = document.getElementById('TelSte').value
                let SmsSte = document.getElementById('SmsSte').value
                let Email = document.getElementById('Email').value
                let Contact = document.getElementById('Contact').value
                let ParaMed = document.getElementById('checkbox-2').checked ? 1 : 0
                let Psychiatrie = document.getElementById('checkbox-3').checked ? 1 : 0
                let Bariatrique = document.getElementById('checkbox-4').checked ? 1 : 0
                let Pediatrique = document.getElementById('checkbox-5').checked ? 1 : 0 
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
                let HorAmb = document.getElementById('HorAmb').value
                let HorVsl = document.getElementById('HorAmb').value

                let strHoraires = ""
                for(let i=1; i <= this.nbHoraires; i++){
                    strHoraires += '&HorDebTdrAMB'+i+'=' + document.getElementById('HorDebTdrAMB'+i).value
                    strHoraires += '&HorFinTdrAMB'+i+'=' + document.getElementById('HorFinTdrAMB'+i).value
                    strHoraires += '&HorDebTdrTAP'+i+'=' + document.getElementById('HorDebTdrTAP'+i).value
                    strHoraires += '&HorFinTdrTAP'+i+'=' + document.getElementById('HorFinTdrTAP'+i).value
                }
                
                this.$http.post(localStorage.serverName + '/include/ressources/data/set-societe.php?CodSte=' +  localStorage.codsteActif + '&Token=' + localStorage.Token + '&nomSte=' + NomSte + '&AdrSte=' + AdrSte + '&CPost=' + CPoste + '&Ville=' + VilSte + '&Tel=' + TelSte + '&Sms=' + SmsSte + '&Email=' + Email + '&Contact=' + Contact + '&ParticOk=' + ParticOk + '&ParticKo=' + ParticKo + '&ParaMed=' + ParaMed + '&Psychiatrie=' + Psychiatrie + '&Bariatrie=' + Bariatrique + '&Pediatrie=' + Pediatrique + '&HorAmb=' + HorAmb + '&HorVSL=' + HorVsl + strHoraires + stringAjax).then(function (res) {
                    if (res.body.success == true) {
                        location.reload()
                    } else {
                        alert(res.body.error)
                    }
                })
            }
        }
    },
    updated() {
        //gestion du controle des champs de changement de mdp
        let recupBtn = document.getElementById("btnPsw")
        let recupChgMdp = document.getElementById("chgMdp")
        let recupCfMdp = document.getElementById("cfMdp")
        if (recupCfMdp.value !== recupChgMdp.value || recupChgMdp.value == "") {
            recupBtn.className = "button-valider disable"
            recupBtn.setAttribute("disabled", "")
        }
        else {
            recupBtn.className = "button-valider"
            recupBtn.removeAttribute("disabled")
        }
        //gestion des infos vides
        let recup = this.InfoSte
        let codste = localStorage.CodUsr
        if (recup.Radio == '' || recup.Radio == 0) {
            this.InfoSte.Radio = codste
        }

        this.InfoSte.Https_PtahTpt = recup.Https_PtahTpt ? "Oui" : "Non"        
    }
}