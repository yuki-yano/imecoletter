/* @flow */
import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

export default {
  [ACTION.SET_IMAGE_MODAL]: ({ commit }, { image }) => {
    commit(MUTATION.SET_IMAGE_MODAL, image)
  }
}
