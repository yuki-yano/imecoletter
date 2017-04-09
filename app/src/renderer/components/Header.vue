<template>
  <div v-sticky="stickyConfig" id="header" class="header d-flex justify-content-between">
    <button @click="reload" data-toggle="modal" data-target="#reload">
      <i class="fa fa-refresh"></i>
    </button>
    <h2>
      <a href="#">
        <img src="./Login/assets/logo.png">
      </a>
    </h2>
    <button @click="logout">
      <i class="fa fa-sign-out"></i>
    </button>
    <div class="reload" v-if="isLoading || $store.state.tweets.loading">
      <div class="reload-contents">
        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        <p>読み込み中･･･</p>
      </div>
    </div>
  </div>
</template>

<script>
/* @flow */
import electron from 'electron'
import Config from 'electron-config'
import Router from 'vue-router'
import VueSticky from 'vue-sticky'

import * as ACTION from 'vuex/action-types'
import * as ROUTE from 'constants/route'

export default {
  name: 'header-view',
  data: function () {
    return {
      isLoading: false,
      stickyConfig: {
        zIndex: 100,
        stickyTop: 0
      }
    }
  },
  computed: {
    loadingSpin () {
      return {
        'fa-spin': this.isLoading || this.$store.state.tweets.loading
      }
    }
  },
  methods: {
    async reload () {
      this.$store.dispatch(ACTION.SET_IMAGE_TWEETS)
      this.$store.dispatch(ACTION.START_LOAD_IMAGE_TWEETS)
      this.isLoading = true
      this.isLoading = false
    },
    logout () {
      const router = new Router()
      this.$store.dispatch(ACTION.LOGOUT)

      const remote = electron.remote
      const config = new Config()
      remote.getCurrentWebContents().session.clearStorageData({ storages: ['cookies'] }, () => {})
      config.delete('twitter_access_token')
      config.delete('twitter_access_secret')
      router.push(ROUTE.LOGIN)
    }
  },
  directives: {
    'sticky': VueSticky
  },
  mounted () {
    this.reload()
    setInterval(() => {
      this.reload()
    }, 90000)
  }
}
</script>

<style scoped>
h2 {
  font-size: 1.2rem;
}

i {
  line-height: 28px;
  font-size: 1.2rem;
}

h2 img {
  width: 142px;
  height: auto;
}

.header {
  padding: 0.5rem 1rem;
  background-color: #32adf4;
  border-bottom: 1px solid #0d80c0;
  align-items: baseline;
}

button {
  color: #fff;
  text-align: center;
  width: 2rem;
  height: 2rem;
}

i:hover {
  opacity: 0.8;
}

.reload {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
}

.reload-contents {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  max-width: 320px;
  height: 0;
  color: #fff;
  font-size: 1.2rem;
}

.reload-contents i {
  font-size: 4rem;
  margin-bottom: 2rem;
}
</style>
