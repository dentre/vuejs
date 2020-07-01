<template>
<div class="content-step">
    <div class="zone-default">
        <div class="container-agreement">
            <div class="bloc-option">
                <div class="input-check">
                    <input name="checkbox-name" type="checkbox"> <label class="check-label">Taxi</label>
                </div>
                <div class="input-check">
                    <input name="checkbox-name" type="checkbox"> <label class="check-label">VSL</label>
                </div>
                <div class="input-check">
                    <input name="checkbox-name" type="checkbox"> <label class="check-label">AMBULANCE</label>
                </div>
            </div>
            <div class="bloc-agreement">
                <div class="container-action">
                    <span @click="deleteAgrement()" class="dash"></span>
                    <span @click="addAgrement()" class="add"></span>
                </div>
                <form class="form form-step">
                    <div class="grid-2">
                        <div class=" col-2">
                            <label>Choix du département </label>
                            <div class="select-field">
                                <select v-model="SelectDpt" @change="affVille()" class="recupDep">
                                    <option disabled value="">Sélectionnez un département</option>
                                    <option v-for="option in Dpt" v-bind:value="option.Dept">{{option.LibDpt}}</option>
                                </select>
                            </div>
                        </div>
                        <div class=" col-2">
                            <label>Choix de la ville </label>
                            <div class="select-field">
                                <select v-model="SelectVille" v-bind:id="'Selectville'+indexComp" disabled class="recupVille">
                                    <option>Sélectionnez une ville</option>
                                    <option v-for="option in Communes" v-bind:value="option.CInsee">{{option.Libelle}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="grid-3">
                        <div class=" col-3">
                            <div class="input-field ">
                                <input class="form-control" maxlength="16" placeholder="Numéro d'autorisation de stationnement" type="text">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-field">
                                <input class="form-control" placeholder="Nombre de véhicule" type="number">
                                <div class="error">
                                    message erreur
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-field">
                                <input class="form-control" placeholder="Date limite d’autorisation" type="date">
                            </div>
                        </div>
                    </div>
                </form>
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
    name: 'agrementStandard',
    methods: {
        addAgrement(){
            this.$parent.addAgrement()
        },
        deleteAgrement(){                        
            if ( confirm( "Etes vous sur de vouloir supprimer cet agrément" ) ) {
                this.$parent.deleteAgrement(this.$attrs.dataindex)
            }
        },
        affVille(){
            let serverName = localStorage.serverName
            let numDep = this.SelectDpt
            this.$http.post(serverName + '/include/ressources/data/get-Communes.php?numDep='+ numDep,).then(function (res){
                this.Communes = res.body.LstCom
                let recupSelectVille = document.getElementById('Selectville' + this.indexComp)
                recupSelectVille.removeAttribute("disabled")
            }) 
        }
    },
    created(){
        let serverName = localStorage.serverName
        this.$http.post(serverName + '/include/ressources/data/get-dpt.php',).then(function (res){
            this.Dpt = res.body.Array
        })
    },
    data() {
        return {
            Dpt: [],
            SelectDpt: "",
            Communes: [],
            SelectVille: "",
            indexComp: this.$attrs.dataindex
        }
    }
}
</script>
