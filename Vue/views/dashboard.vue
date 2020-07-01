<script src="@/controllers/dashboard"></script>

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
                  <div class="tab tab-child-1 active">
                    <router-link to="/dashboard" class="home">Les sociétés</router-link>
                  </div>
                  <div class="tab tab-child-2">
                    <router-link to="/gen_zone" class="home">
                      Zones d'activité
                      <span>(de toutes les sociétés)</span>
                    </router-link>
                  </div>
                </div>
                <div class="tab-content">
                  <div class="panel-tab panel tab-content panel-child-1">
                    <table class="table-society">
                      <thead>
                        <tr>
                          <th class="col-6 sort">Nom de la société</th>
                          <th>Login</th>
                          <th class="col-3">Ville</th>
                          <th class="col-7">Adresse de la société</th>
                          <th class="col-3">Tél</th>
                          <th class="col-3">Fax</th>
                          <th class="col-3">Mobile</th>
                          <th class="col-3">Actions</th>
                          <th class="col-3 sort">Zone d'activité</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in Ste">
                          <td>{{item.LibSte}}</td>
                          <td>{{item.CodSte}}</td>
                          <td>{{item.VilSte}}</td>
                          <td>{{item.AdrSte}}</td>
                          <td>{{item.TelSte}}</td>
                          <td>{{item.FaxSte}}</td>
                          <td>{{item.SmsSte}}</td>
                          <td>
                            <span class="ico-edit" @click="showModal(item)"></span>
                          </td>
                          <td>
                            <span class="ico-detail-dash" @click="pushSte(item)"></span>
                          </td>
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
    <!-- S E C T I O N  M O D A L  I N S I D E -->
    <div id="modalIG" class="wrapper-modal-inside" style="display:none">
      <!--  M O D A L Info G  -->
      <div class="modal-inside">
        <div class="modal-wrap is-visible modal-inside-panel modal-table">
          <a class="modal-close" @click="closeModal()"></a>
          <!-- F O R M  S M O D A L   -->
          <div class="tab-container">
            <div class="tab-start">
              <div class="tab tab-child-1 active" id="ongletInfos">
                <a @click="afficheInfoSection('infos')">Informations générales</a>
              </div>
              <div class="tab tab-child-2" id="ongletHoraires">
                <a @click="afficheInfoSection('horaires')">Horaires</a>
              </div>
              <div class="tab tab-child-2" id="ongletParametrage">
                <a @click="afficheInfoSection('parametrage')">Paramétrage transmission</a>
              </div>
              <div class="tab tab-child-2" id="ongletTransmissions">
                <a @click="afficheInfoSection('transmissions')">Transmission horaires</a>
              </div>
            </div>
            <div class="tab-content" id="modInfos">
              <div class="panel-tab panel panel-child-1">
                <form action class="form-modal form-step-1">
                  <h5 class="m-1">Informations contacts :</h5>
                  <div class="field-50">
                    <div class="input-field">
                      <label>Nom</label>
                      <input
                        id="NomSte"
                        class="form-control"
                        placeholder="Nom"
                        v-model="NomSte"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Adresse</label>
                      <input
                        id="AdrSte"
                        class="form-control"
                        placeholder="Adresse"
                        v-model="AdrSte"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Code postal</label>
                      <input
                        id="CPoste"
                        class="form-control"
                        placeholder="Code Postal"
                        v-model="CodPSte"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Ville</label>
                      <input
                        id="VilSte"
                        class="form-control"
                        placeholder="Ville"
                        v-model="VilSte"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Téléphone</label>
                      <input
                        id="TelSte"
                        class="form-control"
                        placeholder="Téléphone"
                        v-model="TelSte"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Portable</label>
                      <input
                        id="SmsSte"
                        class="form-control"
                        placeholder="Portable"
                        v-model="SmsSte"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Email</label>
                      <input
                        id="Email"
                        class="form-control"
                        placeholder="Email"
                        v-model="Email"
                        type="text"
                      />
                    </div>
                    <div class="input-field">
                      <label>Contact</label>
                      <input
                        id="Contact"
                        class="form-control"
                        placeholder="Contact"
                        v-model="Contact"
                        type="text"
                      />
                    </div>
                  </div>
                  <h5 class="m-1">Changer le mot de passe du portail:</h5>
                  <div class="bloc-pwd">
                    <div class="bloc-pwd-line field-50">
                      <div class="input-field">
                        <label>Changer le mot de passe</label>
                        <input
                          @keyup="checkMdp()"
                          id="chgMdp"
                          class="form-control"
                          placeholder="Nouveau mot de passe"
                          type="password"
                          autocomplete="new-password"
                          maxlength="30"
                        />
                      </div>
                      <div class="input-field">
                        <label>Confirmer le mot de passe</label>
                        <input
                          @keyup="checkMdp()"
                          id="cfMdp"
                          class="form-control"
                          placeholder="Confirmation du mot de passe"
                          type="password"
                          autocomplete="new-password"
                          maxlength="30"
                        />
                      </div>
                    </div>
                    <div class="container-btn">
                      <button
                        @click="chgMdp()"
                        class="button-valider"
                        id="btnPsw"
                        type="button"
                      >Changer le mot de passe</button>
                    </div>
                  </div>
                  <h5 class="m-1">Je peux faire des transports :</h5>
                  <div class="grid-2">
                    <div class="col-2">
                      <div class="input-check">
                        <input id="checkbox-2" name="checkbox-2" type="checkbox" :checked="ParaMed" />
                        <label for="checkbox-2" class="check-label">Para-médicalisés</label>
                      </div>
                      <div class="input-check">
                        <input
                          id="checkbox-3"
                          name="checkbox-3"
                          type="checkbox"
                          :checked="Psychiatrie"
                        />
                        <label for="checkbox-3" class="check-label">Psychiatriques</label>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="input-check">
                        <input
                          id="checkbox-4"
                          name="checkbox-4"
                          type="checkbox"
                          :checked="Bariatrique"
                        />
                        <label for="checkbox-4" class="check-label">Bariatriques</label>
                      </div>
                      <div class="input-check">
                        <input
                          id="checkbox-5"
                          name="checkbox-5"
                          type="checkbox"
                          :checked="Pediatrie"
                        />
                        <label for="checkbox-5" class="check-label">Pédiatriques</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 class="m-1">Informations complémentaires :</h5>
                    <br />
                    <div class="field-50">
                      <div class="input-field">
                        <label>Particularités acceptées :</label>
                        <div class="container-list-part">
                            <div v-for="item in lstPartics" class="input-check">
                            <input
                                class="form-control"
                                type="checkbox"
                                :value="item.Partic"
                                v-model="particOkCheck"
                            />
                            <label class="check-label">{{item.LibPartic}}</label>
                            </div>
                        </div>
                      </div>
                      <div class="input-field">
                        <label>Particularités refusées :</label>
                         <div class="container-list-part">
                        <div v-for="item in lstPartics" class="input-check">
                          <input
                            class="form-control"
                            type="checkbox"
                            :value="item.Partic"
                            v-model="particKoCheck"
                          />
                          <label class="check-label">{{item.LibPartic}}</label>
                        </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="container-btn c-b-absolute">
                <button @click="enregistrerInfos()" class="button-valider" type="button">valider</button>
              </div>
            </div>
            <div class="tab-content" id="modHoraires" style="display:none">
              <div class="panel-tab panel panel-child-2">
                <form action class="form-modal form-step-2">
                  <div class="grid-3">
                    <div class="col-3">&nbsp;</div>
                    <div class="col-3">
                      <h5>Ambulances</h5>
                    </div>
                    <div class="col-3">
                      <h5>TAP</h5>
                    </div>
                    <div class="col-3">
                      <p>Horaires définis :</p>
                    </div>
                    <div class="col-3">
                      <input
                        disabled
                        id="HorAmb"
                        class="form-control"
                        placeholder="Horaires Ambulances"
                        v-model="HorAmb"
                        type="text"
                      />
                    </div>
                    <div class="col-3">
                      <input
                        disabled
                        id="HorVsl"
                        class="form-control"
                        placeholder="Horaires Vsl"
                        v-model="HorVsl"
                        type="text"
                      />
                    </div>

                    <div class="col-3">
                      <p>Jour de semaine :</p>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrAMB1"
                            class="form-control"
                            v-model="HorDebTdrAMB1"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrAMB1"
                            class="form-control"
                            v-model="HorFinTdrAMB1"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrTAP1"
                            class="form-control"
                            v-model="HorDebTdrTAP1"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrTAP1"
                            class="form-control"
                            v-model="HorFinTdrTAP1"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <p>Jour de samedi :</p>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrAMB2"
                            class="form-control"
                            v-model="HorDebTdrAMB2"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrAMB2"
                            class="form-control"
                            v-model="HorFinTdrAMB2"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrTAP2"
                            class="form-control"
                            v-model="HorDebTdrTAP2"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrTAP2"
                            class="form-control"
                            v-model="HorFinTdrTAP2"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <p>Jour de dimanche et férié :</p>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrAMB3"
                            class="form-control"
                            v-model="HorDebTdrAMB3"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrAMB3"
                            class="form-control"
                            v-model="HorFinTdrAMB3"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrTAP3"
                            class="form-control"
                            v-model="HorDebTdrTAP3"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrTAP3"
                            class="form-control"
                            v-model="HorFinTdrTAP3"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <p>Nuit de semaine :</p>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrAMB4"
                            class="form-control"
                            v-model="HorDebTdrAMB4"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrAMB4"
                            class="form-control"
                            v-model="HorFinTdrAMB4"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrTAP4"
                            class="form-control"
                            v-model="HorDebTdrTAP4"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrTAP4"
                            class="form-control"
                            v-model="HorFinTdrTAP4"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <p>Nuit de samedi :</p>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrAMB5"
                            class="form-control"
                            v-model="HorDebTdrAMB5"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrAMB5"
                            class="form-control"
                            v-model="HorFinTdrAMB5"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrTAP5"
                            class="form-control"
                            v-model="HorDebTdrTAP5"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrTAP5"
                            class="form-control"
                            v-model="HorFinTdrTAP5"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <p>Nuit de dimanche et férié :</p>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrAMB6"
                            class="form-control"
                            v-model="HorDebTdrAMB6"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrAMB6"
                            class="form-control"
                            v-model="HorFinTdrAMB6"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="grid-2">
                        <div class="col-2">
                          <input
                            id="HorDebTdrTAP6"
                            class="form-control"
                            v-model="HorDebTdrTAP6"
                            type="time"
                          />
                        </div>
                        <div class="col-2">
                          <input
                            id="HorFinTdrTAP6"
                            class="form-control"
                            v-model="HorFinTdrTAP6"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="container-btn c-b-absolute">
                <button @click="enregistrerInfos()" class="button-valider" type="button">valider</button>
              </div>
            </div>
            <div class="tab-content" id="modTransmissions" style="display:none">
              <div class="panel-tab panel panel-child-2">
                <p>La modifiaction des paramètres ci-dessous peuvent entrainer certaines problématiques lièes a la transmission de mission. Nous vous recommandons de la vigilance.</p>
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
                            <input :name="index" :id="'tel' + index" type="radio" class="telTD" />
                            <label class="check-label"></label>
                          </div>
                        </td>
                        <td>
                          <div class="input-radio">
                            <input
                              :name="index"
                              :id="'telsms' + index"
                              type="radio"
                              class="telsmsTD"
                            />
                            <label class="check-label"></label>
                          </div>
                        </td>
                        <td>
                          <div class="input-radio">
                            <input :name="index" :id="'sms' + index" type="radio" class="smsTD" />
                            <label class="check-label"></label>
                          </div>
                        </td>
                        <td>
                          <div class="input-radio">
                            <input :name="index" :id="'app' + index" type="radio" class="appTD" />
                            <label class="check-label"></label>
                          </div>
                        </td>
                        <td>
                          <div class="input-radio">
                            <input :name="index" :id="'web' + index" type="radio" class="webTD" />
                            <label class="check-label"></label>
                          </div>
                        </td>
                        <td>
                          <div class="input-radio">
                            <input :name="index" :id="'mel' + index" type="radio" class="melTD" />
                            <label class="check-label"></label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="container-btn c-b-absolute">
                <button @click="enregistrerInfos()" class="button-valider" type="button">valider</button>
              </div>
            </div>
            <div class="tab-content tab-parameter-info" id="modParametrage" style="display:none">
              <div class="panel-tab container-transmission">
                <div class="c-card">
                  <h3>Serveur Vocal</h3>
                  <p>Votre numéro de téléphone peut être modifié dans l'onglet "Informations générales"</p>
                  <div class="input-field">
                    <label>Numéro de téléphone:</label>
                    <div class="info">
                      <p>{{TelSte}}</p>
                    </div>
                  </div>
                </div>
                <div class="c-card">
                  <h3>SMS</h3>
                  <p>Votre numéro de mobile peut être modifié dans l'onglet "Informations générales"</p>
                  <div class="input-field">
                    <label>Numéro de mobile :</label>
                    <div class="info">
                      <p>{{SmsSte}}</p>
                    </div>
                  </div>
                </div>
                <div class="c-card">
                  <h3>Email</h3>
                  <p>Votre Email peut être modifié dans l'onglet "Informations générales"</p>
                  <div class="input-field">
                    <label>Votre Email :</label>
                    <div class="info">
                      <p>{{Email}}</p>
                    </div>
                  </div>
                </div>
                <div class="c-card">
                  <h3>Interface</h3>
                  <div class="input-field">
                    <label>Identifiant :</label>
                    <div class="info">
                      <p>{{InfoSte.Radio}}</p>
                    </div>
                    <label>Clé :</label>
                    <div class="info">
                      <p>{{InfoSte.PassW1}}</p>
                    </div>
                  </div>
                </div>
                <div class="c-card">
                  <h3>Ptah Transporteur</h3>
                  <div class="input-field">
                    <label>Identifiant :</label>
                    <div class="info">
                      <p>{{InfoSte.Radio}}</p>
                    </div>
                  </div>
                  <div class="input-field">
                    <label>Mot de passe :</label>
                    <input
                      @keyup="checkMdpPT()"
                      id="chgMdpPT"
                      class="form-control"
                      type="password"
                      placeholder="Modifier votre mot de passe"
                    />
                    <input
                      @keyup="checkMdpPT()"
                      id="recupMdpPT"
                      class="form-control"
                      type="password"
                      placeholder="Confirmer la modification"
                    />

                    <div class="container-btn">
                      <button
                        class="button-valider"
                        @click="chgMdpPT()"
                        id="btnPswPT"
                      >Valider le changement de mot de passe</button>
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
                      <label>Faut-il utiliser HTTPS :</label>
                      <div class="info">
                        <p>{{InfoSte.Https_PtahTpt}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="bloc-card-button">
                    <button>
                      <a href="http://play.google.com/store/apps/details?id=com.geosoft.ptahmobste">
                        <span class="ico-ps"></span>
                        <span class="android">Téléchargement Google Play</span>
                        <span class="arrow"></span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
              <div class="container-btn c-b-absolute">
                <button @click="enregistrerInfos()" class="button-valider" type="button">valider</button>
              </div>
            </div>
            <!-- <div class="container-btn">
              <button @click="enregistrerInfos()" class="button-valider" type="button">valider</button>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>