<template>
  <ul>
    <li>
      <button @click="retweet" :class="{retweeted : tweet.retweeted}" type="button" name="button" class="rt"><i class="fa fa-retweet" aria-hidden="true"></i></button>
    </li>
    <li>
      <p>{{ tweet.retweet }}</p>
    </li>
    <li>
      <button @click="fav" :class="{faved : tweet.faved}" type="button" name="button" class="fav"><i class="fa fa-heart" aria-hidden="true"></i></button>
    </li>
    <li>
      <p>{{ tweet.fav }}</p>
    </li>
    <li v-if="tweet.retweet_user">
      <p class="fc-gray">RT from</p>
    </li>
    <li v-if="tweet.retweet_user">
      <a :href="retweetUserLink" target="_blank">
        <img :src="retweetedUserIconUrl">
      </a>
    </li>
  </ul>
</template>

<script>
/* @flow */
import * as ACTION from 'vuex/action-types'

export default {
  name: 'tweet-activity',
  props: ['tweet'],
  computed: {
    retweetedUserIconUrl () {
      if (this.tweet.retweet_user) {
        return this.tweet.retweet_user.iconUrl
      } else {
        return ''
      }
    },
    retweetUserLink () {
      return `https://twitter.com/${this.tweet.retweet_user.screen_name}`
    }
  },
  methods: {
    retweet () {
      this.tweet.retweet += 1
      this.$store.dispatch(ACTION.RETWEET, { id: this.tweet.id })
    },
    fav () {
      this.tweet.fav += 1
      this.$store.dispatch(ACTION.FAV, { id: this.tweet.id })
    }
  }
}
</script>

<style lang="scss" scoped>
p,
button {
  margin-right: 2px;
}

p {
  font-size: 0.7rem;
  line-height: 0.7rem;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 4px;
  border: 2px solid #fff;
  font-size: 1rem;
}

ul {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

li:nth-child(4) {
  margin-right: auto;
}

img {
  object-fit: cover;
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.2rem;
  border-radius: 0.2rem;
}

a img:hover {
  opacity: 0.7;
}

.fc-gray {
  color: #79958e;
  font-weight: 500;
}

.rt,
.fav {
  transition-property: background-color, color;
  transition-duration: 0.7s;
  color: #e0e8ee;
  font-size: 0.8rem;

  &:hover {
    transition-property: background-color, color;
    transition-duration: 0.7s;
    background-color: #e0e8ee;
    color: #fff;
  }
}

.retweeted {
  color: #68883e;
  background-color: #fff;
}

.faved {
  color: #cf4558;
  background-color: #fff;
}
</style>
