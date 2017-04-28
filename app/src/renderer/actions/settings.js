/* @flow */
import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

export default {
  [ACTION.SET_AUTO_RELOAD]: ({ commit }, { time, index }) => {
    commit(MUTATION.SET_AUTO_RELOAD, { time, index })
  },
  [ACTION.SET_IMAGE_COUNT]: ({ commit }, { count, index }) => {
    commit(MUTATION.SET_IMAGE_COUNT, { count, index })
  }
}
