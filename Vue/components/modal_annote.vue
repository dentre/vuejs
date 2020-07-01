<template>
    <div class="wrapper-modal-md ">
        <div class="modal-inside">
            <div class="modal-wrap is-visible modal-inside-panel modal-wrap-md">
                <a class="modal-close" @click="close()"></a>
                <div class="wrapper-top">
                    
                </div>
                <div class="wrapper-modal-content">
                    <p>Annotations pour le transport {{reftpt}}</p>
                    <ul v-for="(item, index) in arbo">
                        <li>{{item.text}}</li>
                        <ul v-for="(items, index) in child">
                            <li>
                                <div class="input-check">
                                    <input name="checkbox-name" type="checkbox" @click="afficherArea(items, index)">
                                    <label class="check-label">{{items.text}}</label>
                                </div>
                                <div class="hidden area">
                                    <div class="c-note">
                                        <form class="form form-modal">
                                            <div class="input-field">
                                                <label>Laissez un  commentaire (facultatif) </label>
                                                <textarea class="resize-vertical" name="comment" id="txtblock"></textarea> 
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </ul>
                    <div class="hr"></div>
                    <div class="container-btn">
                        <div class="button-valider" @click="valider()"> Valider</div>
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
            afficherArea(items, index){
                localStorage.setItem('indexChild', index)
                if(items.Libre == 1){
                    let reccup = document.getElementsByClassName('area')[index]
                    if (reccup.className == "hidden area" || reccup.className == "area hidden"){
                        reccup.classList.remove("hidden")
                    }
                    else {
                        reccup.classList.add("hidden", "area")
                    }
                }
            },
            valider() {
                let reccup = JSON.parse(localStorage.Actif)
                let reftpt = reccup.RefTpt
                let CodSte = reccup.CodSte
                let token = localStorage.Token
                let indexChild = localStorage.indexChild
                let child = JSON.parse(localStorage.children)
                let codnot = child[indexChild].CodNot
                let reccupNot = document.getElementsByClassName("resize-vertical")
                let notes = reccupNot[indexChild].value
                let concat = codnot +'\:'+ notes
                let serverName = localStorage.serverName
                this.$http.post(serverName + '/include/Cgi_Ext.php?Cgi_Name=Set_Not_Reg',{
                    RefTpt: reftpt,
                    CodSte: CodSte,
                    Notes: concat,
                    Token: token               
                }).then(function(res){
                    console.log(res)
                    if (res.body.success == true) {
                        this.$emit('close')
                    }
                })
            }
        },
        data() {
            return {
                arbo: [],
                child: [],
                reftpt: localStorage.reftpt
            }
        },
        created(){
            let serverName = localStorage.serverName
            this.$http.post(serverName + '/include/ressources/data/get-lst-notS.php',)
            .then(function(result){
                this.arbo = result.body
                this.child = result.body[0].children
                localStorage.setItem('children', JSON.stringify(result.body[0].children))
            })
        }
    }
</script>