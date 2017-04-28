/* @flow */
import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

export default {
  [ACTION.ON_SAVE_MODE]: ({ commit }) => {
    commit(MUTATION.ON_SAVE_MODE)
  },
  [ACTION.OFF_SAVE_MODE]: ({ commit }) => {
    commit(MUTATION.OFF_SAVE_MODE)
  }
}
