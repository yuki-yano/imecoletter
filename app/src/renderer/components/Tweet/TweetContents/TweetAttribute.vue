<template>
  <div class="card-tags">
    <i class="fa fa-tag" aria-hidden="true"></i>
    <div class="tag-list">
      <div v-for="(image, index) in tweet.images" :key="image.rand" :image="image" :index="index" class="d-flex flex-wrap">
        <p @click="addSearchTag(label)" class="fc-pink" v-for="label in topLabels[index]" :key="tagKey(label, index)" :label="label">
          {{ label.name }}
        </p>
        <button v-if="!isAllLabel[index] && image.labels.length > 5" @click="displayAllLabel(index)">･･･</button>
        <p @click="addSearchTag(label)" v-if="isAllLabel[index]" class="fc-pink" v-for="label in restLabels[index]" :key="tagKey(label, index)" :label="label">
          {{ label.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* @flow */
import Vue from 'vue'
import _ from 'lodash'

import type { Label } from 'types/imageTweet'

import * as ACTION from 'vuex/action-types'

export default {
  name: 'tweet-attribute',
  props: ['tweet'],
  data () {
    return {
      isAllLabel: []
    }
  },
  computed: {
    topLabels (): Array<Label> {
      return this.tweet.images.map((image) => {
        return _.take(image.labels, 5)
      })
    },
    restLabels (): Array<Label> {
      return this.tweet.images.map((image) => {
        return _.takeRight(image.labels, image.labels.length - 5)
      })
    }
  },
  methods: {
    displayAllLabel (index: number) {
      Vue.set(this.isAllLabel, index, true)
    },
    addSearchTag (label: Label) {
      this.$store.dispatch(ACTION.ADD_SEARCH_TAG, { label })
    },
    tagKey (label: Label, index: number): string {
      return `activity-${label.name}${label.rand}${index}`
    }
  },
  mounted () {
    let index: number = 0
    this.tweet.images.map((_image) => {
      this.isAllLabel[index] = false
      index += 1
    })
  }
}
</script>

<style lang="scss" scoped>
.card-tags {
  display: flex;
  align-items: flex-start;
  color: #ff80b0;

  span {
    color: #1b2022;
    font-size: 1.6rem;
  }
}

.tag-list {
  width: 100%;

  div {
    width: 100%;
    padding-bottom: 0.25rem;
  }

  div + div {
    border-top: 1px solid #ddd;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
}

i {
  margin-top: 0.2rem;
  margin-right: 6px;
  font-size: 1.2rem;
}

p {
  font-size: 0.7rem;
  line-height: 0.9rem;
  padding: 0.2rem 0.6rem 0.2rem 0.6rem;
  display: inline-block;
  text-decoration: none;
  color: #fff !important;
  margin-right: 0.5rem;
  background-color: #ff80b0;
  border-radius: 1rem;
  margin-bottom: 0.2rem;

  &:hover {
    text-decoration: none !important;
    transition-duration: 0.3s;
    opacity: 0.7;
  }
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  border-radius: 4px;
  border: 2px solid #fff;
  font-size: 0.4rem;

  &:hover {
    transition-duration: 0.7s;
    background-color: #e0e8ee;
  }
}
</style>
