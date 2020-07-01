<script src="@/controllers/tarif"></script>

<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="wrap--ftarif">
                        <button class="btn container-back back-top" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>
                        <div class="section-dashboard">
                            <div class="section section-fact">
                                <div class="page-tarif">
                                    <div class="column-main bloc-2">
                                        <h4 class="heading-4">Séléctionner une Catégorie </h4>
                                        <div class="container-radio zone">
                                            <div class="input-radio"><input id="Base" name="typezone" type="radio" checked @click="SelectRadio('Base')"> <label for="Base" class="check-label">   Base  </label></div>
                                            <div class="input-radio"><input id="Horaires" name="typezone" type="radio" @click="SelectRadio('Horaires')"> <label for="Horaires" class="check-label">   Horaires  </label></div>
                                            <div class="input-radio"><input id="Majoration" name="typezone" type="radio" @click="SelectRadio('Majoration')"> <label for="Majoration" class="check-label">   Majoration  </label></div>
                                            <div class="input-radio"><input id="Supplément" name="typezone" type="radio" @click="SelectRadio('Supplement')"> <label for="Supplément" class="check-label">   Supplément  </label></div>
                                            <div class="input-radio"><input id="Remise" name="typezone" type="radio" @click="SelectRadio('Remise')"> <label for="Remise" class="check-label">  Remise  </label></div>
                                            <div class="input-radio"><input id="MontantSpec" name="typezone" type="radio" @click="SelectRadio('MontantSpec')"> <label for="MontantSpec" class="check-label">  Montant Spécifique  </label></div>
                                            <div class="input-radio"><input id="Tout" name="typezone" type="radio" @click="SelectRadio('Tout')"> <label for="Tout" class="check-label">  Tout  </label></div>
                                        </div>
                                    </div>
                                    <table class="table-forfait">
                                        <thead>
                                            <tr>
                                                <th>Elément</th>
                                                <th>Unité / Format</th>
                                                <th class="align-right">Valeur</th>
                                            </tr>
                                        </thead>
                                        <tbody class="tbl-content">
                                            <tr id="FD">
                                                <td>Forfait départemental</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.FD}}</td>
                                            </tr>
                                            <tr id="FA">
                                                <td>Forfait agglomération</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.FA}}</td>
                                            </tr>
                                            <tr id="PC">
                                                <td>Prise en charge</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.PC}}</td>
                                            </tr>
                                            <tr id="TarKM">
                                                <td>Forfait kilométrique</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.TarKM}}</td>
                                            </tr>
                                            <tr id="TarifQAtt">
                                                <td>Forfait QH Attente</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.TarifQAtt}}</td>
                                            </tr>
                                            <tr id="MaxKmF">
                                                <td>km dans Forfait A/D</td>
                                                <td> km</td>
                                                <td class="active right">{{Fields.MaxKmF}}</td>
                                            </tr>
                                            <tr id="MaxKmP">
                                                <td>km dans Prise en charge</td>
                                                <td> km</td>
                                                <td class="active right">{{Fields.MaxKmP}}</td>
                                            </tr>
                                            <tr id="DistKMForfait">
                                                <td>distance prise en compte</td>
                                                <td> </td>
                                                <td class="active right">
                                                    <div class="input-check">
                                                        <input name="DistKMForfait" :checked="Fields.DistKMForfait" type="checkbox" disabled="disabled">
                                                        <label  for="DistKMForfait" class="check-label"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr id="HJour">
                                                <td>Heure début Jour</td>
                                                <td> hh:mm</td>
                                                <td class="active right">{{Fields.HJour}}</td>
                                            </tr>
                                            <tr id="HNuit">
                                                <td>Heure début Nuit</td>
                                                <td> hh:mm</td>
                                                <td class="active right">{{Fields.HNuit}}</td>
                                            </tr>
                                            <tr id="HWend">
                                                <td>Heure début Week-End</td>
                                                <td> hh:mm</td>
                                                <td class="active right">{{Fields.HWend}}</td>
                                            </tr>
                                            <tr id="CmF">
                                                <td>Coefficient Majoration Férié</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.CmF}}</td>
                                            </tr>
                                            <tr id="CmN">
                                                <td>Coefficient Majoration Nuit</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.CmN}}</td>
                                            </tr>
                                            <tr id="MajoKM_OK">
                                                <td>Majoration Kilométrique</td>
                                                <td>  </td>
                                                <td class="active right">
                                                    <div class="input-check">
                                                        <input name="MajoKM_OK" :checked="Fields.MajoKM_OK" type="checkbox" disabled="disabled">
                                                        <label  for="MajoKM_OK" class="check-label"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr id="SupAer">
                                                <td>Supplément Aéroport</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.SupAer}}</td>
                                            </tr>
                                            <tr id="SupUrg">
                                                <td>Supplément Urgence</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.SupUrg}}</td>
                                            </tr> 
                                            <tr id="SupInc">
                                                <td>Supplément Incubateur</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.SupInc}}</td>
                                            </tr>
                                            <tr id="SupAccMed">
                                                <td>Supplément Accompagnant Médical</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.SupAccMed}}</td>
                                            </tr>
                                            <tr id="RemAba2">
                                                <td>Abbatement deux Patients</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.RemAba2}}</td>
                                            </tr>
                                            <tr id="RemAba3">
                                                <td>Abbatement trois Patients</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.RemAba3}}</td>
                                            </tr>
                                            <tr id="RemiseAnti">
                                                <td>Remise fonction anticipation</td>
                                                <td> </td>
                                                <td class="active right">
                                                    <div class="input-check">
                                                        <input name="RemiseAnti" :checked="Fields.RemiseAnti" type="checkbox" disabled="disabled">
                                                        <label  for="RemiseAnti" class="check-label"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr id="RemiseU">
                                                <td>Remise Urgence</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.RemiseU}}</td>
                                            </tr>
                                            <tr id="RemiseN">
                                                <td>Remise Normal</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.RemiseN}}</td>
                                            </tr>
                                            <tr id="RemiseP">
                                                <td>Remise Programmée</td>
                                                <td> %</td>
                                                <td class="active right">{{Fields.RemiseP}}</td>
                                            </tr>
                                            <tr id="Montant">
                                                <td>Forfait Spécifique</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.Montant}}</td>
                                            </tr>
                                            <tr id="TypMnt">
                                                <td>Type Montant</td>
                                                <td> </td>
                                                <td class="active right">{{Fields.TypMnt}}</td>
                                            </tr>
                                            <tr id="PeageDansPrix">
                                                <td>Peage inclus dans Forfait</td>
                                                <td> </td>
                                                <td class="active right">
                                                    <div class="input-check">
                                                        <input name="PeageDansPrix" :checked="Fields.PeageDansPrix" type="checkbox" disabled="disabled">
                                                        <label  for="PeageDansPrix" class="check-label"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr id="SupSpec">
                                                <td>Partie du Forfait non majorée</td>
                                                <td> €</td>
                                                <td class="active right">{{Fields.SupSpec}}</td>
                                            </tr>
                                            <tr id="DetailTable">
                                                <td>Forfait Détaillé</td>
                                                <td> </td>
                                                <td class="active right">
                                                    <div class="input-check">
                                                        <input name="DetailTable" :checked="Fields.DetailTable" type="checkbox" disabled="disabled">
                                                        <label  for="DetailTable" class="check-label"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                        <table id="TbDétail" class="table-forfait">
                                            <thead>
                                                <tr>
                                                    <th>Type/unité</th>
                                                    <th>Tranche minimum</th>
                                                    <th>Tranche MAximum	   </th>
                                                    <th>Nuit 	 </th>
                                                    <th>Week-end/Jour Férié  </th>
                                                    <th>Montant €</th>
                                                </tr>
                                            </thead>
                                            <tbody class="tbl-content">
                                                <tr v-for="item in LstElt">
                                                    <td class="right">{{item.Type}}</td>
                                                    <td class="right">{{item.TrancheMin}}</td>
                                                    <td class="right">{{item.TrancheMax}}</td>
                                                    <td class="right"> 
                                                        <div class="input-check">
                                                            <input name="Nuit" :checked="item.Nuit" type="checkbox" disabled="disabled">
                                                            <label  for="Nuit" class="check-label"></label>
                                                        </div>
                                                    </td>
                                                    <td class="right"> 
                                                         <!-- // ~ class="input-check checkdisable" - classe checkdisable concerne les status checked & en disable  -->     
                                                        <div class="input-check">
                                                            <input name="We" :checked="item.We" type="checkbox" disabled="disabled" >
                                                            <label  for="We" class="check-label"></label>
                                                        </div>
                                                    </td>
                                                    <td>{{item.Montant}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    <div class="container-action">
                                        <button class="btn container-back" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>
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