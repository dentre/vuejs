<script src="@/controllers/home"></script>

<template>
    <div>
        <div class="wrapper main">
            <menuLeft></menuLeft>
            <div id="main" class="dashboard-main">
                <navBar></navBar>
                <div class="wrap">
                    <div class="section-homepage">
                        <h1 class="home-message">Bienvenue sur votre <span class="bold-title">portail </span></h1>
                         <h2>Chiffres clés</h2>
                         <p class="date-home">{{finaleDate}} - <span>  {{heures}}</span></p>
                         <div class="c-card">
                                <div class="grid-2" id="blocs-home" style="display:none">
                                    <div class="col-2"  >
                                    <div class="bloc-card">
                                        <div class="illusttration illu-mission"></div>
                                        <div class="bloc-card-info">
                                            <div id="textMission">
                                                <h3>Vous avez <span>{{counterPRO}}</span> <span> missions proposées</span></h3>
                                                <h3>pour un montant total de : {{montantMission}} €</h3>
                                            </div>
                                            <h3 id="PasMission">Pas de mission proposée</h3>

                                        </div>
                                        <div class="bloc-card-button">
                                              <button><router-link to="/mission">Voir les missions<span></span></router-link>   </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2" id="blockFactu">
                                    <div class="bloc-card">
                                         <div class="illusttration illu-facturation"></div>
                                         <div class="bloc-card-info">
                                             <div id="textFactu">
                                                <h3>Vous avez  <span> {{counterFACT}}</span> <span>transports valorisés</span></h3>
                                                <h3>pour un montant total de : {{montantDti}} €</h3>
                                            </div>
                                            <h3 id="PasFactu">Pas de transport valorisé</h3>
                                        </div>
                                        <div class="bloc-card-button">
                                            <button><router-link to="/factu">Voir les transports valorisés<span></span></router-link>   </button>
                                        </div>
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

