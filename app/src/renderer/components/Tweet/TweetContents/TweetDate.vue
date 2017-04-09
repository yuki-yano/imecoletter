<template>
  <div>
    <h4> {{ formatDate }} </h4>
  </div>
</template>

<script>
/* @flow */
import moment from 'moment'

export default {
  name: 'tweet-date',
  props: ['tweet'],
  computed: {
    formatDate () {
      moment.locale('ja')
      return moment(this.tweet.date).fromNow()
    }
  }
}
</script>

<style scoped>
h4 {
  font-size: 0.6rem;
  text-align: left;
  margin-bottom: 0.4rem;
  color: #667883;
}
</style>
