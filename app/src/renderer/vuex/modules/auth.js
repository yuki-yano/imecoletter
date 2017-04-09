/* @flow */
import Config from 'electron-config'

import type { AuthState } from 'types/mutation'

import * as MUTATION from 'vuex/mutation-types'

const config = new Config()

const state: AuthState = {
  login: false,
  access_token: '',
  access_secret: ''
}

const mutations = {
  [MUTATION.LOGIN] (state: AuthState, { accessToken, accessSecret }: {accessToken: string, accessSecret: string}) {
    config.set('twitter_access_token', accessToken)
    config.set('twitter_access_secret', accessSecret)
    state.login = true
    state.access_token = accessToken
    state.access_secret = accessSecret
  },
  [MUTATION.LOGOUT] (_state: AuthState) {
    config.delete('twitter_access_token')
    config.delete('twitter_access_secret')
  }
}

export default {
  state,
  mutations
}
