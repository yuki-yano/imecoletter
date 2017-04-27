<template>
  <div>
    <p v-for="label in labels" @click="removeTag(label.name)" :key="tagKey(label)" :label="label">
      {{ label.name }}<i class="fa fa-times" aria-hidden="true"></i>
    </p>
  </div>
</template>

<script>
/* @flow */
import * as ACTION from 'vuex/action-types'

export default {
  computed: {
    labels (): Array<Label> {
      return this.$store.getters.labels
    }
  },
  methods: {
    tagKey (label: Label): string {
      return `tags-${label.name}${label.rand}`
    },
    removeTag (labelName: string) {
      this.$store.dispatch(ACTION.REMOVE_SEARCH_TAG, { labelName })
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  color: #fff !important;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

p {
  text-align: justify;
  font-size: 0.8rem;
  line-height: 1rem;
  padding: 0.3rem 0.8rem;
  display: inline-block;
  text-decoration: none;
  color: #fff !important;
  margin-right: 0.5rem;
  background-color: #ff94bc;
  border-radius: 1rem;
  margin-bottom: 0.2rem;

  &:hover {
    text-decoration: none !important;
    transition-duration: 0.3s;
    opacity: 0.7;
  }
}
</style>
