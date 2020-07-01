    import Vue from 'vue'
    import VueResource from "vue-resource"
    import VueSession from 'vue-session'
    import VueLocalStorage from 'vue-localstorage'
    
    Vue.use(VueSession)
    Vue.use(VueResource)
    Vue.use(VueLocalStorage)

export default {
    name: 'app',
    data() {
        return{
            minutesValidite : 10
        }
    },
    methods: {
        login() {
            let CodUsr = document.getElementById("CodUsr").value
            let PswUsr = document.getElementById("PswUsr").value
            let serverName = localStorage.serverName     
            let Appli = 'E'
            this.$http.post( serverName +'/include/ressources/data/login_ste.php', {
                Appli: Appli,
                CodUsr: CodUsr,
                PswUsr: PswUsr
            }).then(function (res) {
                if (res.body.success == true) {
                    this.$session.start()
                    let StrPrf = res.body.StrPrf
                    localStorage.setItem('CodUsr', StrPrf.CodUsr)
                    localStorage.setItem('Token', StrPrf.Token) 
                    localStorage.setItem('BitPREMIERFiltre', 0)
                    localStorage.setItem('BitPREMIERFiltreFactu', 0)
                    this.$router.push('/home')
                } else {
                    this.$router.push('/')
                    alert("Nom d'utilisateur et/ou mot de passe incorrect")
                }
            }, function (err) {
                console.log('err', err)
            })
        },
        modalMDP(){
            let reccupModal = document.getElementById("modaMDP")
            reccupModal.style.display = "block"
        },
        closeModal() {
            let reccupModal = document.getElementById("modaMDP")
            reccupModal.style.display = "none"
        },
        confirm(){
            let recupCodSte = document.getElementById('codste').value
            let serverName = localStorage.serverName
            this.$http.post( serverName +'/include/ressources/data/ste-cod-conf.php', {
                CodSte : recupCodSte
            }).then(function (res) {
                

                if (res.body.success == true){
                    document.getElementById('codste').setAttribute("disabled", "disabled")
                    
                    let date = new Date();
                    date.setTime(date.getTime()+(this.minutesValidite*60*1000));
                    let expires = "; expires="+date.toGMTString();
                    document.cookie = "CodeConfExpire=expiration"+expires
                    let recupConf = document.getElementById('modalConf')
                    recupConf.style.display = "block"
                    let recupConfBlock = document.getElementById('modConf')
                    recupConfBlock.style.display = "block"
                    let recupbtnC = document.getElementById('modalConfirm')
                    recupbtnC.style.display = "none"
                    alert("Votre code de confirmation temporaire a été envoyé par email.\nCe code est valide " + this.minutesValidite + " minutes.")
                }
                else {
                    alert(res.body.error)
                }
            })
        },
        codConf() {
            let recupCodSte = document.getElementById('codste').value
            let recupCodConf = document.getElementById('codConf').value.trimEnd()
            let serverName = localStorage.serverName

            if(document.cookie.indexOf('CodeConfExpire=') == -1){
                alert("Votre code a expiré (Validité : " + this.minutesValidite + ")")
                location.reload()
            }           

            this.$http.post( serverName +'/include/ressources/data/ste-cod-conf.php', {
                CodSte : recupCodSte,
                CodConf : recupCodConf
            }).then(function (res) {
                if (res.body.success == true){
                    document.getElementById('codConf').setAttribute("disabled", "disabled")
                    let recupConf = document.getElementById('modalFin')
                    recupConf.style.display = "block"
                    let recupConfBlock = document.getElementById('modMDP')
                    recupConfBlock.style.display = "block"
                    let recupbtnC = document.getElementById('modalConf')
                    recupbtnC.style.display = "none"
                }
                else {
                    alert(res.body.error)
                }
            })
        },
        verifMDP() {
            let recupMDP = document.getElementById('psw').value
            let recupMDPConf = document.getElementById('pswconf').value
            document.getElementById('modalFin').style.display = recupMDP == recupMDPConf ? "block" : "none"
        },
        changeMDP(){
            let recupCodSte = document.getElementById('codste').value
            let recupMDPConf = document.getElementById('pswconf').value
            let serverName = localStorage.serverName
            this.$http.post( serverName + '/include/ressources/data/change-psw.php', {
                CodSte : recupCodSte,
                Psw : recupMDPConf
            }).then(function (res) {
                if (res.body.success == true){
                    alert('Mot de passe mis a jour avec succès')
                    location.reload()
                }
            })            
        },
        charte () {
            let reccup = JSON.parse(localStorage.config)
            let charte = reccup.Liens.charte
            window.open(charte, "charte", "scrollbars=no, location=no, width=900, height=900, resizable=no, top=100")
        }
    },
    created() {
        let originUrl = location.host
        let lastChar = originUrl.substr(-4)
        if(lastChar == "8085"){
            let url = location.protocol + '//' + location.hostname
            localStorage.setItem('serverName', url)            
        }
        else{
            let url = location.protocol + '//' + originUrl
            localStorage.setItem('serverName', url)
        }
        let serverName = localStorage.serverName
        this.$http.post( serverName + '/include/conf/config_ste_inc.json'
        ).then(function (res) {
            let config = res.body
            let client = config.Client
            localStorage.setItem('client', client)
            localStorage.setItem('config', JSON.stringify(config))
            
            let recupInscri = document.getElementById("inscri")
            let recup = JSON.parse(localStorage.config)
            let recupChkInsci = recup.portail.elements.inscription
            if(recupChkInsci == false) {
                recupInscri.style.display = "none"
            }            
        })
    },
}