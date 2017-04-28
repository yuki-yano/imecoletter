/* @flow */
import Vue from 'vue'
import Vuex from 'vuex'

import authActions from 'actions/auth'
import searchActions from 'actions/search'
import tweetActions from 'actions/tweet'
import modalAction from 'actions/modal'
import settingsAction from 'actions/settings'
import debugAction from 'actions/debug'
import * as getters from './getters'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: Object.assign(authActions, searchActions, tweetActions, modalAction, settingsAction, debugAction),
  getters,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
