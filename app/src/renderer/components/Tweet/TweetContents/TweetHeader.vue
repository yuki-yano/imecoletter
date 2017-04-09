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
      <a :href="twitterLink" target="_blank">
        <h3> @{{ tweet.user.screen_name }} </h3>
      </a>
    </li>
    <li>
      <button type="button" name="button" class="follow" @click="toggleTweetExpansion">
        <i class="fa" :class="{ 'fa-chevron-down': isDown, 'fa-chevron-up': !isDown }" aria-hidden="true"></i>
      </button>
    </li>
  </ul>
</template>

<script>
/* @flow */
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
    toggleTweetExpansion () {
      this.$emit('toggle-tweet-expansion')
      this.isDown = !this.isDown
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.2rem;
}

h3 {
  font-size: 0.8rem;
  font-weight: 700;
  color: #667883;
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
  height: 24px;
  width: 24px;
  color: #e0e0e0;
  border-radius: 4px;
  font-size: 1.2rem;
}

button:hover {
  transition-duration: 0.7s;
  color: #b9b9b9;
}

button:checked {
  transition-duration: 0.7s;
  color: #fff;
}

button:disabled {
  color: #fff;
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
}

a:hover {
  text-decoration: underline;
}

a img:hover {
  transition-duration: 0.3s;
  opacity: 0.7;
}

.c-card-header {
  margin-bottom: 0.5rem;
}

.c-card-header li:last-child {
  margin-left: auto;
  margin-right: 0.4px;
}
</style>
