<template>
  <div class="collapse" id="collapseExample">
    <div class="d-flex justify-content-between row">
      <p class="col-12 col-sm-5">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
        <span>自動更新の間隔</span>
      </p>
      <div class="col-12 col-sm-7">
        <div class="btn-group" data-toggle="buttons">
          <p v-for="item in autoReloadList" class="btn btn-primary" :class="{active : item === autoReload}" @click="setAutoReload(item)">
            <label>
              <input type="radio" name="reload" :value="item"> {{ item }} 秒
            </label>
          </p>
        </div>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-between row">
      <p class="col-12 col-sm-5">
        <i class="fa fa-picture-o" aria-hidden="true"></i>
        <span>最大保存件数</span>
      </p>
      <div class="col-12 col-sm-7">
        <div class="btn-group" data-toggle="buttons">
          <p v-for="item in imageCountList" class="btn btn-primary" :class="{active : item === imageCount}" @click="setImageCount(item)">
            <label>
              <input type="radio" name="reload" :value="item"> {{ item }} 枚
            </label>
          </p>
        </div>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-between row">
      <p class="col-12 col-sm-5">
        <i class="fa fa-sign-out text-right"></i>
        <span class="text-right">ログアウト</span>
      </p>
      <div class="col-12 col-sm-7">
        <p class="btn-group btn-group-warning">
          <a class="text-center btn btn-warning" @click="logout">
            <span class="text-right">ログアウトする</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* @flow */
import electron from 'electron'
import Config from 'electron-config'
import Router from 'vue-router'

import * as ACTION from 'vuex/action-types'
import * as ROUTE from 'constants/route'

export default {
  name: 'setting-menu',
  data () {
    return {
      autoReload: 90,
      autoReloadList: [90, 180, 300, 420, 600],
      imageCount: 1000,
      imageCountList: [100, 300, 500, 700, 1000]
    }
  },
  methods: {
    setAutoReload (time: number) {
      this.autoReload = time
      this.$store.dispatch(ACTION.SET_AUTO_RELOAD, { time })
    },
    setImageCount (count: number) {
      this.imageCount = count
      this.$store.dispatch(ACTION.SET_IMAGE_COUNT, { count })
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
  }
}
</script>

<style lang="scss" scoped>
#collapseExample {
  background-color: #0d80c0;
  padding: 1rem 2rem;
  color: #fff;
}

a {
  color: #fff;
}

hr {
  border-top: 1px solid #0a7bba;
}

input {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

label {
  margin: 0;
}

.btn-group {
  border: 2px solid #3ba3e0;
  border-radius: 10rem;
  width: 100%;

  &.btn-group-warning {
    border: 2px solid #ed6e94;
    background-color: #ed6e94;
  }
}

.fa {
  margin-right: 0.5rem;
}

.u-warning {
  color: red;
  font-size: 0.8rem;
}

.col-12 {
  padding: 0;
}

.btn {
  width: 100%;
  padding: 0.2rem 0.4rem;
  border-radius: 10rem;
  font-size: 0.8rem;
  border: none;

  &:hover {
    opacity: 0.5;
  }

  &.btn-primary {
    background: linear-gradient(#5cb2ec, #2c96de);

    &.active {
      background: linear-gradient(#128bd9, #45a9ee);
    }
  }

  &.btn-warning {
    background: linear-gradient(#fe8181, #f04141);
    width: 100%;
  }
}
</style>
