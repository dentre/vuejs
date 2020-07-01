<template>
    <div class="content-step">
        <div class="zone-particular">
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
                                    <select autocomplete v-model="SelectDpt" class="recupDep">
                                        <option disabled value="">Sélectionnez un département</option>
                                        <option v-for="option in Dpt" v-bind:value="option.Dept">{{option.LibDpt}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class=" col-2">
                            </div>
                        </div>
                        <div class="grid-3">
                            <div class=" col-3">
                                <div class="input-field ">
                                    <input class="form-control" placeholder="Numéro de marché" type="text">
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
                                <div class="bloc-option">
                                    <div class="input-check">
                                        <input name="checkbox-name" type="checkbox"> <label class="check-label">ParaMed</label>
                                    </div>
                                    <div class="input-check">
                                        <input name="checkbox-name" type="checkbox"> <label class="check-label">Psy</label>
                                    </div>
                                    <div class="input-check">
                                        <input name="checkbox-name" type="checkbox"> <label class="check-label">Pedia</label>
                                    </div>
                                    <div class="input-check">
                                        <input name="checkbox-name" type="checkbox"> <label class="check-label">Baria</label>
                                    </div>
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
    name: 'agrementParticulier',
    methods: {
        addAgrement(){
            this.$parent.addAgrement()
        },
        deleteAgrement(){
            if ( confirm( "Etes vous sur de vouloir supprimer cet agrément" ) ) {
                this.$parent.deleteAgrement(this.$attrs.dataindex)
            }
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
            indexComp: this.$attrs.dataindex
        }
    }
}
</script>