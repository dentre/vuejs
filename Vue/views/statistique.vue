<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="section section-mission">
                        <div class="tab-container">
                        <div class="c-filter-stat">
                            <div class="c-filter-stat-grid">
                                <div class="content-filter">
                                 <h4 class="heading-4">Filtres</h4>
                                <form class="form form-modal">
                                    <div class="grid-2 ">
                                    <!-- select--> 
                                        <div class="select-field col-2">
                                            <label> Société</label>                                            
                                            <select id="listeSte" @change="onChangeListeSte()">
                                                <option>-- Sélectionnez une société --</option>
                                                <option v-for="item in ListeSte" v-bind:value="item.LibSte" >
                                                    {{item.LibSte}}
                                                </option>     
                                            </select>
                                        </div>
                                        <!-- end./select---> 
                                        <!-- date provisoire -->
                                        <div class="grid-2 c-filter-stat-radio col-2">
                                             <!-- Radio -->
                                            <div class="container-radio zone grid-3">
                                                <div class="col-3">
                                                    <div class="input-radio">
                                                    <input id="acc" name="TypStats" type="radio" checked @click="affAcc()">
                                                    <label class="check-label" for="acc">Acceptées</label>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="input-radio">
                                                    <input id="ref" name="TypStats" type="radio" @click="affRef()">
                                                    <label class="check-label" for="ref">Refusées</label>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="input-radio">
                                                    <input id="toutes" name="TypStats" type="radio" @click="affToutes()">
                                                    <label class="check-label" for="toutes">Toutes</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End./ radio -->
                                        </div> 
                                        <!-- End./ date provisoire -->
                                     </div>
                             
                                </form>
                                    <div class="button-filter-stat">                                    
                                    <button class="reload" @click="clear()"></button>
                                </div>
                                </div>
                            <!--  <div class="content-datepiker"></div> -->
                            </div>
                            </div>
                            <HotelDatePicker
                                format="DD/MM/YYYY"
                                :showYear = "true"
                                :startDate="startDate()"
                                :hoveringTooltip="false"
                                :i18n="ptBr"                            
                                @check-in-changed="DateDebut"
                                @check-out-changed="DateFin"> 
                            </HotelDatePicker>
                            <div class="c-table-stat">
                                <div id="StatsAcceptees" class=" statsacceptees">
                                  <label> Acceptées</label>
                                  <div  class="table-master" >
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Total</th>
                                                <th>Libre Choix Patient</th>
                                                <th>Société amenante</th>
                                                <th>Tour de rôle</th>
                                                <th v-for="item in NomHor">{{item}}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in StatsAcc">
                                                <td>{{item.TypRes}}</td>
                                                <td>{{item.Total}}</td>
                                                <td>{{item.LCP}}</td>
                                                <td>{{item.AMN}}</td>
                                                <td>{{item.TDR}}</td>
                                                <td>{{item.JTyp}}</td>
                                                <td>{{item.STyp}}</td>
                                                <td>{{item.DTyp}}</td>
                                                <td>{{item.NTyp}}</td>
                                                <td>{{item.ATyp}}</td>
                                                <td>{{item.ITyp}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                 </div>
                                </div>
                                <div style="display:none" id="StatsRefusees" class="statsrefusees">
                                    <label> Refusées</label>
                                    <div  class="table-master" >
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Total</th>
                                                    <th>Libre Choix Patient</th>
                                                    <th>Société amenante</th>
                                                    <th>Tour de role</th>
                                                    <th v-for="item in NomHor">{{item}}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in StatsRef">
                                                    <td>{{item.TypRes}}</td>
                                                    <td>{{item.Total}}</td>
                                                    <td>{{item.LCP}}</td>
                                                    <td>{{item.AMN}}</td>
                                                    <td>{{item.TDR}}</td>
                                                    <td>{{item.JTyp}}</td>
                                                    <td>{{item.STyp}}</td>
                                                    <td>{{item.DTyp}}</td>
                                                    <td>{{item.NTyp}}</td>
                                                    <td>{{item.ATyp}}</td>
                                                    <td>{{item.ITyp}}</td>
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
<script src="@/controllers/statistique"></script>