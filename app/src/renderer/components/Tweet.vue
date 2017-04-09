<template>
  <div>
    <div class="card">
      <tweet-image :images="tweet.images"></tweet-image>
      <tweet-contents :tweet="tweet"></tweet-contents>
    </div>
  </div>
</template>

<script>
/* @flow */
import TweetImage from './Tweet/TweetImage'
import TweetContents from './Tweet/TweetContents'

export default {
  props: ['tweet'],
  components: {
    TweetImage,
    TweetContents
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: none;
}
</style>
