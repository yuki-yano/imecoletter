<template>
  <div v-sticky="stickyConfig" id="header">
    <div class="header d-flex justify-content-between">
      <button type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <i class="fa fa-cog" aria-hidden="true"></i>
      </button>
      <h2>
        <a href="#">
          <img src="./Login/assets/logo.png">
        </a>
      </h2>
      <button @click="reload" :disabled="loading" data-toggle="modal" data-target="#reload">
        <i class="fa fa-refresh" :class="{'fa-spin' : $store.state.tweets.loading}"></i>
      </button>
      <div class="reload" v-if="refreshing">
        <div class="reload-contents text-center">
          <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw text-center"></i>
          <p class="text-center">画面更新中</p>
        </div>
      </div>
    </div>
    <setting-menu></setting-menu>
  </div>
</template>

<script>
/* @flow */
import VueSticky from 'vue-sticky'

import * as ACTION from 'vuex/action-types'

import SettingMenu from './SettingMenu'

export default {
  name: 'header-view',
  components: {
    SettingMenu
  },
  data () {
    return {
      stickyConfig: {
        zIndex: 100,
        stickyTop: 0
      },
      autoReloadTimer: null
    }
  },
  computed: {
    loading () {
      return this.$store.state.tweets.loading
    },
    refreshing () {
      return this.$store.state.tweets.refreshing
    },
    autoReload () {
      return this.$store.state.settings.autoReload * 1000
    }
  },
  methods: {
    async reload () {
      this.$store.dispatch(ACTION.SET_IMAGE_TWEETS)
      this.$store.dispatch(ACTION.START_LOAD_IMAGE_TWEETS)
    }
  },
  watch: {
    autoReload: function setAutoReload () {
      clearInterval(this.autoReloadTimer)
      this.autoReloadTimer = setInterval(() => {
        this.reload()
      }, this.autoReload)
    }
  },
  directives: {
    'sticky': VueSticky
  },
  mounted () {
    this.reload()
    this.autoReloadTimer = setInterval(() => {
      this.reload()
    }, this.autoReload)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.2rem;

  img {
    width: 142px;
    height: auto;

    &:hover {
      opacity: 0.8;
    }
  }
}

i {
  line-height: 28px;
  font-size: 1.2rem;
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
  top: 40%;
  left: 30%;
  right: 30%;
  color: #fff;
  font-size: 1.2rem;
}

.reload-contents i {
  font-size: 4rem;
  margin-bottom: 2rem;
}
</style>
