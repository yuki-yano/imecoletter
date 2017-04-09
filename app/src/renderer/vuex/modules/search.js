/* @flow */
import type { SearchState } from 'types/mutation'
import type { Label } from 'types/imageTweet'

import * as MUTATION from 'vuex/mutation-types'

const state: SearchState = {
  labels: []
}

const mutations = {
  [MUTATION.ADD_SEARCH_TAG] (state: SearchState, label: Label) {
    if (state.labels.map(label => label.name).indexOf(label.name) === -1) {
      state.labels.push(label)
    }
  },
  [MUTATION.REMOVE_SEARCH_TAG] (state: SearchState, labelName: string) {
    state.labels = state.labels.filter((label) => {
      return label.name !== labelName
    })
  }
}

export default {
  state,
  mutations
}
