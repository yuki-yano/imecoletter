/* @flow */
import Config from 'electron-config'

import type { SettingsState } from 'types/mutation'

import * as MUTATION from 'vuex/mutation-types'

const state: SettingsState = {
  autoReload: 90,
  imageCount: 1000
}

const mutations = {
  [MUTATION.SET_AUTO_RELOAD] (state: SettingsState, { time, index }: { time: number, index: number }) {
    state.autoReload = time
    const config = new Config()
    config.set('auto_reload_index', index)
  },
  [MUTATION.SET_IMAGE_COUNT] (state: SettingsState, { count, index }: { count: number, index: number }) {
    state.imageCount = count
    const config = new Config()
    config.set('image_count_index', index)
  }
}

export default {
  state,
  mutations
}
