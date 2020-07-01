import Vue from 'vue'
import VueSession from 'vue-session'
import menuLeft from '@/components/menuLeft'
import navBar from '@/components/navBar'
    
Vue.use(VueSession)

export default {
    name: 'tarif',
    components: { 
        menuLeft,
        navBar
    },    
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')            
        }
        let recup = JSON.parse(localStorage.Actif)
        let refdti = recup.RefDti
        let recupTarif = JSON.parse(localStorage.Tarif)
        let codtar = recupTarif.CodTar
        let codlot = recupTarif.CodLot
        localStorage.setItem('navTitre', 'Contrôle de facturation')
        localStorage.setItem('navMsg', 'Détail de la grille tarifaire : ' + codtar + ' (' + codlot + ')')
    },
    methods: {
        logout() {
            this.$session.destroy()
            this.$router.push('/')
        },
        goBack() {
            window.history.go(-1)
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
        SelectRadio(statut) {
            selectedRadio(statut)
        }
    },
    created() {
        let CodUsr = localStorage.CodUsr
        let Token = localStorage.Token
        let reftar = localStorage.RefTarif
        let serverName = localStorage.serverName
        this.$http.post(serverName + '/include/ressources/data/get-elt.php?TabElt=Tarif&CodElt=CodTar;Zone;TypVeh;ValDeb;ValFin;HJour;HNuit;HWend;FD;FA;PC;CmF;CmN;RemAba2;RemAba3;TarKM;MaxKmF;MaxKmP;SupAer;SupUrg;SupInc;MedicUrg;ParticInc;SupAccMed;AccMed;SupSpec;Montant;TarifQAtt;DistKMForfait;PeageDansPrix;MajoKM_OK;RemiseAnti;DetailTable;MontantSpe;CoeffDiff;DiffDebiteur;RemiseN;RemiseU;RemiseP;CmFCPAM;CmNCPAM;TypMnt&RefElt=' + reftar + '&Token=' + Token )
        .then(function(res){
            this.Fields = res.body.fields[0]
            let CodTar = res.body.fields[0].CodTar    
            this.$http.post(serverName + '/include/ressources/data/get-lst-tab.php?CodUsr=' +  CodUsr + '&Token=' + Token + '&Tab=DetailTarif&Cod=;CodTar;TrancheMin;TrancheMax;Type;Montant;Nuit;We&TabCond=CodTar=' + CodTar , ).then(function(resultat){
                this.LstElt = resultat.body.LstElt                
                selectedRadio('Base')               
                if (res.body.fields[0].DetailTable == 0){
                    let reccupTable = document.getElementById('TbDétail')
                    reccupTable.style.display = "none"
                }
            })
        })
    },
    data() {
        return {
            Actif: JSON.parse(localStorage.Actif),
            Fields: [],
            LstElt: []
        }
    }
}
function selectedRadio(statut) {
    let FD = document.getElementById('FD')
    let FA = document.getElementById('FA')
    let PC = document.getElementById('PC')
    let TarKM = document.getElementById('TarKM')
    let TarifQAtt = document.getElementById('TarifQAtt')
    let MaxKmF = document.getElementById('MaxKmF')
    let MaxKmP = document.getElementById('MaxKmP')
    let DistKMForfait = document.getElementById('DistKMForfait')
    let HJour = document.getElementById('HJour')
    let HNuit = document.getElementById('HNuit')
    let HWend = document.getElementById('HWend')
    let CmF = document.getElementById('CmF')
    let CmN = document.getElementById('CmN')
    let MajoKM_OK = document.getElementById('MajoKM_OK')
    let SupAer = document.getElementById('SupAer')
    let SupUrg = document.getElementById('SupUrg')
    let SupInc = document.getElementById('SupInc')
    let SupAccMed = document.getElementById('SupAccMed')
    let RemAba2 = document.getElementById('RemAba2')
    let RemAba3 = document.getElementById('RemAba3')
    let RemiseAnti = document.getElementById('RemiseAnti')
    let RemiseU = document.getElementById('RemiseU')
    let RemiseN = document.getElementById('RemiseN')
    let RemiseP = document.getElementById('RemiseP')
    let Montant = document.getElementById('Montant')
    let TypMnt = document.getElementById('TypMnt')
    let PeageDansPrix = document.getElementById('PeageDansPrix')
    let SupSpec = document.getElementById('SupSpec')
    let DetailTable = document.getElementById('DetailTable')
    let TbDétail = document.getElementById('TbDétail')
    FD.setAttribute('hidden', '')
    FA.setAttribute('hidden', '')
    PC.setAttribute('hidden', '')
    TarKM.setAttribute('hidden', '')
    TarifQAtt.setAttribute('hidden', '')
    MaxKmF.setAttribute('hidden', '')
    MaxKmP.setAttribute('hidden', '')
    DistKMForfait.setAttribute('hidden', '')
    HJour.setAttribute('hidden', '')
    HNuit.setAttribute('hidden', '')
    HWend.setAttribute('hidden', '')
    CmF.setAttribute('hidden', '')
    CmN.setAttribute('hidden', '')
    MajoKM_OK.setAttribute('hidden', '')
    SupAer.setAttribute('hidden', '')
    SupUrg.setAttribute('hidden', '')
    SupInc.setAttribute('hidden', '')
    SupAccMed.setAttribute('hidden', '')
    RemAba2.setAttribute('hidden', '')
    RemAba3.setAttribute('hidden', '')
    RemiseAnti.setAttribute('hidden', '')
    RemiseU.setAttribute('hidden', '')
    RemiseN.setAttribute('hidden', '')
    RemiseP.setAttribute('hidden', '')
    Montant.setAttribute('hidden', '')
    TypMnt.setAttribute('hidden', '')
    PeageDansPrix.setAttribute('hidden', '')
    SupSpec.setAttribute('hidden', '')
    DetailTable.setAttribute('hidden', '')
    TbDétail.setAttribute('hidden', '')
    switch (statut) {
        case "Base":
            FD.removeAttribute('hidden')
            FA.removeAttribute('hidden')
            PC.removeAttribute('hidden')
            TarKM.removeAttribute('hidden')
            TarifQAtt.removeAttribute('hidden')
            MaxKmF.removeAttribute('hidden')
            MaxKmP.removeAttribute('hidden')
            DistKMForfait.removeAttribute('hidden')
        break
        case "Horaires":
            HJour.removeAttribute('hidden')
            HNuit.removeAttribute('hidden')
            HWend.removeAttribute('hidden')
        break
        case "Majoration":
            CmF.removeAttribute('hidden')
            CmN.removeAttribute('hidden')
            MajoKM_OK.removeAttribute('hidden')
        break
        case "Supplement":
            SupAer.removeAttribute('hidden')
            SupUrg.removeAttribute('hidden')
            SupInc.removeAttribute('hidden')
            SupAccMed.removeAttribute('hidden')
        break
        case "Remise":
            RemAba2.removeAttribute('hidden')
            RemAba3.removeAttribute('hidden')
            RemiseAnti.removeAttribute('hidden')
            RemiseU.removeAttribute('hidden')
            RemiseN.removeAttribute('hidden')
            RemiseP.removeAttribute('hidden')
        break
        case "MontantSpec":
            Montant.removeAttribute('hidden')
            TypMnt.removeAttribute('hidden')
            PeageDansPrix.removeAttribute('hidden')
            SupSpec.removeAttribute('hidden')
            DetailTable.removeAttribute('hidden')
            TbDétail.removeAttribute('hidden')
        break
        case "Tout":
            FD.removeAttribute('hidden')
            FA.removeAttribute('hidden')
            PC.removeAttribute('hidden')
            TarKM.removeAttribute('hidden')
            TarifQAtt.removeAttribute('hidden')
            MaxKmF.removeAttribute('hidden')
            MaxKmP.removeAttribute('hidden')
            DistKMForfait.removeAttribute('hidden')
            HJour.removeAttribute('hidden')
            HNuit.removeAttribute('hidden')
            HWend.removeAttribute('hidden')
            CmF.removeAttribute('hidden')
            CmN.removeAttribute('hidden')
            MajoKM_OK.removeAttribute('hidden')
            SupAer.removeAttribute('hidden')
            SupUrg.removeAttribute('hidden')
            SupInc.removeAttribute('hidden')
            SupAccMed.removeAttribute('hidden')
            SupAer.removeAttribute('hidden')
            SupUrg.removeAttribute('hidden')
            SupInc.removeAttribute('hidden')
            SupAccMed.removeAttribute('hidden')
            RemAba2.removeAttribute('hidden')
            RemAba3.removeAttribute('hidden')
            RemiseAnti.removeAttribute('hidden')
            RemiseU.removeAttribute('hidden')
            RemiseN.removeAttribute('hidden')
            RemiseP.removeAttribute('hidden')
            Montant.removeAttribute('hidden')
            TypMnt.removeAttribute('hidden')
            PeageDansPrix.removeAttribute('hidden')
            SupSpec.removeAttribute('hidden')
            DetailTable.removeAttribute('hidden')
            TbDétail.removeAttribute('hidden')
        break
    }
}