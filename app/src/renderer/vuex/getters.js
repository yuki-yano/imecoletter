/* @flow */
import type Twit from 'twit'

import type { ImageTweet, Label } from 'types/imageTweet'

export const client = (state: Object): Twit => state.auth.client

export const imageTweets = (state: Object): Array<ImageTweet> =>
  state.tweets.imageTweets
export const labels = (state: Object): Array<Label> => state.search.labels

export const modal = (state: Object): Image => state.modal.image
