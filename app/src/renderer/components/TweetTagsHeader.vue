<template>
  <div class="pd">
    <div class="card-tags">
      <i class="fa fa-tag" aria-hidden="true"></i>
      <h2>検索タグ</h2>
    </div>
    <tweet-tags></tweet-tags>
  </div>
</template>

<script>
/* @flow */
import TweetTags from './TweetTags'

export default {
  name: 'tweet-tags-header',
  components: {
    TweetTags
  }
}
</script>

<style scoped>
h2 {
  font-size: 1rem;
  font-weight: 700;
  margin-right: 0.5rem;
  color: #000;
}

i {
  color: #f6699e;
  margin-right: 6px;
  font-size: 1.4rem;
}

.card-tags {
  display: flex;
  align-items: center;
  color: #ff80b0;
  margin-bottom: 0.4rem;
}

.pd {
  padding: 1.4rem 1.4rem 0.8rem 1.4rem;
}
</style>
