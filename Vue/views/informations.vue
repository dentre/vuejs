<script src="@/controllers/informations"></script>

<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="wrap--flistetransport">
                         <button @click="charte()" class="charte"> Charte </button>
                        <div class="section-dashboard">
                            <div class="tab-container">
                                <div class="tab-start">
                                    <div id="ongletG" class="tab tab-child-1 active" @click="affDocG()">
                                        <a id="docGeneral">Documents Généraux ({{counterDocG}})</a>
                                    </div>
                                    <div id="ongletS" class="tab tab-child-1" @click="affDocS()">
                                        <a id="docSte">Documents de la société ({{counterDocS}})</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Tableau doc global -->
                            <div id="global" class="section">
                                <div class="table-master">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th @click="sort('Date')" class="max-i sort">Date de création</th>
                                                <th @click="sort('Extension')" class="max-i sort">format</th>
                                                <th @click="sort('Nom')"class="sort">Nom du document</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in filteredListeDocG" @click="linkG(item)">
                                                <td>
                                                    <span class="doc">
                                                        {{item.Date}}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="ext"></div>
                                                    <span class="extTxt">{{item.Extension}}</span>
                                                </td>
                                                <td>{{item.Nom}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- Fin doc global -->
                            <!-- Tableau doc ste -->
                            <div id="societe" class="section" style="display:none">
                                <div class="table-master">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th @click="sort('Date')" class="max-i sort">Date de création</th>
                                                <th @click="sort('Extension')" class="max-i sort">format</th>
                                                <th @click="sort('Nom')"class="sort">Nom du document</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr @click="linkSte(item)" v-for="item in filteredListeDocS">
                                                <td>
                                                    <span class="doc">
                                                        {{item.Date}}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="extS"></div>
                                                    <span class="extTxtS">{{item.Extension}}</span>
                                                </td>
                                                <td>{{item.Nom}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- Fin doc ste -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>