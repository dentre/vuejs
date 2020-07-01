import Vue from 'vue'
import VueSession from 'vue-session'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'

Vue.use(VueSession)

export default {
    name: 'home',
    components: { 
        menuLeft,
        navBar,
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')            
        }
        localStorage.setItem('navTitre', 'Menu d\'accueil')
        localStorage.setItem('navMsg', 'Chiffres clés')
        let serverName = localStorage.serverName
    },
    created() {        
        horloge(this)
        let serverName = localStorage.serverName
        //stockage du delai d'archivage
        let token = localStorage.Token
        let codusr = localStorage.CodUsr
        this.$http.post( serverName + '/include/ressources/data/get-elt.php?RefElt=0/1&TabElt=PcaStd&CodElt=TdrArchi&Token=' + token + '&CodUsr=' + codusr ).then(function(res){
            let DelaiArchi = res.body.fields[0].TdrArchi
            localStorage.setItem('DelaiArchi', DelaiArchi)
        })
    },
    mounted(){               
        let serverName = localStorage.serverName
        let token = localStorage.Token
        this.$http.post(serverName + '/include/ressources/data/get-lst-Ste.php', {
            CodSte: localStorage.CodUsr,
            Token: token
        }).then(function(resultat){
            let ste =  resultat.body.LstElt
            let concat = ''
            localStorage.setItem('ste', JSON.stringify(resultat.body.LstElt))
            for (let i = 0 ; i < ste.length ; i++) {
                let recupCodste = ste[i].CodSte
                concat += recupCodste + ","
            }
            let ListeSte = concat.slice(0,-1)
            localStorage.setItem('ListeSte', ListeSte)
            let reccup = resultat.body.LstElt
            let codusr = localStorage.CodUsr
            let correspondSte = reccup.find(Tcodste => Tcodste.CodSte === codusr)
            let refste = correspondSte.RefElt
            this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Tpt_Reg', {
                Liste: 'SteA',
                CodSte: localStorage.ListeSte,
                Version: 2,
                Token: token
            }).then(function (res) {
                let reccup = res.body.LstTpt
                let counterPRO = 0
                let montantMission  = 0
                for (let i = 0; i < reccup.length; i++) {
                    //counter
                    if (reccup[i].suivi == "PRO") {
                        let montantMissionRecup = Number(reccup[i].Prix)
                        montantMission += montantMissionRecup                    
                        counterPRO++
                        this.counterPRO = counterPRO
                    }
                }             
                
                this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Pca_Fac_Tpt',{
                    Liste:'Ste',
                    RefSte: refste,
                    Token: token
                }).then(function(result){
                    let reccupTpt = result.body.DtiFact
                    let counterFACT = 0
                    let montantDti = 0
                     
                    for (let i = 0; i < reccupTpt.length; i++) {
                        let lstTpt = reccupTpt[i].LstTpt 
                        for (let j = 0; j < lstTpt.length; j++) {
                            if(lstTpt[j].EtatFact == 3){ 
                                let montantrecup = Number(lstTpt[j].Prix)
                                montantDti += montantrecup
                                counterFACT++
                            }
                        } 
                    }
                    this.montantDti = montantDti.toFixed(2)
                    this.counterFACT = counterFACT
                    this.montantMission = montantMission.toFixed(2)                    

                    
                    document.getElementById("textMission").style.display = counterPRO == 0 ? "none" : "block" 
                    document.getElementById("PasMission").style.display = counterPRO == 0 ? "block" : "none"                      

                    document.getElementById("textFactu").style.display = counterFACT == 0 ? "none" : "block" 
                    document.getElementById("PasFactu").style.display = counterFACT == 0 ? "none" : "none"                     
                    
                    // Affichage de tous les blocs après remplissage de leurs textes pour éviter les scintillements
                    document.getElementById("blocs-home").style.display = "block"
                })
            })
        })
    },
    data() {
        return {
            finaleDate:'',
            heures:'',
            counterPRO:'',
            counterFACT:'',
            montantDti:'',
            montantMission:''
        }
    },
    updated(){
       
    }
}

function twoDigit(n) {
    return (n < 10 ? '0' : '') + n
}

function horloge(instance) {    
    let dateHome = new Date()
    let options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
    instance.finaleDate = dateHome.toLocaleDateString('fr-CA', options)
    let doubleminutes = twoDigit(dateHome.getMinutes())
    instance.heures = dateHome.getHours() + "h" + doubleminutes    
    setTimeout(function(){
        horloge(instance)
    },1000)
}
