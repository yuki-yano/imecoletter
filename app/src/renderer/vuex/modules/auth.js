/* @flow */
import Config from 'electron-config'

import type { AuthState } from 'types/mutation'

import * as MUTATION from 'vuex/mutation-types'

const state: AuthState = {
  login: false,
  access_token: '',
  access_secret: ''
}

const mutations = {
  [MUTATION.LOGIN] (
    state: AuthState,
    { accessToken, accessSecret }: { accessToken: string, accessSecret: string }
  ) {
    const config = new Config()
    config.set('twitter_access_token', accessToken)
    config.set('twitter_access_secret', accessSecret)
    config.set('is_login', true)
    state.access_token = accessToken
    state.access_secret = accessSecret
    state.login = true
  },
  [MUTATION.LOGOUT] (_state: AuthState) {
    const config = new Config()
    config.delete('twitter_access_token')
    config.delete('twitter_access_secret')
  }
}

export default {
  state,
  mutations
}
