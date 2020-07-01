<script src="@/controllers/accueil"></script>

<template>
  <div class="wrapper-connexion-main ">
      <div class="wrapper-connexion">
          <div class="top-section">
            <div id="inscri" class="creat-container"><router-link to="/inscription"><span class="creat">Créer un Compte </span>  </router-link></div>
          </div>
          <div class="section-middle">
            <!-- S O M M A R Y -->
            <div class="brand-container">
              <div class="brand">
                  <img src="../images/logoptah-260x274.png" alt="">
              </div>
              <div class="sommary">
                <h1 class="brand-co"><span>PtahSte </span> Portail des sociétés</h1>
<!--
                <h2 class="brand-subhead-co">Pour la gestion des transports hospitaliers</h2>
-->
              </div>

              <div class="button-alpha-white button-charte" @click="charte()">Charte</div>
              <div class="zone-downdload">
                <div class="button-alpha-white button-download play-store"> <a href="http://play.google.com/store/apps/details?id=com.geosoft.ptahmobste"> <span class="ico-ps"></span> <span class="android">  Télécharger Ptah Transporteur</span><span class="play">Google Play</span></a></div>
                <!-- <div class="button-alpha-white button-download Apple-store" > <span class="ico-appl"></span> <span class="apple-top"> Télécharger dans</span> <span class="astore">App Store</span> </div> -->
              </div>
            </div>
            <!-- P A N E L   C O N N E X I O N  -->
            <div class="panel-right-container">
              <div class="panel-main panel">
                 <h3 class="title-panel"><span>Bienvenue !</span></h3>
                   <!-- F O R M  C O N N E X I O N  -->
                  <form action="" class="form-panel form-connexion">
                    <div class="input-field">
                        <input id="CodUsr" type="text" placeholder="Veuillez entrer votre login" @keyup.enter="login()"/>
                    </div>
                    <div class="input-field">
                        <input id="PswUsr" type="password" placeholder="Veuillez entrer votre mot de passe" @keyup.enter="login()">
                      </div>
                      <div class="button-login" @click="login()">Connexion</div>
                      <a href="#" @click="modalMDP" class="sms-helper">Vous n'arrivez pas à vous connecter ?</a>
                  </form>
                 
              </div>
            </div>
            <div id="modaMDP" class="wrapper-modal-md chgmdp" style="display:none">
                <div class="modal-inside">
                    <div class="modal-wrap is-visible modal-inside-panel modal-table ">
                        <a class="modal-close" @click="closeModal()"></a>
                        <div class="wrapper-top"></div>
                        <h2 class="modal-sub-title">Changer votre mot de passe</h2>
                        <div class="wrapper-modal-content">
                            <div class="input-field">
                                <label>Entrez votre code société</label>
                                <input id="codste" type="text" @keyup.enter="confirm()">
                            </div>
                            <div class="" style="display:none" id="modConf"> 
                                <label>Entrez votre code de confirmation envoyé par mail</label>
                                <input id="codConf" type="text" @keyup.enter="codConf()">
                            </div>
                            <div class="" style="display:none" id="modMDP"> 
                                <label> Nouveau mot de passe (30 caractères max)</label>
                                <input type="password" id="psw" @keyup="verifMDP()" @keyup.enter="changeMDP()" maxlength=30>
                                <label> Confirmation mot de passe</label>
                                <input type="password" id="pswconf" @keyup="verifMDP()" @keyup.enter="changeMDP()" maxlength=30>
                            </div>
                        </div>
                        <div class="container-btn" id="modalConfirm">
                            <button @click="confirm()" class="button-valider" type="button">Envoyer le code</button>
                        </div>
                        <div class="container-btn" id="modalConf" style="display:none">
                            <button @click="codConf()" class="button-valider" type="button">Confirmer le code</button>
                        </div>
                        <div class="container-btn" id="modalFin" style="display:none">
                            <button @click="changeMDP()" class="button-valider" type="button">Valider le mot de passe</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
  </div>
</template>