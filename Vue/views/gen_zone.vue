<script src="@/controllers/gen_zone"></script>

<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="section-dashboard">
                        <div class="section section-society">
                            <div class="tab-container">
                                <div class="tab-start">
                                    <div class="tab tab-child-1"><router-link to="/dashboard" class="home">Les sociétés</router-link></div>
                                    <div class="tab tab-child-2 active"><router-link to="/gen_zone" class="home">Zones d'activité (de toutes les sociétés)</router-link></div>
                                </div>
                                <div class="tab-content">
                                    <div class="societe-name">{{Ste}}</div>
                                    <div class="panel-tab panel tab-content panel-child-1">
                                        <table class="table-society" >
                                            <thead>
                                                <tr>
                                                    <th>Zones</th>
                                                    <th>Code Ptah</th>
                                                    <th>Type</th>
                                                    <th>Liste</th>
                                                    <th>Fin de contrat</th>
                                                    <th>Nb véhicules</th>
                                                    <th>Agrément</th>                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                        <td v-html="parentSte.Libelle"></td>                                                        
                                                        <td>{{parentSte.Code}}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>                                                        
                                                    </tr>
                                                <template v-for="(item, index) in Zone">
                                                    <tr>
                                                        <td v-if="item.Groupe >= 0" v-html="item.Libelle"></td>
                                                        <td v-else  style="padding-left: 30px"> +  {{item.Libelle}}</td>
                                                        <td>{{item.Code}}</td>
                                                        <td>{{item.TypRes}}</td>
                                                        <td>{{item.TypLst}}</td>
                                                        <td>{{item.DatFin}}</td>
                                                        <td>{{item.NbVeh}}</td>
                                                        <td>{{item.Contrat}}</td>                                                        
                                                    </tr>
                                                    <tr v-for="items in item.children">
                                                        <td style="padding-left: 30px"> +  {{items.Libelle}}</td>
                                                        <td>{{items.Code}}</td>
                                                        <td>{{items.TypRes}}</td>
                                                        <td>{{items.TypLst}}</td>
                                                        <td>{{items.DatFin}}</td>
                                                        <td>{{items.NbVeh}}</td>
                                                        <td>{{items.Contrat}}</td>                                                        
                                                    </tr>
                                                </template>
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