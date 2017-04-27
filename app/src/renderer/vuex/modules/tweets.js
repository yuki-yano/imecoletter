/* @flow */
import Config from 'electron-config'

import type { TweetsState } from 'types/mutation'
import type { ImageTweet } from 'types/imageTweet'

import * as MUTATION from 'vuex/mutation-types'

const config = new Config()
let imageTweets: Array<ImageTweet> = config.get('image_tweets')

if (imageTweets === undefined) {
  imageTweets = []
}

const state: TweetsState = {
  imageTweets: imageTweets,
  loading: false,
  refreshing: true
}

const mutations = {
  [MUTATION.SET_IMAGE_TWEETS] (state: TweetsState, { imageTweets }: { imageTweets: Array<ImageTweet> }) {
    state.imageTweets = imageTweets
    config.set('image_tweets', imageTweets)
    state.loading = false
  },
  [MUTATION.START_LOAD_IMAGE_TWEETS] (state: TweetsState) {
    state.loading = true
  },
  [MUTATION.START_DISPLAY_REFRESH] (state: TweetsState) {
    state.refreshing = true
  },
  [MUTATION.END_DISPLAY_REFRESH] (state: TweetsState) {
    state.refreshing = false
  },
  [MUTATION.RETWEET] (state: TweetsState, id: string) {
    state.imageTweets.forEach((tweet) => {
      if (tweet.id === id) {
        tweet.retweeted = true
      }
    })
  },
  [MUTATION.FAV] (state: TweetsState, id: string) {
    state.imageTweets.forEach((tweet) => {
      if (tweet.id === id) {
        tweet.faved = true
      }
    })
  }
}

export default {
  state,
  mutations
}
