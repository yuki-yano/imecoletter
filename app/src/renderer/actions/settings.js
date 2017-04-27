/* @flow */
import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

export default {
  [ACTION.SET_AUTO_RELOAD]: ({ commit }, { time }) => {
    commit(MUTATION.SET_AUTO_RELOAD, time)
  },
  [ACTION.SET_IMAGE_COUNT]: ({ commit }, { count }) => {
    commit(MUTATION.SET_IMAGE_COUNT, count)
  }
}
