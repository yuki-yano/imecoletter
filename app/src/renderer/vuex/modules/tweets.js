/* @flow */
import Config from 'electron-config'
import _ from 'lodash'

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
  [MUTATION.SET_IMAGE_TWEETS] (state: TweetsState, imageTweets: Array<ImageTweet>) {
    for (const tweet of imageTweets) {
      for (const image of tweet.images) {
        image.downloaded = true
      }
    }
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
  [MUTATION.RETWEET] (state: TweetsState, tweetID: string) {
    state.imageTweets.forEach((tweet) => {
      if (tweet.id === tweetID) {
        tweet.retweeted = true
        tweet.retweet += 1
      }
    })
  },
  [MUTATION.FAV] (state: TweetsState, tweetID: string) {
    state.imageTweets.forEach((tweet) => {
      if (tweet.id === tweetID) {
        tweet.faved = true
        tweet.fav += 1
      }
    })
  },
  [MUTATION.FOLLOW] (state: TweetsState, userID: string) {
    _.filter(state.imageTweets, (tweet) => {
      return tweet.user.id === userID
    }).map((tweet: ImageTweet) => {
      tweet.user.following = true
    })
  }
}

export default {
  state,
  mutations
}
