<template>
  <p>{{ tweet.text }}</p>
</template>

<script>
/* @flow */
export default {
  name: 'tweet-text',
  props: ['tweet']
}
</script>

<style scoped>
p {
  font-size: 0.7rem;
  line-height: 0.8rem;
  margin-bottom: 0.3rem;
  text-align: justify;
  color: #37484e;
}
</style>
