import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import NovaP from './components/NovaP.vue'
import store from './store.js'

const routes = [
   { path: '/', component: Students},
   { path: '/student-info/:id', component: StudentInfo, props: true},
   { path: '/nova-poshta/', component: NovaP}
]

const router = new VueRouter({
   routes
})

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

new Vue({
   render: h => h(App),
   el: '#App',
   router,
   store
})
