import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/views/accueil'
import Dashboard from '@/views/dashboard'
import Zone from '@/views/zone'
import Home from '@/views/home'
import Gen_zone from '@/views/gen_zone'
import Mission from '@/views/mission'
import Factu from '@/views/factu'
import Detail from '@/views/detail'
import DetailMission from '@/views/detailMission'
import demandeHistorique from '@/views/demandeHistorique'
import Tarif from '@/views/tarif'
import Informations from '@/views/informations'
import Demande from '@/views/demande'
import error from '@/views/error'
import Statistique from '@/views/statistique'
import inscription from '@/views/inscription'


Vue.use(Router)

export default new Router({
  routes: [
      {path: '/', component: Accueil },
      {path: '/accueil', name: 'accueil', redirect: '/' },
      {path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresSession: true}},
      {path: '/zone', name: 'zone', component: Zone, meta: { requiresSession: true}},
      {path: '/gen_zone', name: 'gen_zone', component: Gen_zone, meta: { requiresSession: true}},
      {path: '/mission', name: 'mission', component: Mission, meta: { requiresSession: true}},
      {path: '/home', name: 'home', component: Home, meta: { requiresSession: true}},
      {path: '/factu', name: 'factu', component: Factu, meta: { requiresSession: true}},
      {path: '/detail', name: 'detail', component: Detail, meta: { requiresSession: true}},
      {path: '/detailMission', name: 'detailMission', component: DetailMission, meta: { requiresSession: true}},  
      {path: '/demandeHistorique', name: 'demandeHistorique', component: demandeHistorique, meta: { requiresSession: true}},    
      {path: '/tarif', name: 'tarif', component: Tarif, meta: { requiresSession: true}},
      {path: '/informations', name: 'informations', component: Informations, meta: { requiresSession: true}},
      {path: '/demande', name: 'demande', component: Demande, meta: { requiresSession: true}},
      {path: '/error', name: 'error', component: error, meta: { requiresSession: true}},
      {path: '/statistique', name: 'statistique', component: Statistique, meta: { requiresSession: true}},
      {path: '/inscription', name: 'inscription', component: inscription, meta: { requiresSession: true}}     
  ]
})
