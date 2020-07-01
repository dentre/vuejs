import Vue from 'vue'
import VueResource from "vue-resource"
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'


Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

export default {
    name: 'error',
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')                         
        }

    },
    methods: {
        goBack() {
            localStorage.removeItem('Actif')
            this.$router.push('/dashboard')
        },
    },
}