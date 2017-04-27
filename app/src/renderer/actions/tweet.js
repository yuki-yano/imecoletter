/* @flow */
import _ from 'lodash'
import Twitter from 'twit'
import type Twit from 'twit'
import axios from 'axios'
import AWS from 'aws-sdk'
import Config from 'electron-config'

import type { ImageTweet, Image, ImageUrl, Label } from 'types/imageTweet'
import type { User } from 'types/user'

import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

import store from 'vuex/store'

import appEnv from '../../../../env'

function createClient (): Twit {
  const config = new Config()
  const accessToken: string = config.get('twitter_access_token')
  const accessSecret: string = config.get('twitter_access_secret')
  return new Twitter({
    consumer_key: appEnv.TWITTER_KEY,
    consumer_secret: appEnv.TWITTER_SECRET,
    access_token: accessToken,
    access_token_secret: accessSecret
  })
}

function baseUrlToImageUrl (url: string): ImageUrl {
  return {
    base: url,
    small: `${url}:small`,
    medium: `${url}:medium`,
    large: `${url}:large`,
    original: `${url}:orig`
  }
}

async function getImageTweetId (): Promise<Array<string>> {
  const client = createClient()

  try {
    let tweets = await client.get('statuses/home_timeline', { count: 200 })

    // 複数枚画像ツイート
    tweets = tweets.data.filter((t) => { return 'extended_entities' in t })
                        .filter((t) => { return 'media' in t.extended_entities })
                        .filter((t) => { return t.user.protected === false })
                        .filter((t) => { return t.extended_entities.media[0].expanded_url.match(/photo/) })

    return tweets.map((t) => { return t.id_str })
  } catch (e) {
    return []
  }
}

async function getUserDataFromTweetID (tweetID: string): Promise<Object> {
  const client = createClient()
  const tweet = await client.get(`statuses/show/${tweetID}`, {})
  return tweet.data.user
}

async function getImageTweetFromID (id: string): Promise<ImageTweet | any> {
  const client = createClient()

  try {
    const data = await getUserDataFromTweetID(id)
    if (data === undefined) {
      throw new Error('ユーザの情報が取得できませんでした')
    }
    const user: User = {
      id: data.id,
      name: data.name,
      screen_name: data.screen_name,
      iconUrl: data.profile_image_url
    }

    const tweet = await client.get(`statuses/show/${id}`, {})
    if ('errors' in tweet.data) {
      throw new Error(tweet.data.errors[0].message)
    }

    const images: Array<Image> = tweet.data.extended_entities.media.map(media => {
      const image: Image = {
        url: baseUrlToImageUrl(media.media_url),
        labels: [],
        rand: Math.random()
      }
      return image
    })

    let fav = 0
    if ('retweeted_status' in tweet.data) {
      const originalUser = {
        id: tweet.data.retweeted_status.user.id,
        name: tweet.data.retweeted_status.user.name,
        screen_name: tweet.data.retweeted_status.user.screen_name,
        iconUrl: tweet.data.retweeted_status.user.profile_image_url
      }
      fav = tweet.data.retweeted_status.favorite_count

      const imageTweet: ImageTweet = {
        id,
        user: originalUser,
        text: tweet.data.text,
        date: tweet.data.created_at,
        images,
        following: true,
        retweet: tweet.data.retweet_count,
        retweet_user: user,
        retweeted: tweet.data.retweeted,
        fav,
        faved: tweet.data.favorited,
        rand: Math.random()
      }
      return imageTweet
    } else {
      fav = tweet.data.favorite_count
      const imageTweet: ImageTweet = {
        id,
        user,
        text: tweet.data.text,
        date: tweet.data.created_at,
        images,
        following: true,
        retweet: tweet.data.retweet_count,
        retweet_user: null,
        retweeted: tweet.data.retweeted,
        fav,
        faved: tweet.data.favorited,
        rand: Math.random()
      }
      return imageTweet
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

async function imageToLabel (url: string): Promise<Array<Label>> {
  // for (const tweet: ImageTweet of store.state.tweets.imageTweets) {
  //   for (const image: Image of tweet.images) {
  //     if (image.url.base === url) {
  //       return image.labels
  //     }
  //   }
  // }

  const response = await axios({ method: 'get', url: url, responseType: 'arraybuffer' })

  const rekognition = new AWS.Rekognition({
    accessKeyId: appEnv.AWS_ACCESS_KEY_ID, secretAccessKey: appEnv.AWS_SECRET_ACCESS_KEY, region: 'us-east-1'
  })
  var params = {
    Image: {
      Bytes: response.data
    }
  }

  const dataPromise:Promise<Object> = rekognition.detectLabels(params).promise()
  return dataPromise.then((data) => {
    const labels: Array<Label> = data.Labels.map(l => {
      const label: Label = {
        name: l.Name,
        score: l.Confidence,
        rand: Math.random()
      }
      return label
    })
    return labels
  })
}

export default {
  [ACTION.SET_IMAGE_TWEETS]: async function ({ commit }: { commit: Function }) {
    const imageTweetIds: Array<string> = await getImageTweetId()
    const imageTweetsPromise: Array<Promise<ImageTweet>> = imageTweetIds.map((id: string) => getImageTweetFromID(id))

    let imageTweets: Array<ImageTweet> = await Promise.all(imageTweetsPromise)
    imageTweets = _.unionWith(imageTweets, store.state.tweets.imageTweets, (a, b) => a.id === b.id)

    // 情報を取得できなかったツイートを削除
    imageTweets = imageTweets.filter((tweet) => ('id' in tweet))

    // 画像にラベルを付与
    await Promise.all(imageTweets.map(async (imageTweet: ImageTweet) => {
      await Promise.all(imageTweet.images.map(async (image: Image) => {
        if (image.labels.length === 0) {
          try {
            image.labels = await imageToLabel(image.url.base)
          } catch (e) {
            console.error(e)
            image.labels = []
          }
        }
      }))
    }))

    // ラベルが存在しないツイートを削除
    imageTweets = imageTweets.filter((tweet) => {
      const images: Array<Image> = tweet.images.filter((image) => image.labels !== [])
      return images !== []
    })
    imageTweets = _.take(imageTweets, store.state.settings.imageCount)

    commit(MUTATION.SET_IMAGE_TWEETS, { imageTweets })

    commit(MUTATION.START_DISPLAY_REFRESH)
    setTimeout(() => {
      commit(MUTATION.END_DISPLAY_REFRESH)
    }, 2500)
  },
  [ACTION.START_LOAD_IMAGE_TWEETS]: async function ({ commit }: { commit: Function }) {
    commit(MUTATION.START_LOAD_IMAGE_TWEETS)
  },
  [ACTION.RETWEET]: async function ({ commit }: Function, { id }: { id: string }) {
    const client: Twit = createClient()
    await client.post('statuses/retweet/:id', { id })
    commit(MUTATION.RETWEET, id)
  },
  [ACTION.FAV]: async function ({ commit }: { commit: Function }, { id }: { id: string }) {
    const client: Twit = createClient()
    await client.post('favorites/create', { id })
    commit(MUTATION.FAV, id)
  }
}
