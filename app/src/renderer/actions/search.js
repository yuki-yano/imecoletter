/* @flow */
import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

export default {
  [ACTION.ADD_SEARCH_TAG]: ({ commit }, { label }) => {
    commit(MUTATION.ADD_SEARCH_TAG, label)
  },
  [ACTION.REMOVE_SEARCH_TAG]: ({ commit }, { labelName }) => {
    commit(MUTATION.REMOVE_SEARCH_TAG, labelName)
  }
}
