/* @flow */
import type { ModalState } from 'types/mutation'
import type { Image } from 'types/imageTweet'

import * as MUTATION from 'vuex/mutation-types'

const state: ModalState = {
  image: null
}

const mutations = {
  [MUTATION.SET_IMAGE_MODAL] (state: ModalState, image: Image) {
    state.image = image
  }
}

export default {
  state,
  mutations
}
