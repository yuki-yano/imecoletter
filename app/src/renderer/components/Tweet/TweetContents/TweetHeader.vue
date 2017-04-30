<template>
  <ul class="c-card-header">
    <li>
      <a :href="twitterLink" target="_blank">
        <img :src="tweet.user.iconUrl" class="user-icon32">
      </a>
    </li>
    <li>
      <a :href="twitterLink" target="_blank">
        <h2> {{ tweet.user.name }} </h2>
      </a>
      <p class="d-flex align-items-end">
        <a :href="twitterLink" target="_blank">
          <h3> @{{ tweet.user.screen_name }} </h3>
        </a>
        <button type="button" name="button" @click="follow(tweet.user.id)" >
          <i class="fa fa-twitter-square" :class="{ 'following': tweet.user.following, 'unfollow': !tweet.user.following }" aria-hidden="true"></i>
        </button>
      </p>
    </li>
    <li>
      <button type="button" name="button" @click="toggleTweetExpansion">
        <i class="fa" :class="{ 'fa-chevron-down': isDown, 'fa-chevron-up': !isDown }" aria-hidden="true"></i>
      </button>
    </li>
  </ul>
</template>

<script>
/* @flow */
import * as ACTION from 'vuex/action-types'

export default {
  name: 'tweet-header',
  props: ['tweet'],
  data () {
    return {
      isDown: true
    }
  },
  computed: {
    twitterLink () {
      return `https://twitter.com/${this.tweet.user.screen_name}`
    }
  },
  methods: {
    follow (userID: number) {
      this.$store.dispatch(ACTION.FOLLOW, { userID })
    },
    toggleTweetExpansion () {
      this.$emit('toggle-tweet-expansion')
      this.isDown = !this.isDown
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 0.8rem;
  font-weight: 700;
  color: #667883;
  margin-right: 0.2rem;
}

ul {
  display: flex;
  margin-bottom: 0.2rem;
  text-align: left;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  height: 18px;
  width: 18px;
  color: #8c8c8c;
  border-radius: 4px;
  font-size: 1rem;

  &:hover {
    transition-duration: 0.7s;
    color: #b9b9b9;
  }

  &:checked {
    transition-duration: 0.7s;
    color: #fff;
  }

  &:disabled {
    color: #fff;
  }
}

img {
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 0.4rem;
  margin-right: 0.5rem;
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  img:hover {
    transition-duration: 0.3s;
    opacity: 0.7;
  }
}

.c-card-header {
  margin-bottom: 0.5rem;
}

.c-card-header li:last-child {
  margin-left: auto;
  margin-right: 0.4px;
}

.following {
  color: #1DA1F2;
}

.unfollow {
  color: #e0e8ee;
}

.fa-twitter-square {
  margin-top: -0.4rem;
}
</style>
