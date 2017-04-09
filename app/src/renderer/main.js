/* @flow */
import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import VueLazyLoad from 'vue-lazyload'

import App from './App'
import routes from './routes'

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'sweetalert/dist/sweetalert.css'

Vue.use(Electron)
Vue.use(Router)
Vue.use(VueLazyLoad)

Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
