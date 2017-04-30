<template>
  <div class="c-card-text">
    <tweet-header @toggle-tweet-expansion="toggleTweetExpansion" :tweet="tweet"></tweet-header>
    <tweet-activity :tweet="tweet"></tweet-activity>
    <transition name="fade">
      <tweet-detail v-if="expansionFlag" :tweet="tweet"></tweet-detail>
    </transition>
    <tweet-attribute :tweet="tweet"></tweet-attribute>
  </div>
</template>

<script>
/* @flow */
import TweetHeader from './TweetContents/TweetHeader.vue'
import TweetActivity from './TweetContents/TweetActivity.vue'
import TweetDetail from './TweetContents/TweetDetail.vue'
import TweetAttribute from './TweetContents/TweetAttribute.vue'

export default {
  name: 'tweet-content-view',
  props: ['tweet'],
  components: {
    TweetHeader,
    TweetActivity,
    TweetDetail,
    TweetAttribute
  },
  data () {
    return {
      expansionFlag: false
    }
  },
  methods: {
    toggleTweetExpansion () {
      this.expansionFlag = !this.expansionFlag
    }
  }
}
</script>

<style scoped>
.c-card-text {
  position: relative;
  padding: 8px;
  background-color: #fff;
  border: 1px solid ##e0e8ee;
  border-radius: 0 0 4px 4px;
  border: 1px solid #e0e8ee;
  border-top: none;
  margin-left: 0;
}
</style>
