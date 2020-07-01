<script src="@/controllers/demandeHistorique"></script>


<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <button class="btn container-back back-top" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>
                    <div class="main-demande-historique">
                        <!-- // ~ s e c t i o n  -  T a b l e  H i s t o r i q u e  -->
                       <div class="section-historique">
                           <div class="">
                                <table class="table-society">
                                    <thead>
                                    <tr>
                                        <th>Date et heure</th>
                                        <th>Origine</th>
                                        <th>Rang</th>
                                        <th>Evénement</th>
                                        <th>Référence du transport</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                    <tr v-for="item in histo">
                                        <td>{{item.DatHis}}</td>
                                        <td>{{item.QuiDem}}</td>
                                        <td>{{item.RangTpt}}</td>
                                        <td>{{item.Evnmt}}</td>
                                        <td>{{item.RefTpt}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                         <!-- // ~ s e c t i o n  - B T N  A c t i o n  -->
                        <div class="section-action">
                            <button class="btn container-back" type="button" @click="goBack()"><span class="ico-back"></span> Retour</button>
                      
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>