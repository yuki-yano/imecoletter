<template>
  <ul class="c-card-media">
    <li v-for="(image, index) in images" :key="tagKey(image)" :image="image" :index="index">
      <a href="#" data-toggle="modal" data-target="#imgmodal" @click="setImageToModal(image)">
        <img :src="image.url.base" :class="imageClass(index)">
      </a>
    </li>
  </ul>
</template>

<script>
/* @flow */
import * as ACTION from 'vuex/action-types'

import type { Image } from 'types/imageTweet'

export default {
  name: 'tweet-image',
  props: ['images'],
  methods: {
    imageClass (index: number): string {
      return `image-${index}-${this.images.length}`
    },
    tagKey (image: Image): string {
      return `home-${image.url.base}${image.rand}`
    },
    setImageToModal (image: Image) {
      this.$store.dispatch(ACTION.SET_IMAGE_MODAL, { image })
    }
  }
}
</script>

<style scoped>
.c-card-media {
  border: 1px solid #e0e8ee;
  border-radius: 4px 4px 0 0;
  height: auto;
}

a {
  display: inline;
  text-decoration: none;

  &:hover {
    transition-duration: 0.3s;
    opacity: 0.7;
  }
}

li {
  display: inline;
}

.image-0-1 {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.image-0-2,
.image-1-2 {
  width: 50%;
  height: 240px;
  object-fit: cover;
}

.image-0-2 {
  border-radius: 4px 0 0 0;
}

.image-1-2 {
  border-radius: 0 4px 0 0;
}

.image-0-3 {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.image-1-3,
.image-2-3 {
  width: 50%;
  height: 120px;
  object-fit: cover;
}

.image-0-4,
.image-1-4,
.image-2-4,
.image-3-4 {
  width: 50%;
  height: 120px;
  object-fit: cover;
}

.image-0-4 {
  border-radius: 4px 0 0 0;
}

.image-1-4 {
  border-radius: 0 4px 0 0;
}

.mg0 {
  position: absolute;
  left: 9999;
  top: 9999;
}
</style>
