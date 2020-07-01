<script src="@/controllers/mission"></script>

<template>
    <div>
        <div :key="fenetre" style="display : none"></div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="section-dashboard">
                        <div class="section section-mission">
                            <div class="tab-container">
                                <div class="tab-start">
                                    <div class="tab tab-child-1" id="link-activite">
                                        <a class="mission" @click="linkFenetre('Activite')">Activité<span id="counter-missions" style="display : none" v-if="fenetre == 'Activite'"> : ({{counterG}})</span></a>
                                    </div>
                                    <div class="tab tab-child-1" id="link-journal">
                                        <a class="mission" @click="linkFenetre('Journal')">Journal<span id="counter-missions" style="display : none" v-if="fenetre == 'Journal'"> : ({{counterG}})</span></a>
                                    </div>
                                </div>
                                <div class="tab-content">
                                    <HotelDatePicker
                                    format="DD/MM/YYYY"
                                    :showYear = "true"
                                    :startDate="new Date(new Date().getFullYear()-1, new Date().getMonth()+6, 1)"
                                    :hoveringTooltip="false"
                                    :i18n="ptBr"
                                    :minNights= "0"
                                    @check-in-changed="DateDebut"
                                    @check-out-changed="DateFin">
                                </HotelDatePicker>
                                    <div class="panel-tab panel tab-content panel-child-1">
                                        <table id="tableau" class="table-mission">
                                        <thead>
                                            <tr>
                                                <th colspan="16" class="table-header-filter">
                                                    <div class="filter-container filter-container-mission">
                                                        <div class="more-filter">
                                                            <p>Filtrée par état du transport :</p>
                                                            <div class="more-filter-item more-filter-item-PRO badge" v-if="fenetre == 'Activite'">
                                                                <div @click="filtre('PRO')" class="input-check">
                                                                    <input type="checkbox" id="icoPRO" name="filtres" class="checkboxStatutMission"> 
                                                                    <label for="" class="check-label"> Proposé {{counterStatut['PRO']}}</label>
                                                                </div></div>
                                                            <div class="more-filter-item more-filter-item-ACC badge" v-if="fenetre == 'Activite'">
                                                                <div @click="filtre('ACC')" class="input-check">
                                                                    <input type="checkbox" id="icoACC" name="filtres" class="checkboxStatutMission"> 
                                                                    <label for="" class="check-label"> Accepté {{counterStatut['ACC']}} </label>
                                                                </div>
                                                            </div>
                                                            <div class="more-filter-item more-filter-item-DEB  badge" v-if="fenetre == 'Activite'">
                                                                <div  @click="filtre('DEB')" class="input-check">
                                                                    <input type="checkbox" id="icoDEB" name="filtres" class="checkboxStatutMission"> 
                                                                    <label for="" class="check-label"> Débuté {{counterStatut['DEB']}} </label>
                                                                </div>
                                                            </div>
                                                            <div class="more-filter-item more-filter-item-TER  badge">
                                                                <div  @click="filtre('TER')" class="input-check">
                                                                    <input type="checkbox" id="icoTER" name="filtres" class="checkboxStatutMission"> 
                                                                    <label for="" class="check-label"> Terminé {{counterStatut['TER']}} </label> 
                                                                </div>
                                                            </div>
                                                            <div class="more-filter-item more-filter-item-ANN  badge">
                                                                <div  @click="filtre('ANN')" class="input-check">
                                                                    <input type="checkbox" id="icoANN" name="filtres" class="checkboxStatutMission"> 
                                                                    <label for="" class="check-label"> Annulé {{counterStatut['ANN']}} </label> 
                                                                </div>
                                                            </div>
                                                            <div class="more-filter-item more-filter-item-AUT  badge" v-if="fenetre == 'Journal'">
                                                                <div  @click="filtre('AUT')" class="input-check">
                                                                    <input type="checkbox" id="icoAUT" name="filtres" class="checkboxStatutMission"> 
                                                                    <label for="" class="check-label"> Autres {{counterStatut['AUT']}} </label> 
                                                                </div>
                                                            </div>
                                                      </div>
                                                        <div class="button-action-filter">
                                                            <button class="reload" @click="clear()"></button>
                                                        </div>
                                                    </div>
                                                    <div class="search-bar-container-mission">
                                                        <div class="search-bar">
                                                            <input id="search" placeholder="Recherche rapide" type="search" v-model="search"> <button class="btn btn--search" type="button"></button>
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th class="col-1">Actions</th>
                                                <th @click="sort('suivi')" class="sort col-1">Etat
                                                </th>
                                                <th @click="sort('DLimAcc')" class="sort col-1">Délai
                                                </th>
                                                <th @click="sort('RefTpt')" class="sort col-1">N° Transport</th>
                                                <th @click="sort('DateAccTdr')" class="sort col-1">Accepté</th>
                                                <th @click="sort('LibPartics')" class="sort invers col-1">Mode</th>
                                                <th @click="sort('ModTpt')" class="sort col-1">Précautions</th>
                                                <th @click="sort('RangTpt')" class="sort col-1">Rang</th>
                                                <th @click="sort('DateTpt')" class="sort col-1">H.Départ</th>
                                                <th @click="sort('LibEtbDep')" class="sort col-1">Départ</th>
                                                <th @click="sort('VilEtbDep')" class="sort col-1">Ville</th>
                                                <th @click="sort('HeurArr')" class="sort col-1">H.Arrivée</th>
                                                <th @click="sort('LibEtbArr')" class="sort col-1">Arrivée</th>
                                                <th @click="sort('VilEtbArr')" class="sort col-1">Ville</th>
                                                <th @click="sort('HeurRdv')" class="sort col-1">H.RDV</th>
                                                <th @click="sort('Ident')" class="sort col-1">Patient</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="trCheck" v-for="(item, event) in filteredTpt">
                                                <td v-if="fenetre == 'Activite'">
                                                    <span class="dot" @click="showModal(item, $event)"></span>
                                                </td>
                                                <td v-if="fenetre == 'Journal'">
                                                        <span class="ico-detail" @click="pushDetail(item)"></span>
                                                </td>

                                                <td class="suivi" @click="pushDetail(item)" v-html="item.suivi"></td>
                                                <td class="right" @click="pushDetail(item)">{{item.DLimAccFormatted}}</td>
                                                <td class="right" @click="pushDetail(item)" v-html="item.RefTpt"></td>
                                                <td @click="pushDetail(item)" v-html="item.DateAccTdr"></td>
                                                <td @click="pushDetail(item)" v-html="item.ModTpt"></td>
                                                <td @click="pushDetail(item)" v-html="item.LibPartics"></td>
                                                <td @click="pushDetail(item)"><span class="pastilleEtat">{{item.RangTpt}}</span></td><!-- // ~ class="pastilleEtat ANN" - classe Annulé-->
                                                <td @click="pushDetail(item)" class="trDate" v-html="item.DateTpt + ' ' + item.HeurDep"></td>
                                                <td @click="pushDetail(item)" v-html="item.LibEtbDep"></td>
                                                <td @click="pushDetail(item)" v-html="item.VilEtbDep"></td>
                                                <td @click="pushDetail(item)" v-html="item.DateArr + ' ' + item.HeurArr"></td>
                                                <td @click="pushDetail(item)" v-html="item.LibEtbArr"></td>
                                                <td @click="pushDetail(item)" v-html="item.VilEtbArr"></td>
                                                <td @click="pushDetail(item)" v-html="item.DateRdv + ' ' + item.HeurRdv"></td>
                                                <td @click="pushDetail(item)" v-html="item.Ident"></td>
                                            </tr>
                                         </tbody>
                                        </table>
                                    </div>
                                    <div class="container-pager page grid-3">
                                    <div class="pager-left col-3">
                                         <button @click="debutPage" class="prev">Début</button>
                                         <button @click="prevPage" class="prev"> <span class="ico-back"></span> précedente</button>
                                    </div>
                                     <div class="pager-center col-3">
                                         <p>Page </p><input v-model="currentPage" type="number"/><p> sur {{nbPages}}</p>
                                     </div>
                                    <div class="pager-right col-3">
                                        <button @click="nextPage" class="suiv">suivante <span class="ico-back"></span></button>
                                        <button @click="finPage" class="next">Fin</button>
                                    </div>
                                </div>
                                    <!-- // ~ popin menu rapide  -->
                                    <div id="modalMenu" class="wrapper-modal-xs" style="display:none;">
                                        <div class="modal-inside">
                                            <div class="modal-wrap-xs is-visible ">
                                                <a class="modal-close" @click="closeModalMenu()"></a>
                                                <div class="top-mod">
                                                    <h5>Action sur le Transport {{dataModal.RefTpt}}</h5>
                                                </div>
                                                <div class="content-mod">
                                                    <!--// ~ Classe couleur pastille en fonction de l'etat remonter c-blue :: blue branding / c-red :: red branding / c-dark :: dark branding-->
                                                    <label for="">Etat Actuel<span class="pastille c-blue"> {{dataModal.suivi}}</span></label>
                                                    <p class="label-it" id="nbSeances">Accepter la mission vous engage à assurer <span>{{dataModal.NombIte}}</span>  séances</p>
                                                    <label>Consulter :</label>
                                                    <div class="section-action">
                                                        <button id="detail" @click="pushDetail(dataModal)" class="btn btn-c-brand">Détail</button>
                                                        <button id="historique" @click="histo()" class="btn btn-c-close">Historique</button>
                                                        <button id="bontpt" @click="bonTpt()" class="btn btn-c-close">Bon de transport</button>
                                                    </div>
                                                    <label id="menuPossible">Voulez vous :</label>
                                                    <div class="section-action">
                                                        <button id="rejeter" @click="refuser()" class="btn btn-c-red"> Rejeter</button>
                                                        <button id="refuser" @click="refuser()" class="btn btn-c-red"> Refuser</button>
                                                        <button id="demarrer" @click="demarrer()" class="btn btn-c-brand">Démarrer</button>
                                                        <button id="accepter" @click="accepter()" class="btn btn-c-brand">Accepter</button>
                                                        <button id="affecter" @click="showModalAffect()" class="btn btn-c-brand">Affecter</button>
                                                        <button id="terminer" @click="terminer()" class="btn btn-c-close">Terminer</button> <button id="archiver" @click="archiver()" class="btn btn-c-close">Archiver</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- fin de popin menu-->
                                </div>
                            </div>
                            <!-- Popin refuser/rejeter-->
                            <div id="refus" class="wrapper-modal-md" style="display:none;">
                                <div class="modal-inside">
                                    <div class="modal-wrap is-visible modal-inside-panel modal-wrap-md">
                                        <a class="modal-close" @click="closeModalRefus()"></a>
                                        <div class="wrapper-top">
                                        </div>
                                        <div class="wrapper-modal-content">
                                            <p>Refus de la mission {{dataModal.RefDti}} </p>
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
                                                <div class="button-valider" @click="RefuserMission()">Refuser la mission</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- fin de popin refus-->

                            <!-- Popin affecter-->
                            <div id="affect" class="wrapper-modal-md" style="display:none;">
                                <div class="modal-inside">
                                    <div class="modal-wrap is-visible modal-inside-panel modal-wrap-md">
                                        <a class="modal-close" @click="closeModalAffect()"></a>
                                        <div class="wrapper-top"></div>
                                        <div class="wrapper-modal-content">
                                            <p>Options d'affectation du transport {{dataModal.RefTpt}}</p>
                                            <p>Pour sous-traiter : </p>
                                            <form id="sous-traitance" class="form form-modal">
                                                <div id="selectSte"> 
                                                    <select v-model="selectSte" id="listeSte" @click="displaySousTraitantManuel()">
                                                        <option disabled value="">Sélectionnez une société</option>
                                                        <option value="SocieteManuel">Société non présente dans la liste</option>
                                                        <option v-for="item in ListeSte" v-bind:value="item.LibSte">
                                                            {{item.LibSte}}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div id="SaisieSte" style="display:none">
                                                    <label>Saisissez la raison sociale : </label>
                                                    <input placeholder="Raison Sociale" id="steman" class="form-control" type="text">
                                                    <label>Indiquez le numéro SIREN : </label>
                                                    <input placeholder="N° SIREN" id="siren" class="form-control" type="text" maxlength="14">
                                                </div>
                                            </form>
                                            <div id="tptRetour" style="display:none;">
                                                <p>Attention la mission contient également un retour. Acceptez-vous également ce retour ?</p>
                                            </div>
                                            <div class="section-action">
                                                <button id="accepter" @click="validSousTraitant()" class="btn btn-c-brand">Accepter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- fin de popin affecter-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>