<template>
  <div>
    <tweet-text :tweet="tweet"></tweet-text>
    <tweet-date :tweet="tweet"></tweet-date>
  </div>
</template>

<script>
/* @flow */
import TweetText from './TweetText.vue'
import TweetDate from './TweetDate.vue'

export default {
  name: 'tweet-detail',
  props: ['tweet'],
  components: {
    TweetText,
    TweetDate
  }
}
</script>
