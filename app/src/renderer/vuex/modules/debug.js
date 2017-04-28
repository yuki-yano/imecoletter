/* @flow */
import Config from 'electron-config'

import type { DebugState } from 'types/mutation'

import * as MUTATION from 'vuex/mutation-types'

const state: DebugState = {
  saveMode: false
}

const mutations = {
  [MUTATION.ON_SAVE_MODE] (state: DebugState) {
    state.saveMode = true
    const config = new Config()
    config.set('save_mode', true)
  },
  [MUTATION.OFF_SAVE_MODE] (state: DebugState) {
    state.saveMode = false
    const config = new Config()
    config.set('save_mode', false)
  }
}

export default {
  state,
  mutations
}
