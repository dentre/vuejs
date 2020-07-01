<script src="@/controllers/detailMission"></script>


<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <button class="btn container-back back-top" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>
                    <div class="main-detail-mission">
                        <!-- // ~ s e c t i o n  - R e f e r e n c e -->
                        <div class="section-reference">
                            <div class="c-grid">
                                <!-- // c o l -  2 blog - grid 4 col -->
                                <div class="grid-column-2-4">
                                    <!-- // c o l -  1 bloc - 3 col -->
                                    <div class="col-child col-3">
                                        <div class="bloc">
                                            <div class="bloc-item bloc-item-etat">
                                                <label for="">Etat</label>
                                                <div class="item">{{Tpt.suivi}}</div>
                                            </div>
                                            <div class="bloc-item">
                                                <label for="">Création</label>
                                                <div class="item">{{Tpt.DateCre}}</div>
                                            </div>
                                            <div class="bloc-item">
                                                <label for="">Référence Demande</label>
                                                <div class="item">{{Tpt.RefDti}}</div>
                                            </div>
                                            <div class="bloc-item">
                                                <label for="">Référence Transport</label>
                                                <div class="item">{{Tpt.RefTpt}}</div>
                                            </div>
                                            <div class="bloc-item">
                                                <label for="">Avec Retour</label>
                                                <div class="item">{{ar}}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- // c o l -  1 bloc - 1 col -->
                                    <div class="col-child col-1">
                                        <div class="bloc">
                                             <div class="bloc-item ">
                                                <div class="item histo" @click="histo()"> </div>
                                            </div>
                                            <div class="bloc-item ">
                                                <div class="item note" @click="showModalAnnote()"> </div>
                                            </div>
                                            <div class="bloc-item" id="imprimer">
                                                <div id="imprimer" class="item print" @click="bonTpt()"> </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- // ~ s e c t i o n  - S e r v i c e  -->
                        <div class="section-service">
                            <div class="grid-2">
                                <div class="col-2">
                                    <div class="bloc">

                                        <div class="bloc-item">
                                            <label for="" class="mn5">Service demandeur</label>
                                            <div class="item size-100 grey-1 p-1">{{Dti.LibDem}} -</div>
                                        </div>
                                        <div class="bloc-item">
                                            <label for="" class="mn5">Téléphones </label>
                                            <div class="item size-100 grey-1 p-1 item-info">
                                                <div class="grid-3">
                                                    <div class="col-3">
                                                        <p>{{Dti.Tel1}} -</p>
                                                    </div>
                                                    <div class="col-3">
                                                        <p>{{Dti.Tel2}} -</p>
                                                    </div>
                                                    <div class="col-3">
                                                        <p>{{Dti.Tel3}} -</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="bloc">
                                        <div class="bloc-item">
                                            <label for="" class="mn5">Nom du demandeur</label>
                                            <div class="item size-100 grey-1 p-1">{{Dti.NomDem}} -</div>
                                        </div>
                                        <div class="bloc-item">
                                            <div class="grid-2">
                                                <div class="col-2">
                                                    <label for="" class="mn5">Accord de la direction</label>
                                                    <div class="item grey-1 p-1">{{Dti.Accord}} -</div>
                                                </div>
                                                <div class="col-2">
                                                    <label for="" class="mn5">Entente Préalable</label>
                                                    <div class="item  grey-1 p-1">{{Dti.EntentePre}} -</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- // ~ s e c t i o n  - I d e n ti t e -->
                        <div class="section-identity">
                            <div class="grid-2 grid-id">
                                <div class="col-2">
                                    <div class="bloc-item">
                                        <label for="" class="mn5">Identité Patient</label>
                                        <div class="item size-100  p-1" id="blocIdent">
                                            <div class="c-id">
                                                <span id="pastille" class="id c-w">
                                                    {{Tpt.Ident}}
                                                </span>
                                                <span id="NomNai">
                                                    | Nom de naissance : {{Tpt.NomNai}}
                                                </span>
                                            </div>
                                            <div class="c-item-id">
                                                <span>Née le {{Dti.DateNai}}</span>
                                                <span> {{Tpt.Age}} </span>
                                                <span> {{sexeP}} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="bloc-item"><label for="" class="mn5">Médecin</label>
                                        <div class="item size-100 grey-1 p-1">{{Dti.Medecin}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bloc-precaution item size-100 p-1">
                                <div class="grid-3">
                                    <div class="col-3">
                                        <div class="bloc">
                                            <div class="bloc-item">
                                                <label class="mn5" for="">Précautions d'hygiène</label>
                                                <div class="item size-100 p-1">
                                                    {{contag}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="bloc">
                                            <div class="bloc-item">
                                                <label class="mn5" for="">Accompagnants </label>
                                                <div class="item size-100 p-1">
                                                    {{libaccomp}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="bloc">
                                            <div class="bloc-item bloc-item-exergue">
                                                <label class="mn5" for="">BMR </label>
                                                <div class="item p-1">
                                                    {{BMR}}
                                                </div>
                                            </div>
                                            <div class="bloc-item bloc-item-exergue">
                                                <label class="mn5" for="">Poids</label>
                                                <div class="item p-1">
                                                    {{Tpt.Poids}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bloc">
                                    <div class="bloc-item">
                                        <label class="mn5" for="">Particularités</label>
                                        <div class="item size-100  p-1">
                                            <span>{{libpartic}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bloc bloc-textarea">
                                    <div class="bloc-item">
                                        <label class="mn5" for="">Observations</label>
                                        <div class="item size-100  p-1">
                                            {{Dti.ObsObs}} -
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- // ~ s e c t i o n  - T r a n s  p o  r t s  -->
                         <!-- // ~ add class highlight  = mise en Avant -->
                        <div class="section-tpt" v-for="(item, index) in StrTpt">
                            <h5>Transport : {{item.RangTpt}} | Réference du transport : {{item.RefTpt}}</h5>
                            <div class="grid-2">
                                <div class="col-2">
                                    <div class="bloc-item ">
                                        <label for="" class="title">Départ</label><span class="date">Date : {{item.DateDep}} </span><!-- // ~ Afficher date ici  = mise en Avant [garder en doublons dans tpt-info-exergue] -->
                                        <div class="item size-100 grey-1 p-1">
                                            <div class="C-tpt-info">
                                                <div class="tpt-info-exergue"> 
                                                    <span class="testVide name">{{item.EtbDep}} </span>
                                                    <span>UF : {{item.UfDep}}</span>
                                                    <span class="highlight">Date : {{item.DateDep}} </span> <!-- // ~ add class highlight  = mise en Avant -->
                                                </div>
                                                <div class="tpt-info">
                                                    <span class="service">{{item.SrvDep}} {{item.LibDep}}</span>
                                                    <span class="adress">{{item.AdrDep}}
                                                         {{item.CPoDep}}  {{item.VilDep}}
                                                    </span>
                                                </div>
                                                <div class="tpt-info-additional"> <span>Batiment :{{item.EtgDep}}  <span> Etage : {{item.EtgDep}} </span>    </span> </div>
                                            </div>
                                         <div class="C-tpt-info C-tpt-info-item">
                                            <label for="">  Type : </label> 
                                            <span class="typ"> {{Typ[index]}}</span>
                                         </div>
                                        <div class="C-tpt-info C-tpt-info-item">
                                            <label for="">  Mode : </label>
                                            <span class="mod"> {{Mod[index]}}</span>
                                        </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="bloc-item ">
                                        <label for="">Arrivée</label><!--  <span class="date">Date : {{item.DateDep}} </span > // ~ Afficher date ici  = mise en Avant [garder en doublons dans tpt-info-exergue] -->
                                        <div class="item size-100 grey-1 p-1">
                                            <div class="C-tpt-info">
                                                <div class="tpt-info-exergue">
                                                    <span class="name">{{item.EtbArr}} </span>
                                                    <span>UF : {{item.UfArr}}</span>
                                                    <span>Date : {{item.DateArr}} </span><!-- // ~ add class highlight  = mise en Avant -->
                                                </div>
                                                <div class="tpt-info arrivee">
                                                    <span class="service">{{item.SrvArr}} {{item.LibArr}}</span>
                                                    <span class="adress">{{item.AdrArr}}
                                                        {{item.CPoArr}} {{item.VilArr}}
                                                    </span>
                                                </div>
                                                <div class="tpt-info-additional">Etage : {{item.EtgArr}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- // ~ s e c t i o n  - B T N  A c t i o n  -->
                        <div class="section-action">
                            <button class="btn container-back" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>
                            <button id="refuser" @click="refuser()" class="btn btn-c-red"> Refuser</button>
                            <button id="rejeter" @click="refuser()" class="btn btn-c-red"> Rejeter</button>
                            <button id="affecter" @click="showModalAffect()" class="btn btn-c-brand">Affecter</button>
                            <button id="accepter" @click="accepter()" class="btn btn-c-brand">Accepter</button>
                            <button id="demarrer" @click="demarrer()" class="btn btn-c-brand">Démarrer</button>
                            <button id="terminer" @click="terminer()" class="btn btn-c-close">Terminer</button>
                        </div>
                        <!-- fin des boutons action -->
                    </div>
                    <!-- Popin refuser/rejeter-->
                    <div id="refus" class="wrapper-modal-md" style="display:none;">
                        <div class="modal-inside">
                            <div class="modal-wrap is-visible modal-inside-panel modal-wrap-md">
                                <a class="modal-close" @click="closeModalRefus()"></a>
                                <div class="wrapper-top">
                                    <!-- <div class="c-p">
                                        <svg width="120" height="120" viewBox="-60 -60 120 120">
                                            <g id="rectangle">
                                                <circle id="dot-1" r="18" cx="18" cy="-24" fill="#fff" />
                                                <circle id="dot-2" r="18" cx="18" cy="24" fill="#fff" />
                                            </g>
                                        </svg>
                                    </div> -->
                                </div>
                                <div class="wrapper-modal-content">
                                    <p>Refus de la mission {{Tpt.RefDti}} </p>
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
                                                                <label>Laissez un commentaire</label>
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
                                        <div class="button-valider" @click="refuserMission()">Refuser la mission</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- fin de popin refus-->
                    
                    <!-- Popin accepter-->
                    <div id="affect" class="wrapper-modal-md" style="display:none;">
                        <div class="modal-inside">
                            <div class="modal-wrap is-visible modal-inside-panel modal-wrap-md">
                                <a class="modal-close" @click="closeModalAffect()"></a>
                                <div class="wrapper-top">
                                </div>                
                                <div class="wrapper-modal-content">
                                    <p>Options d'affectation du transport {{Tpt.RefTpt}}</p>
                                    <p>Pour sous-traiter : </p>
                                    <form id="sous-traitance" class="form form-modal">
                                        <div id="selectSte"> 
                                            <select v-model="selectSte" id="listeSte" @click="displaySTman()">
                                                <option disabled value="">Sélectionnez une société</option>
                                                <option>Société non présente dans la liste</option>
                                                <option v-for="item in ListeSte" v-bind:value="item.LibSte">
                                                    {{item.LibSte}}
                                                </option>                           
                                            </select>
                                        </div>
                                        
                                        <div id="SaisieSte" style="display:none">
                                            <label>Saisie de la Raison Sociale : </label>
                                            <input placeholder="Raison Social" id="steman" class="form-control" type="text">
                                            <label>Indiquez le numéro SIREN : </label>
                                            <input placeholder="N° SIREN" id="siren" class="form-control" type="text" >
                                        </div>
                                    </form>
                                    <div id="tptRetour" style="display:none;">
                                        <p>Attention la mission contient également un retour. Acceptez-vous également ce retour ?</p>
                                    </div>
                                </div>
                                <div class="section-action">
                                    <button id="accepter" @click="validST()" class="btn btn-c-brand">Accepter</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <!-- fin de popin accepter-->  
                </div>
            </div>
        </div>
        <modal v-show="isModalVisible" @close="closeModalAnnote" />
    </div>
</template>