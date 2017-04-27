<template>
  <div id="login">
    <h2>TLのイラストツイートを<br>
      表示・保存するだけ</h2>
    <h1>
      <img src="./Login/assets/title.png">
    </h1>
    <button @click="authDialog" class="md-raised md-primary">ログイン</button>
  </div>
</template>

<script>
/* @flow */
import { ipcRenderer } from 'electron'
import Router from 'vue-router'
import Config from 'electron-config'
import swal from 'sweetalert'
import * as ACTION from 'vuex/action-types'
import * as ROUTE from 'constants/route'

export default {
  name: 'login-page',
  methods: {
    authDialog () {
      ipcRenderer.send('twitter-login')
      ipcRenderer.on('twitter-login-success', (_ev, accessToken, accessSecret) => {
        swal({
          title: 'ログインに成功しました',
          type: 'success'
        })

        const router = new Router()
        router.push(ROUTE.HOME)
        this.$store.dispatch(ACTION.LOGIN, {
          accessToken: accessToken,
          accessSecret: accessSecret
        })
      })
      ipcRenderer.on('twitter-login-fail', (_ev) => {
        // 仕様で絶対飛んできてしまうのでログイン状態を見てアラートを出す
        const config = new Config()
        setTimeout(() => {
          if (!config.get('is_login')) {
            swal({
              title: 'ログインに失敗しました',
              text: 'IDとパスワードを確認してください',
              type: 'warning'
            })
          }
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
#login {
  padding-top: 50px;
  height: 100%;
  background-color: #32adf4;
}

h1,
h2 {
  text-align: center;
}

h1 img {
  width: 234px;
  height: auto;
  margin-bottom: 1rem;
}

h2 {
  padding-top: 2rem;
  color: white;
  font-size: 1.2rem;
  line-height: 1.5rem;
}

h2,
img,
button {
  margin: 0 auto;
}

button {
  display: block;
  background-color: #fff;
  width: 80%;
  border-radius: 100px;
}
</style>
