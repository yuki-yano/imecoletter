/* @flow */
import Config from 'electron-config'

import type { SettingsState } from 'types/mutation'

import * as MUTATION from 'vuex/mutation-types'

const state: SettingsState = {
  autoReload: 90,
  imageCount: 1000
}
const config = new Config()

if (config.get('auto_reload') !== undefined) {
  state.autoReload = config.get('auto_reload')
}
if (config.get('auto_reload') !== undefined) {
  state.autoReload = config.get('auto_reload')
}

const mutations = {
  [MUTATION.SET_AUTO_RELOAD] (state: SettingsState, time: number) {
    state.autoReload = time
    config.set('auto_reload', time)
  },
  [MUTATION.SET_IMAGE_COUNT] (state: SettingsState, count: number) {
    state.imageCount = count
    config.set('image_count', count)
  }
}

export default {
  state,
  mutations
}
