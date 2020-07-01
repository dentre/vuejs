<script src="@/controllers/zone"></script>

<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div  id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="section-dashboard">
                        <div class="section section-society">
                            <div class="tab-container">
                                <div class="tab-start">
                                    <div class="tab tab-child-1"><a class="home" @click="goBack()">Les sociétés</a></div>
                                    <div class="tab tab-child-2 active"><router-link to="/zone" class="home">Zones d'activité</router-link></div>
                                </div>
                                <div class="tab-content">
                                    <div class="panel-tab panel tab-content panel-child-1">
                                        <button class="btn container-back" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>                                       
                                        <div class="societe-name">{{Ste}}</div>
                                    </div>                                   
                                    <div class="panel-tab panel tab-content panel-child-2">
                                        <table class="table-society">
                                            <thead>
                                                <tr>
                                                    <th class="sort">Zones</th>
                                                    <th>Code Ptah</th>
                                                    <th>Type</th>
                                                    <th>Liste</th>
                                                    <th>Fin de contrat</th>
                                                    <th>Nb véhicules</th>
                                                    <th>Agrément</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in Zone">
                                                    <td>{{item.Libelle}}</td>
                                                    <td>{{item.Code}}</td>
                                                    <td>{{item.TypRes}}</td>
                                                    <td>{{item.TypLst}}</td>
                                                    <td>{{item.DatFin}}</td>
                                                    <td>{{item.NbVeh}}</td>
                                                    <td>{{item.Contrat}}</td>
                                                </tr>          
                                            </tbody>
                                        </table>
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