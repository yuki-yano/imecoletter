<template>
  <div id="home" class="home">
    <header-view></header-view>
    <img-modal></img-modal>
    <tweet-tags-header></tweet-tags-header>
    <div class="tweet-box">
      <div class="card-columns">
        <tweet v-if="filters.length === 0" v-for="(tweet, index) in imageTweets" :tweet="tweet" :key="tagKey(tweet, index)"></tweet>
        <tweet v-if="filters.length > 0" v-for="(tweet, index) in filteredTweets" :tweet="tweet" :key="tagKey(tweet, index)"></tweet>
      </div>
    </div>
  </div>
</template>

<script>
/* @flow */
import _ from 'lodash'

import type { ImageTweet, Label } from 'types/imageTweet'

import HeaderView from './Header'
import TweetTagsHeader from './TweetTagsHeader'
import Tweet from './Tweet'
import ImgModal from './ImgModal'

export default {
  name: 'home-page',
  components: {
    HeaderView,
    TweetTagsHeader,
    Tweet,
    ImgModal
  },
  computed: {
    imageTweets (): Array<ImageTweet> {
      return this.$store.getters.imageTweets
    },
    filters (): Array<Label> {
      return this.$store.getters.labels
    },
    filteredTweets (): Array<ImageTweet> {
      const result: Array<ImageTweet> = []

      this.imageTweets.map((tweet) => {
        tweet.images.map((image) => {
          const labelNames = []
          image.labels.map((label) => {
            labelNames.push(label.name)
          })
          if (_.intersection(labelNames, this.filters.map(label => label.name)).length > 0) {
            result.push(tweet)
          }
        })
      })
      return result
    }
  },
  methods: {
    tagKey (tweet: ImageTweet, index: number): string {
      return `home-${tweet.id}${tweet.date}${tweet.rand}${index}`
    }
  }
}
</script>

<style lang="scss" scopde>
.home {
  width: 100%;
  text-align: center;
}

.tweet-box {
  padding: 1rem;
}

.card-columns {
  @media screen and (max-width: 575px) {
    column-count: 1;
  }

  @media screen and (min-width: 575px) {
    column-count: 2;
  }

  @media screen and (min-width: 767px) {
    column-count: 3;
  }

  @media screen and (min-width: 991px) {
    column-count: 4;
  }

  @media screen and (min-width: 1199px) {
    column-count: 5;
  }

  @media screen and (min-width: 1899px) {
    column-count: 6;
  }
}
</style>
