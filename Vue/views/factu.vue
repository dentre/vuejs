<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="wrap--flistetransport">
                        <div class="section-dashboard">
                             <div class="c-status">
                                    <div class="status Status--highlighted status--warning ">
                                        <div id="ToasterVAL" class="status-1" style="display:none"><span class="status--icon  ico-accept "><span class="status-description">{{msgVAL}}</span></span></div>
                                         <div id="ToasterLIT" class="status-2" style="display:none"><span class="Status-icon  ico-warning-not "><span class="Status-description">{{msgLIT}}</span></span></div>
                                    </div>
                                </div>
                            <div class="section section-fact">
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
                                <table class="table-fact">
                                    <thead>
                                        <tr>
                                            <th class="table-header-filter" colspan="12">
                                                <div class="filter-container">
                                                    <div class="more-filter">
                                                        <p>Filtrer par transport :</p>
                                                        <div class="more-filter-item more-filter-item-VAM badge">
                                                            <div @click="filtre('VAM')" class="input-radio">
                                                            <input type="checkbox" id="icoVAM" class="checkboxStatutFactu">
                                                            <label for="" class="check-label">A valider {{counterVAM}} </label>
                                                             </div>
                                                        </div>
                                                        <div class="more-filter-item more-filter-item-icoSOK  badge">
                                                                <div @click="filtre('SOK')" class="input-radio">
                                                                <input type="checkbox" id="icoSOK" class="checkboxStatutFactu">
                                                                <label for="" class="check-label">Validés {{counterSOK}}</label>
                                                            </div>
                                                         </div>
                                                        <div class="more-filter-item more-filter-item-icoSKO badge">
                                                            <div @click="filtre('SKO')" class="input-radio">
                                                            <input type="checkbox" id="icoSKO" class="checkboxStatutFactu">
                                                            <label for="" class="check-label">En litige {{counterSKO}}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="button-action-filter">
                                                        <button class="reload" @click="clear()"></button>
                                                    </div>
                                                </div>
                                                <div class="search-bar-container">
                                                    <div class="search-bar">
                                                        <input id="search" placeholder="Recherche rapide" type="search" v-model="search"> <button class="btn btn--search" type="button"></button>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Détail</th>
                                            <th @click="sort('RefDtiPtah')" class="sort">N° Demande</th>
                                            <th @click="sort('Ident')" class="sort">Patient </th>
                                            <th @click="sort('DateDep')" class="sort">Départ </th>
                                            <th @click="sort('LibEtbDep')" class="sort">Etb départ </th>
                                            <th @click="sort('Cnf')" class="sorts">Type </th>
                                            <th @click="sort('EtatFact')">Etat </th>
                                            <th @click="sort('LibSteDti')" class="sort">Société </th>
                                            <th @click="sort('DistDti')" class="sort">Distance</th>
                                            <th @click="sort('Partics')" class="sort">Particularité</th>
                                            <th @click="sort('PrixDti')" class="sorts">Montant</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in filteredTpt">
                                            <td>
                                                <span class="ico ico-action ico-detail" @click="pushDetail(item)"></span>
                                            </td>
                                            <td class="right" @click="pushDetail(item)" v-html="item.RefDtiPtah"></td>
                                            <td @click="pushDetail(item)" v-html="item.Ident"></td>
                                            <td @click="pushDetail(item)" v-html="item.DateDep"></td>
                                            <td @click="pushDetail(item)" v-html="item.LibEtbDep"></td>
                                            <td @click="pushDetail(item)" v-html="item.Cnf"></td>
                                            <td class="etat pastilles" >
                                                 <span @click="pushDetailPastille(item, index)" v-for="(items,index) in item.LstTpt" class="pastillenbrtpt">{{items.RangTpt}}</span>
                                            </td>
                                            <td @click="pushDetail(item)" v-html="item.LibSte"></td>
                                            <td class="right" @click="pushDetail(item)" v-html="item.DistDti"></td>
                                            <td @click="pushDetail(item)">{{item.Partics}}</td>
                                            <td class="right" @click="pushDetail(item)" v-html="item.PrixDti"></td>
                                            <td>
                                                <button @click="validerDti(item)" type="button" class="primary valider">Valider</button>
                                                <button @click="devaliderDti(item)" type="button" class="primary devalider">Dévalider</button>
                                                <span class="vide"> - - </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="@/controllers/factu"></script>