<script src="@/controllers/detail"></script>

<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="wrap--fdetailtransport">

                        <div class="navigation-facture">
                            <button class="btn container-back back-top" type="button" @click="goBack()"><span class="ico-back"></span> Retour à la liste</button>
                            <!-- <button type="button" class="btn container-back next-top">Facture précédente<span class="ico-back"></span></button>-->
                        </div>

                        <div class="c-action-button-facturation">
                            <button id="btnPJ" class="btn file" type="button" @click="pieces_jointes()"><span class="ico ico-action icon-clip"></span> Voir les pièces jointes ({{counterPJ}})</button>
                        </div>
                        <!-- Boutons Suivant Précedant-->
                        <div class="c-action-arrow">
                            <div id="btnPrec" @click="detailPrec()" class="detail arrow left"><span class="ico-back"></span>Tpt précédent</div>
                            <div id="btnSuiv" @click="detailSuiv()" class="detail arrow right">Tpt suivant<span class="ico-back"></span></div>
                        </div>

                        <div class="section-dashboard">
                            <div id="ctnBtn" class="section section-fact ">
                                <div class="detail-transport">
                                    <div class="column-main bloc-1">
                                        <h4 class="heading-4">La société :</h4>
                                        <div class="bloc-info">
                                            <p class="label-info block">{{Actif.LibSte}}</p>
                                            <p class="label-info block">{{Factu.AdrSte}}</p>
                                            <p class="label-info block">{{Factu.CPoste}} {{Factu.VilSte}}</p>
                                            <p class="label-info block">{{Factu.TelSte}}</p>
                                        </div>
                                    </div>
                                    <div class="column-main bloc-2">
                                        <div class="lot-title">
                                            <h4 class="heading-4 title-button ">Le lot : </h4>
                                        </div>
                                        <div class="bloc-info">
                                            <p class="label-info block">Libellé du lot : {{Factu.CodLot}}</p>
                                            <p class="label-info block">Numéro du lot : {{Factu.NumLot}}</p>
                                            <p class="label-info block">Numéro de marché : {{Factu.Marche}}</p>
                                            <p class="label-info block">Libellé du tarif : {{Factu.CodTar}}</p>
                                            <p class="label-info block">Zone : {{Factu.Zone}}</p>
                                        </div>
                                        <button class="tarif" @click="goTarif()">Grille tarifaire <span class="ico-back"></span> </button>
                                    </div>
                                    <div class="column-main bloc-3">

                                        <!-- fin des boutons-->
                                        <h4 class="heading-4">Caractéristiques du transport {{Actif.RefTptPtah}} ({{Rang}})</h4>
                                        <div class="bloc-info grid-3">
                                            <div class="col-3">
                                                <p class="label-info block  fw-700 ">Motif du transport : <span class="badge fw-300 ">{{Factu.LibMotif}}</span></p>
                                                <p class="label-info block fw-700">Identité patient : <span class="badge fw-300">{{Actif.Ident}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Sexe :<span class="badge fw-300 "> {{Factu.Sexe}}</span> | Date naissance :<span class="badge fw-300 "> {{Factu.DateNai}}</span> | Poids : <span class="badge fw-300 ">{{Factu.Poids}} kg</span>
                                                </p>
                                                <p class="label-info block fw-700">Départ : <span class="badge fw-300">{{Actif.LibEtbDep}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Service : <span class="badge fw-300">{{Factu.SrvDep}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Ville : <span class="badge fw-300">{{Factu.VilDep}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Date et Heure : <span class="badge fw-300">{{Factu.DateDep}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Arrivée : <span class="badge fw-300">{{Actif.LibEtbArr}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Service : <span class="badge fw-300">{{Factu.SrvArr}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Ville : <span class="badge fw-300">{{Factu.VilArr}}</span>
                                                </p>
                                                <p class="label-info block fw-700">Date et Heure : <span class="badge fw-300">{{Factu.DateArr}} </span>
                                                </p>
                                                <p class="label-info block fw-700">Distance : <span class="badge fw-300">{{Factu.Distance}} km</span>
                                                </p>
                                            </div>

                                            <div class="col-3">
                                                <div class="tag-container">
                                                    <p class="label-info fw-700 block">Particuliarités :</p>
                                                    <div v-for="item in Partics" class="tag">
                                                        {{item.Libpartic}}
                                                    </div>
                                                </div>
                                                <div class="tag-container">
                                                    <p class="label-info fw-700 block">Mode de transport :</p>
                                                    <div class="tag">
                                                        {{Factu.LibModTpt}}
                                                    </div>
                                                </div>
                                                <div class="tag-container">
                                                    <p class="label-info block fw-700">Débiteur :</p>
                                                    <div class="tag">
                                                        {{Factu.AC}}
                                                    </div>
                                                </div>
                                                <div class="tag-container">
                                                    <p class="label-info block fw-700">Véhicule :</p>
                                                    <div class="tag">
                                                        {{Factu.TypVeh}}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div class="bloc-check">
                                                    <p class="label-info fw-700 block">Majorations</p>
                                                    <div class="input-check">
                                                        <input id="Nuit" name="Nuit" :checked="Factu.Nuit" type="checkbox" disabled="disabled"> <label class="check-label" for="Nuit">Nuit</label>
                                                    </div>
                                                    <div class="input-check">
                                                        <input id="Ferie" name="Ferie" :checked="Factu.Ferie" type="checkbox" disabled="disabled"> <label class="check-label" for="Ferie">Férié / We</label>
                                                    </div>
                                                </div>
                                                <div class="bloc-check">
                                                    <p class="label-info fw-700 block">Suppléments Sécu</p>
                                                    <div class="active input-check">
                                                        <input id="Aero" name="Aero" :checked="Factu.Aero" type="checkbox" disabled="disabled"> <label class="check-label" for="Aero">Aéroport</label>
                                                    </div>
                                                    <div class="input-check">
                                                        <input id="Urg" name="Urg" :checked="Factu.Urg" type="checkbox" disabled="disabled"> <label class="check-label" for="Urg">Urgence</label>
                                                    </div>
                                                    <div class="input-check">
                                                        <input id="Inc" name="Inc" :checked="Factu.Inc" type="checkbox" disabled="disabled"> <label class="check-label" for="inc">Incubateur</label>
                                                    </div>
                                                </div>
                                                <div class="bloc-check">
                                                    <p class="label-info fw-700 block">Autre Supplément</p>
                                                    <div class="input-check">
                                                        <input id="AccMed" name="AccMed" :checked="Factu.AccMed" type="checkbox" disabled="disabled"> <label class="check-label" for="AccMed">Personnel Médical</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column-main bloc-4">
                                        <div class="lot-title">
                                            <span id="pastille" class="pastillenbrtpt"></span>
                                            <h4 class="heading-4 title-button c-brand">Valoristaion détaillée (algorithme : {{Factu.Algo}}) | Etat du transport valorisé : {{Actif.EtatFact}}</h4>
                                        </div>
                                        <table class="table-forfait bleu">
                                            <thead>
                                                <tr>
                                                    <th>Description</th>
                                                    <th class="right">Tarif</th>
                                                    <th class="right">Quantité</th>
                                                    <th class="right">Sous Total</th>
                                                    <th class="right">Cumul</th>
                                                </tr>
                                            </thead>
                                            <tbody class="tbl-content">
                                                <tr v-for="item in Articles">
                                                    <td>{{item.Nom}}</td>
                                                    <td class="right">{{item.Valeur}} {{item.Unite}}</td>
                                                    <td class="right">{{item.Quantite}}</td>
                                                    <td class="right">{{item.SsTotal}} €</td>
                                                    <td class="right">{{item.Total}} €</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="c-total">
                                            <label>Montant total :</label>
                                            <span id="prixBase">{{Factu.Prix}} €</span>
                                        </div>
                                        <div style="display:none" class="c-total" id="prixNegoBlock">
                                            <label>Montant en négociation :</label>
                                            <span id="prixNego">{{Factu.PrixFin}} €</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-action">
                                    <button id="btnRetour" class="btn container-back" type="button" @click="goBack()">
                                        <span class="ico-back"></span>
                                        Retour
                                    </button>
                                    <button id="btnLitige" aria-label="btn-litige" class="btn btn-lit" type="button" @click="litige()">
                                        Déclarer un litige
                                    </button>
                                    <button id="btnInValider" aria-label="btn-close" class="btn btn-lit" type="button" @click="invalider()">
                                        Dé - valider
                                    </button>
                                    <button id="btnValider" aria-label="btn-accept" class="btn btn-accept" type="button" @click="valider()"><span class="ico-accept"></span>
                                        Valider le transport valorisé (prix initial)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal_PJ" class="wrapper-modal" style="display:none">
            <div class="wrapper-modal-inside">
                <div class="modal-inside">
                    <div class="modal-wrap modal-wrap-md is-visible modal-inside-panel modal-litige">
                        <a class="modal-close" @click="closeModal()"></a>
                        <div class="wrapper-modal-content">
                            <h2>Liste des pièces jointes (maximum 15)</h2>

                            <div class="container-upload">
                                <div class="section-files">
                                    <div>
                                        <div class="list-unstyled bloc-file">
                                            <div v-for="(item, index) in tabdoc" class="bloc-item-file">
                                                <p @click="RecupUpload(item)">{{item.FileName}}</p> {{item.Date}}
                                                <button @click="deleteDocG(item, index)" class="btn-trash"></button>
                                            </div>
                                        </div>
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
                                        <h4>Chargez de nouvelles pièces jointes (2 mo max formats : jpg, jpeg, png, doc, docx, pdf) :</h4>
                                        <div class="dropbox">
                                            <input id="recupFileMod" class="input-file litigeFile" multiple="multiple" name="InputName[]" type="file" @change="Upload()">
                                            <p>Cliquez ou faites glisser vos pièces jointes ici </p>

                                        </div>
                                        <!---->
                                    </form>
                                </div>
                                <!---->
                            </div>

                            <div class="area">
                                <h2>Editer le commentaire</h2>
                                <div class="c-note">
                                    <form class="form form-modal">
                                        <div class="input-field">
                                            <textarea class="resize-vertical" name="comment" id="txtblock" v-on:keyup="limite(300)" placeholder="Commentaire libre" v-model="LitigeCom"></textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="container-action">
                                <button aria-label="btn-accept" class="btn primary" type="button" @click="validerCom()">valider le commentaire</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal v-show="isModalVisible" @close="closeModal" />
    </div>
</template>