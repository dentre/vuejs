<template>
  <div class="wrapper-modal">
    <div class="wrapper-modal-inside">
        <div class="modal-inside">
            <div class="modal-wrap modal-wrap-md is-visible modal-inside-panel modal-litige">
                <a class="modal-close" @click="close()"></a>
                <div class="wrapper-modal-content">
                    <h2>Sélectionnez un motif à votre litige</h2>
                     <div v-for="(item, index) in arbo">
                        <div>{{item.text}}</div>
                        <div v-for="(items, index) in child">
                            <div>
                                <div class="input-check">
                                    <input name="checkbox-name" type="checkbox" @click="recupCodNot(items)">
                                    <label class="check-label">{{items.text}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="area">
                        <div class="c-note">
                            <form class="form form-modal">
                                <div class="input-field">
                                    <label>Décrivez votre litige *</label>
                                    <textarea class="resize-vertical" id="txtLibCom" v-on:keyup="limite(300)"  placeholder="Commentaire libre"></textarea> 
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <form class="form form-modal">
                          <div class="input-field">
                            <label> Montant souhaité : (montant initial : {{Actif.Prix}}€)</label>
                            <input id="PrixS" type="number" placeholder="€" class="form-control" min="0.00" max="10000.00" step="0.01" >   
                            </div>
                        </form>
                    </div>
                    <div class="container-upload">
                        <div class="section-files">
                            <div>
                                <h4> {{uploadedFiles.length}} fichier(s) chargé(s).</h4>
                                <div class="list-unstyled bloc-file">
                                    <div v-for="(item, index) in uploadedFiles" class="bloc-item-file">
                                        <p>{{item.name}}</p>
                                        <button @click="deleteDoc(item, index)" class="btn-trash"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-drop">
                            <form enctype="multipart/form-data" novalidate="novalidate">
                                <h4>Chargez de nouvelles pièces jointes (2 mo max formats : jpg, jpeg, png, pdf) :</h4>
                                <div class="dropbox">
                                    <input id="recupFile" class="input-file litigeFile" multiple="multiple" name="InputName[]" type="file" @change="Upload()">
                                    <p>Cliquez ou faites glisser vos pièces jointes ici</p>
                                </div><!---->
                            </form>
                        </div><!---->
                    </div>
                    <div class="hr"></div>
                    <div class="container-btn">
                        <div id ='btnVal' style="display:none" class="button-valider" @click="validerLitige()"> Déclarer le litige</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from "vue-resource"
    import VueSession from 'vue-session'
    import VueLocalStorage from 'vue-localstorage'

    Vue.use(VueSession)
    Vue.use(VueResource)
    Vue.use(VueLocalStorage)

    export default {
        name: 'modal',
        methods: {
            close() {
                this.$emit('close');
            },
            Verif(){
                let recupMotif = document.getElementById('txtLibCom').value
                let btnVal = document.getElementById('btnVal')
                if (recupMotif != "" ) {
                    btnVal.style.display = "inline-block"
                } else {
                    btnVal.style.display = "none"
                }
            },
            Upload() {
                this.$parent.Upload(this);        
            },
            recupCodNot(items){
                let recup = items.CodNot
                localStorage.setItem('Motif', recup)
            },
            deleteDoc(item, index) {
                let tptActif = JSON.parse(localStorage.Actif)
                let reccupste = JSON.parse(localStorage.ste)                
                let correspondSte = reccupste.find(Tcodste => Tcodste.LibSte === tptActif.LibSte)                
                let recupIndex = index
                this.$http.post(localStorage.serverName + '/include/ressources/data/deleteDoc.php?CodSte=' + correspondSte.CodSte + '&ID=' + tptActif.RefTpt + '&FileName=' + item.name +'&Origine=PtahSte&CodUsr=' + localStorage.CodUsr + '&Token=' + localStorage.Token,
                ).then(function(res){
                    let msg = res.body.message
                    if (msg == "Fichier supprime"){
                        let origine = this.uploadedFiles
                        if (origine.length>1){                        
                        origine.splice(index, 1)
                        this.uploadedFiles = origine
                        }
                        else {
                           this.uploadedFiles = [] 
                        }
                    }
                })
            },
            validerLitige() {                                
                let tptActif = JSON.parse(localStorage.Actif)                                
                let reccupste = JSON.parse(localStorage.ste)                            
                let correspondSte = reccupste.find(Tcodste => Tcodste.LibSte === tptActif.LibSte)                                
                this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_EtatFact', {
                    RefSte: correspondSte.RefElt,
                    QuiDem: 'P',
                    RefTpt: tptActif.RefTpt,
                    EtatFact: 'SKO',
                }).then(function(res){                    
                    if(res.body.success == true){
                        tptActif.EtatFactCar = 'SKO'
                        localStorage.setItem("Actif", JSON.stringify(tptActif))
                        this.$http.post(localStorage.serverName + '/include/Cgi_Ext.php?Cgi_Name=Gest_Litige', {
                            RefSte: correspondSte.RefElt,
                            QuiDem: 'P',
                            RefTpt: tptActif.RefTpt,
                            LibCom: document.getElementById("txtLibCom").value,
                            PrixS: document.getElementById("PrixS").value,
                            CodNot: localStorage.Motif
                        })
                        this.$router.push('/factu')
                    }
                })
                localStorage.setItem("codLit", 1)
                localStorage.setItem("codVal", 0)
                localStorage.setItem("msgLIT", "Facture du transport " + reccup.RefTptPtah + " en litige (n° de demande " + reccup.RefDtiPtah + ")")
            },
            limite(maxlength) {
                let reccupTxt = document.getElementById("txtblock").value
                if (reccupTxt.length > maxlength) {
                    reccupTxt = reccupTxt.substring(0, maxlength)
                    alert('Votre texte ne doit pas dépasser '+maxlength+' caractères!')  
                }
                this.Verif()
            }
        },
        data() {
            return {
                Actif: JSON.parse(localStorage.Actif),
                uploadedFiles: [],
                arbo: [],
                child: [],
                reftpt: localStorage.reftpt,
            }
        },
        created(){            
            this.$http.post(localStorage.serverName + '/include/ressources/data/get-lst-notL.php',)
            .then(function(result){
                this.arbo = result.body
                this.child = result.body[0].children
                localStorage.setItem('children', JSON.stringify(result.body[0].children))
            })
        },
    }
</script>