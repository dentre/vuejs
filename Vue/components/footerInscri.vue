<template>
    <div class="master-enrollment-footer page-1">
    <!-- add class page-1 page-2 -->
        <div class="progress-bar-container">
            <div class="progress-bar-enrollment">
                <div class="line"> </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from "vue-resource"
    import VueSession from 'vue-session'
    import VueLocalStorage from 'vue-localstorage'
    import LibPerso from '../../../../include/LibJS.js'

    Vue.use(VueSession)
    Vue.use(VueResource)
    Vue.use(VueLocalStorage)

    export default {
        name: 'footerInscri',
        methods: {
            logout() {
                localStorage.clear()
                this.$session.destroy()
                this.$router.push('/')
            },
            toggleMobileMenu(){
                LibPerso.toggleMobileMenu()  
            }
        }
    }
</script>