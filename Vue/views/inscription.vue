<script src="@/controllers/inscription"></script>

<template>
    <div>
        <div class="enrollment-main">
            <div class="section-inscription step-accueil">
                <div class="logo-white">
                    <img src="../images/logoptah-blanc-77x77.png" alt="logo">
                </div>
                <div class="pyramid">
                    <img src="../images/pyramid.svg" alt="" width="700px" height="400px" alt="image pyramid">
                </div>
                <div class="content-accueil">
                    <h1>INSCRIPTION</h1>
                    <div class='terminal'>
                        <div class='text' id='text_1'></div>
                        <div class='text' id='text_2'></div>
                        <div class='cursor'>_</div>
                    </div>
                    <div class="action">
                        <button>J’AI UN CODE STE</button>
                        <button>JE N’AI PAS DE CODE STE</button>
                    </div>
                </div>
            </div>
            <div class="section-inscription-main">
                <div class="master-enrollment-left">
                    <menuInscri></menuInscri>
                    <div id="numberBage" class="number-badge">{{NumPage}}</div>
                </div>
                <div class="master-enrollment-header">
                    <!-- <button type="button" class="btn container-back"><span class="ico-back"></span> Retour</button> -->
                </div>
                <!-- content primary enrollment-->
                <div class="master-enrollment-content">
                    
<!--                              STEP01                                        -->
                    
                    <div class="section-inscription step-1" id="step01">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Informations de contact </H3> <!-- TITRE dynamique  -->
                        </div>
                        <div class="content-step">
                            <form class="form form-step ">
                                <label> Information de contact</label>
                                <div class="grid-2">
                                    <div class="input-field  col-2">
                                        <input placeholder="Nom *" class="form-control" type="text" id="Nom" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input placeholder="Nom de la société *" class="form-control" type="text" id="Raison" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input placeholder="Téléphone *" class="form-control" type="number" id="Tel" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                </div>
                            </form>
                            <form class="form form-step">
                                <label> Adresse Email</label>
                                <p>Merci de saisir une adresse e-mail valide.</p>
                                <div class="grid-2">
                                    <div class="input-field  col-2">
                                        <input placeholder="Votre email *" class="form-control" type="email" id="Mail" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input placeholder="Confirmation email  *" class="form-control" type="email" id="MailVerif" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                </div>
                            </form>
                            <form class="form form-step ">
                                <label> Mot de passe</label>
                                <p>Votre mot de passe pour une connexion à Ptah Ste</p>
                                <div class="grid-2">
                                    <div class="input-field  col-2">
                                        <input placeholder="Mot de passe  *" class="form-control" type="password" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input placeholder="Confirmation mot de passe  *" class="form-control" type="password" id="Psw" @keyup="verif">
                                        <div class="error">message erreur</div>
                                    </div>
                                </div>
                            </form>
                            <div class="container-btn">
                                <!--                                <div class="button-delete"> Précédent</div>-->
                                <div id="BtnS01" class="button-valider" @click="step01()"> Valider</div>
                            </div>
                        </div>
                        <div class="warning">
                            <button>
                                <router-link to="/accueil">J’AI DÉJÀ UN CODE STE</router-link>
                            </button><a>je n’ai pas reçu d’e-mail de confirmation</a></div>
                    </div>
                    
    <!--                              STEP02                                        -->
                    
                    <div class="section-inscription step-2" id="step02" style="display:none">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Charte de l’hôpital</H3>
                        </div>
                        <div class="content-step">
                            <p>Cette étape vous invite à accepter les conditions générales d’utilisation</p>
                            <label>Tour de rôle</label>
                            <div class="container-radio">
                                <div class="input-radio">
                                    <input id="oui" name="radio-name" type="radio" checked @click="verif02()">
                                    <label class="check-label">Oui</label>
                                </div>
                                <div class="input-radio">
                                    <input name="radio-name" type="radio" @click="verif02()">
                                    <label class="check-label">Non</label>
                                </div>
                            </div>
                            <div class="charte-content">
                                <div class="charte-bloc-ifram">
                                    <iframe frameborder="0" height="400" :src="Charte" type="application/pdf"></iframe>
                                </div>
                            </div>
                            <div class="container-check">
                                <div class="input-check">
                                    <input id="charte" name="checkbox-name" type="checkbox" @click="verif02()">
                                    <label class="check-label"> J’ai lu et j’accepte les conditions générales d’utilisation</label>
                                </div>
                            </div>
                            <div class="container-btn">
                                <div id="btnDS02" @click="precedent('02')" class="button-delete"> Précédent</div>
                                <div id="BtnS02" class="button-valider" @click="step02()" style="display:none"> Valider</div>
                            </div>
                        </div>
                    </div>

    <!--                              STEP03                                        -->
                    
                    <div id="step03" class="section-inscription step-3">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Informations générales</H3>
                        </div>
                        <div class="content-step">
                            <h4>Cette étape vous invite à remplir le formulaire d’informations générales</h4>
                            <form class="form form-step">
                                <label> Mot de passe</label>
                                <p>Votre mot de passe pour une connexion à Ptah Ste</p>
                                <div class="grid-2">
                                    <div class="input-field  col-2">
                                        <input id="formPSW" placeholder="Modifier votre mot de passe" class="form-control" type="password">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input id="formCPSW" placeholder="Confirmation mot de passe " class="form-control" type="password">
                                        <div class="error">message erreur</div>
                                    </div>
                                </div>
                            </form>
                            <form class="form form-step form-exergue">
                                <label>Raison sociale de votre entreprise *</label>
                                <div class="input-field  ">
                                    <input @keyup="verif03()" id="formRaison" v-model="Raison" class="form-control" type="text">
                                    <div class="error">message erreur</div>
                                </div>
                                <label>Numéro d’assurance maladie *</label>
                                <div class="input-field  ">
                                    <input @keyup="verif03()" minlength="9" maxlength="9" id="formNum" placeholder="Numéro de facturation Assurance Maladie à 9 chiffres " class="form-control" type="text">
                                    <div class="error">message erreur</div>
                                </div>
                                <label>Numéro siren *</label>
                                <div class="input-field  ">
                                    <input @keyup="verif03()" id="formSiren" placeholder="Numéro siren" class="form-control" type="text">
                                    <div class="error">message erreur</div>
                                </div>
                            </form>
                            <form class="form form-step">
                                <h4>Informations de contact</h4>
                                <div class="input-field  ">
                                    <input @keyup="verif03()" id="formNom" v-model="Nom" class="form-control" type="text">
                                    <div class="error">message erreur</div>
                                </div>
                                <div class="input-field  ">
                                    <input @keyup="verif03()" id="formAdresse" placeholder="Adresse * " class="form-control" type="text">
                                    <div class="error">message erreur</div>
                                </div>
                                <div class="grid-2">
                                    <div class="input-field  col-2">
                                        <input @keyup="verif03()" id="formCP" placeholder="Code Postal * " class="form-control" type="number">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input @keyup="verif03()" id="formVille" placeholder="Ville * " class="form-control" type="text">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input @keyup="verif03()" id="formTel" v-model="Tel" class="form-control" type="number">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input @keyup="verif03()" id="formMob" placeholder="Numéro de mobile * " class="form-control" type="number">
                                        <div class="error">message erreur</div>
                                    </div>
                                    <div class="input-field  col-2">
                                        <input id="formFax" placeholder="Fax" class="form-control" type="number">
                                        <div class="error">message erreur</div>
                                    </div>
                                </div>
                            </form>
                            <form class="form form-step">
                                <h4>Informations sur votre société</h4>
                                <label>Séléctionnez le ou les types de prestation</label>
                                <div class="bloc-item-type">
                                    <div class="bloc-item-type-row">
                                        <div class="input-check">
                                            <input @click="delockChk('AMB')" id="amb" name="checkbox-name" type="checkbox">
                                            <label class="check-label"> Ambulance</label>
                                        </div>
                                        <div class="input-field ">
                                            <input id="ambNB" placeholder="Nombre de véhicules" class="form-control" type="number" disabled>
                                            <div class="error">message erreur</div>
                                        </div>
                                        <div class="bloc-option">
                                            <div class="input-check">
                                                <input id="paraM" name="checkbox-name" type="checkbox" disabled>
                                                <label class="check-label"> ParaMedical</label>
                                            </div>
                                            <div class="input-check">
                                                <input id="psy" name="checkbox-name" type="checkbox" disabled>
                                                <label class="check-label"> Psychologique</label>
                                            </div>
                                            <div class="input-check">
                                                <input id="pedia" name="checkbox-name" type="checkbox" disabled>
                                                <label class="check-label"> Pediatrique</label>
                                            </div>
                                            <div class="input-check">
                                                <input id="baria" name="checkbox-name" type="checkbox" disabled>
                                                <label class="check-label"> Bariatrique</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bloc-item-type-row">
                                        <div class="input-check">
                                            <input @click="delockChk('VSL')" id="vsl" name="checkbox-name" type="checkbox">
                                            <label class="check-label">Vsl</label>
                                        </div>
                                        <div class="input-field ">
                                            <input id="vslNB" placeholder="Nombre de véhicules" class="form-control" type="number" disabled>
                                            <div class="error">message erreur</div>
                                        </div>
                                    </div>
                                    <div class="bloc-item-type-row">
                                        <div class="input-check">
                                            <input @click="delockChk('TAXI')" id="taxi" name="checkbox-name" type="checkbox">
                                            <label class="check-label"> Taxi</label>
                                        </div>
                                        <div class="input-field ">
                                            <input id="taxiNB" placeholder="Nombre de véhicules" class="form-control" type="number" disabled>
                                            <div class="error">message erreur</div>
                                        </div>
                                    </div>
                                    <div class="bloc-item-type-row">
                                        <div class="input-check">
                                            <input @click="delockChk('TPMR')" id="TPMR" name="checkbox-name" type="checkbox">
                                            <label class="check-label">TPMR</label>
                                        </div>
                                        <div class="input-field ">
                                            <input id="TPMRNB" placeholder="Nombre de véhicules" class="form-control" type="number" disabled>
                                            <div class="error">message erreur</div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="container-btn">
                                <div @click="precedent('03')" class="button-delete"> Précédent</div>
                                <div id="BtnS03" @click="step03()" class="button-valider" style="display:none"> Valider</div>
                            </div>
                        </div>
                    </div>
                    
    <!--                              STEP04                                        -->
                    
                    <div id="step04" class="section-inscription step-4">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Horaires de travail</H3>
                        </div>
                        <div class="content-step">
                            <h4>Séléctionnez le type de véhicule </h4>
                            <div class="container-tab">
                                <div @click="affTab('AMB')" id="btnAmb" class="tab-navigation" typeVeh="AMB">Ambulances</div>
                                <div @click="affTab('VSL')"id="btnVSL" class="tab-navigation" typeVeh="VSL">VSL</div>
                                <div @click="affTab('TAXI')"id="btnTaxi" class="tab-navigation" typeVeh="TAXI">Taxi</div>
                                <div @click="affTab('TPMR')"id="btnTPMR" class="tab-navigation" typeVeh="TPMR">TPMR</div>
                            </div>
                            <h4>Séléctionnez le type d’horaire</h4>
                            
                        <!-- Tab horaire AMB-->
                            
                            <div style="display:none" id="tabAMB">
                                <div v-for="item in NomHor" class="grid-3">
                                    <div class="col-3">
                                        <p>{{item}}</p>
                                    </div>
                                    <div class="col-3">
                                        <div class="grid-2">
                                            <div class="col-2">
                                                <label> Début </label>
                                                <input class="form-control debut" type="time" value="00:00">
                                            </div>
                                            <div class="col-2">
                                                <label> Fin </label>
                                                <input class="form-control fin" type="time" value="00:00">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        <!-- Tab horaire VSL-->
                            
                            <div style="display:none" id="tabVSL">
                                <div v-for="item in NomHor" class="grid-3">
                                    <div class="col-3">
                                        <p>{{item}}</p>
                                    </div>
                                    <div class="col-3">
                                        <div class="grid-2">
                                            <div class="col-2">
                                                <label> Début </label>
                                                <input class="form-control debut" type="time" value="00:00">
                                            </div>
                                            <div class="col-2">
                                                <label> Fin </label>
                                                <input class="form-control fin" type="time" value="00:00">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        <!-- Tab horaire TAXI-->
                            
                            <div style="display:none" id="tabTAXI">
                                <div v-for="item in NomHor" class="grid-3">
                                    <div class="col-3">
                                        <p>{{item}}</p>
                                    </div>
                                    <div class="col-3">
                                        <div class="grid-2">
                                            <div class="col-2">
                                                <label> Début </label>
                                                <input class="form-control debut" type="time" value="00:00">
                                            </div>
                                            <div class="col-2">
                                                <label> Fin </label>
                                                <input class="form-control fin" type="time" value="00:00">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        <!-- Tab horaire TPMR-->
                            
                            <div style="display:none" id="tabTPMR">
                                <div v-for="item in NomHor" class="grid-3">
                                    <div class="col-3">
                                        <p>{{item}}</p>
                                    </div>
                                    <div class="col-3">
                                        <div class="grid-2">
                                            <div class="col-2">
                                                <label> Début </label>
                                                <input class="form-control debut" type="time" value="00:00">
                                            </div>
                                            <div class="col-2">
                                                <label> Fin </label>
                                                <input class="form-control fin" type="time" value="00:00">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<!--
                            <p class="it">Cette étape vous invite à préciser vos tranches horaires de travail par type de véhicule. Chaque type possède son propre tableau d’horaires (réglé par défaut sur un horaire type 8h-18h tous les jours). Vous pouvez ajouter des plages horaire en double-cliquant sur le tableau (maximum trois plages horaires par jour) ou suprimer une plage horaire en cliquant une fois dessus et accepter la confirmation.</p>
                            <div id="tabAmb">
                                <TabHor id="TabHorAmb"></TabHor>
                            </div>
-->
                            <div class="container-btn">
                                <div @click="precedent('04')" class="button-delete"> Précédent</div>
                                <div @click="step04()" class="button-valider">Valider</div>
                            </div>
                        </div>
                    </div>

    <!--                             STEP 05                                      -->

                    <div id="step05" class="section-inscription step-5">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE</H2>
                            <H3>Transmission</H3>
                        </div>
                        <div class="content-step">
                            <h4>Paramétrage de transmission</h4>
                            <div class="parameter-info" id="modParametrageInscri">
                                <div class="c-card">
                                    <h3>Serveur Vocal</h3>
                                    <div class="input-field">
                                        <label> Numéro de téléphone: </label>
                                        <div class="info">
                                            <p>{{InfoSte.TelSte}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-card">
                                    <h3>Email</h3>
                                    <div class="input-field">
                                        <label> Votre Email :</label>
                                        <div class="info">
                                            <p>{{InfoSte.Email}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-card">
                                    <h3>SMS</h3>
                                    <div class="input-field">
                                        <label> Numéro de mobile :</label>
                                        <div class="info">
                                            <p>{{InfoSte.SmsSte}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-card">
                                    <h3>Ptah Transporteur</h3>
                                    <div class="input-field">
                                        <label> Identifiant :</label>
                                        <div class="info">
                                            <p>{{CodSte}} </p>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <label> Mot de passe :</label>
                                        <input @keyup="checkMdpPT()" id="chgMdpPT" class="form-control" type="password" placeholder="Créer votre mot de passe" />
                                        <input @keyup="checkMdpPT()" id="recupMdpPT" class="form-control" type="password" placeholder="Confirmer la création" />
                                        <div class="container-btn c-card-enrollment">
                                            <button class="button-valider" @click="chgMdpPT()" id="btnPswPT">Valider la création de mot de passe</button>
                                        </div>
                                        <div class="input-field">
                                            <label>Adresse (url) :</label>
                                            <div class="info">
                                                <p>{{InfoSte.Serveur_PtahTpt}}</p>
                                            </div>
                                        </div>
                                        <div class="input-field">
                                            <label>Port :</label>
                                            <div class="info">
                                                <p>{{InfoSte.Port_PtahTpt}}</p>
                                            </div>
                                        </div>
                                        <div class="input-field">
                                            <label>Faut-il utiliser HTTPS : </label>
                                            <div class="info">
                                                <p>{{InfoSte.Https_PtahTpt}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bloc-card-button"><button><a href="http://play.google.com/store/apps/details?id=com.geosoft.ptahmobste"><span class="ico-ps"></span> <span class="android"> Téléchargement Google Play</span><span class="arrow"></span></a></button></div>
                                </div>
                            </div>

                            <!-- // -->

                            <h4>Transmissions horaires</h4>
                            <div class="Transmission-horaires-container">
                                <div class="Transmission-horaires">
                                    <div class="table-parameter">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Serveur Vocal</th>
                                                    <th>Serveur Vocal + SMS</th>
                                                    <th>SMS</th>
                                                    <th>Smartphone</th>
                                                    <th>Interface</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in NomHor">
                                                    <td>{{item}}</td>
                                                    <td>
                                                        <div class="input-radio">
                                                            <input :name="index" :id="'tel' + index" type="radio" class="telTD">
                                                            <label class="check-label"> </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-radio">
                                                            <input :name="index" :id="'telsms' + index" type="radio" class="telsmsTD">
                                                            <label class="check-label"> </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-radio">
                                                            <input :name="index" :id="'sms' + index" type="radio" class="smsTD">
                                                            <label class="check-label"> </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-radio">
                                                            <input :name="index" :id="'app' + index" type="radio" class="appTD">
                                                            <label class="check-label"> </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-radio">
                                                            <input :name="index" :id="'web' + index" type="radio" class="webTD">
                                                            <label class="check-label"> </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-radio">
                                                            <input :name="index" :id="'mel' + index" type="radio" class="melTD">
                                                            <label class="check-label"> </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- // -->
                            <div class="container-btn">
                                <div @click="precedent('05')" class="button-delete"> Précédent</div>
                                <div class="button-valider" @click="step05()"> Valider</div>
                            </div>
                        </div>
                    </div>

    <!--                                    STEP 06                          -->

                    <div id="step06" class="section-inscription step-6">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Autorisations de stationnement</H3> <!-- TITRE dynamique  -->
                        </div>
                        <div class="content-step">
                            <p class="it">Cliquez sur l'icone <span class="add-ex"></span> plus afin d'ajouter de nouveau agrément</p>
                            <div v-for="(item,index) in compo" :key="item.id">
                                <AGSTAND :dataindex="index" :dataitem="item"></AGSTAND>
                            </div>
                            <div class="zone-default">
                                <!-- au clic button add : Boucle container-agreement"-->
                                <div class="container-agreement standart">
                                    <!-- par default taxi &  autorisation de stationnement  sinon Numéro d’agrément -->
                                    <div class="bloc-option">
                                        <div class="input-check">
                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">Taxi</label>
                                        </div>
                                        <div class="input-check">
                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">VSL</label>
                                        </div>
                                        <div class="input-check">
                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">AMBULANCE</label>
                                        </div>
                                    </div>
                                    <div class="bloc-agreement">
                                        <div class="container-action">
                                            <span class="add" @click="addAgrement()"></span>
                                        </div>
                                        <form class="form form-step">
                                            <div class="grid-2">
                                                <div class=" col-2">
                                                    <label>Choix du département </label>
                                                    <div class="select-field">
                                                        <select autocomplete v-model="SelectDpt" @change="affVille()" class="recupDep">
                                                            <option disabled value="">Sélectionnez un département</option>
                                                            <option v-for="option in Dpt" v-bind:value="option.Dept">{{option.LibDpt}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class=" col-2">
                                                    <label>Choix de la ville </label>
                                                    <div class="select-field">
                                                        <select autocomplete v-model="SelectVille" id="Selectville" disabled class="recupVille">
                                                            <option>Sélectionnez une ville</option>
                                                            <option v-for="option in Communes" v-bind:value="option.CInsee">{{option.Libelle}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-3">
                                                <div class=" col-3">
                                                    <div class="input-field ">
                                                        <!-- change clic taxi = autorisation de stationnement sinon ( amb, vsl ) Numéro d’agrément-->
                                                        <input class="form-control" maxlength="16" placeholder="Numéro d'autorisation de stationnement" type="text">
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="input-field">
                                                        <input class="form-control" placeholder="Nombre de véhicule" type="number">
                                                        <div class="error">
                                                            message erreur
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="input-field">
                                                        <input class="form-control" placeholder="Date limite d’autorisation" type="date">
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="container-btn">
                                <div @click="precedent('06')" class="button-delete"> Précédent</div>
                                <div @click="step06()" class="button-valider"> Valider</div>
                            </div>
                        </div>
                    </div>

    <!--                                STEP 06 BIS                         -->

                    <div id="step06BIS" class="section-inscription step-6">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Autorisations de stationnement</H3>
                        </div>
                        <div class="content-step">
                            <p class="it">Cliquez sur l'icone <span class="add-ex"></span> plus afin d'ajouter de nouveau agrément</p>
                            <div v-for="(item,index) in compo" :key="item.id">
                                <AGPARTIC :dataindex="index"></AGPARTIC>
                            </div>
                            <div class="zone-particular">
                                <div class="container-agreement particulier">
                                    <div class="bloc-option">
                                        <div class="input-check">
                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">Taxi</label>
                                        </div>
                                        <div class="input-check">
                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">VSL</label>
                                        </div>
                                        <div class="input-check">
                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">AMBULANCE</label>
                                        </div>
                                    </div>
                                    <div class="bloc-agreement">
                                        <div class="container-action">
                                            <span class="add" @click="addAgrement()"></span>
                                        </div>
                                        <form class="form form-step">
                                            <div class="grid-2">
                                                <div class=" col-2">
                                                    <label>Choix du département </label>
                                                    <div class="select-field">
                                                        <select autocomplete v-model="SelectDpt" class="recupDep">
                                                            <option disabled value="">Sélectionnez un département</option>
                                                            <option v-for="option in Dpt" v-bind:value="option.Dept">{{option.LibDpt}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class=" col-2">
                                                </div>
                                            </div>
                                            <div class="grid-3">
                                                <div class=" col-3">
                                                    <div class="input-field ">
                                                        <input class="form-control" placeholder="Numéro de marché" type="text">
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="input-field">
                                                        <input class="form-control" placeholder="Nombre de véhicule" type="number">
                                                        <div class="error">
                                                            message erreur
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="bloc-option">
                                                        <div class="input-check">
                                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">ParaMed</label>
                                                        </div>
                                                        <div class="input-check">
                                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">Psy</label>
                                                        </div>
                                                        <div class="input-check">
                                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">Pedia</label>
                                                        </div>
                                                        <div class="input-check">
                                                            <input name="checkbox-name" type="checkbox"> <label class="check-label">Baria</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="container-btn">
                                <div @click="precedent('06BIS')" class="button-delete"> Précédent</div>
                                <div @click="step06()" class="button-valider"> Valider</div>
                            </div>
                        </div>
                    </div>

    <!--                                 STEP 07                         -->

                    <div id="step07" class="section-inscription step-7">
                        <div class="bloc-title-enrollment">
                            <H2>CRÉATION DE COMPTE </H2>
                            <H3>Zones de chalandise</H3> <!-- TITRE dynamique  -->
                        </div>
                        <div class="content-step">
                            <p>Cette étape vous invite à cocher vos secteurs d’interventions</p>
                            <div class="warning">
                                <p>Nous attirons votre attention sur les risques ...</p>
                            </div>
                            <div class="container-bloc-zones">
                                <div class="bloc-zones">
                                    <div>
                                        <div class="head">
                                            <div class="search-bar">
                                                <span class="btn--search"></span> <input type="search" placeholder="Entrez le nom de la zone recherchée">
                                            </div>
                                            <div class="input-check">
                                                <input name="checkbox-name" type="checkbox">
                                                <label class="check-label"> Tout cocher/ décocher</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div v-for="item in treeData" class="content-zones" id="accordion">
                                            <div class="input-check" id="test">
                                                <input name="checkbox-name" class="niveau0" type="checkbox">
                                                <label class="check-label">{{item.Secteur}}</label>
                                                <div v-for="items in item.Zone" class="input-check zone-container">
                                                    <input name="checkbox-name" class="niveau1" type="checkbox">
                                                    <label class="check-label">{{items.Secteur}}</label>
                                                    <div v-for="itemss in items.Zone" class="child-zone">
                                                        <span class="flag"></span>
                                                        <div class="input-check child">
                                                            <input name="checkbox-name" class="niveau2" type="checkbox">
                                                            <label class="check-label">{{itemss.Secteur}}</label>
                                                        </div>
                                                        <div class="accordion">
                                                            <span class="arrow"></span>
                                                            <div class="content">
                                                                <div class="bloc-item-type-row">
                                                                    <div class="">
                                                                        <div class="input-field ">
                                                                            <label class="check-label">Ambulance</label>
                                                                            <input placeholder="Nombre de véhicules" type="text" class="form-control">
                                                                        </div>
                                                                        <div class="input-field ">
                                                                            <label class="check-label">VSL</label>
                                                                            <input placeholder="Nombre de véhicules" type="text" class="form-control">
                                                                        </div>
                                                                        <div class="input-field ">
                                                                            <label class="check-label">Taxi</label>
                                                                            <input placeholder="Nombre de véhicules" type="text" class="form-control">
                                                                        </div>
                                                                        <div class="input-field ">
                                                                            <label class="check-label">TPMR</label>
                                                                            <input placeholder="Nombre de véhicules" type="text" class="form-control">
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
                                </div>
                                <div class="container-btn">
                                    <div @click="precedent('07')" class="button-delete"> Précédent</div>
                                    <div @click="step07()" class="button-valider"> Valider</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
    <!--                                STEP08                          -->

                    <div id="step08" class="section-inscription step-8">
                        <div class="content-step step-final">
                            <div class="bloc-title-enrollment">
                                <H5>Félicitations</H5>
                                <H3>Vous avez validé le parcours d’inscription</H3>
                            </div>
<!--                            <p> accusatorem flagitaret atque sollemnia, doctus id Caesar libe</p>-->
                            <router-link to="/accueil"><button>Se rendre dans votre espace </button></router-link>
                        </div>
                    </div>
                </div>
                <footerInscri></footerInscri>
            </div>
        </div>
    </div>

</template>