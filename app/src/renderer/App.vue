<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* @flow */
import Router from 'vue-router'
import Config from 'electron-config'
import Twitter from 'twit'

import store from 'vuex/store'
import * as ACTION from 'vuex/action-types'
import * as ROUTE from 'constants/route'
import appEnv from '../../../env'

async function isLogin (
  accessToken: ?string,
  accessSecret: ?string
): Promise<boolean> {
  const config = new Config()
  if (!accessToken && !accessSecret) {
    config.set('is_login', false)
    return false
  }

  const client: Twit = new Twitter({
    consumer_key: appEnv.TWITTER_KEY,
    consumer_secret: appEnv.TWITTER_SECRET,
    access_token: accessToken,
    access_token_secret: accessSecret
  })
  try {
    const result = await client.get('account/verify_credentials', {
      skip_status: true
    })
    if ('errors' in result.data) {
      config.set('is_login', false)
      return false
    } else {
      const config = new Config()
      config.set('is_login', true)
      return true
    }
  } catch (e) {
    config.set('is_login', false)
    return false
  }
}

export default {
  store,
  async mounted () {
    const config = new Config()
    const accessToken: ?string = config.get('twitter_access_token')
    const accessSecret: ?string = config.get('twitter_access_secret')

    const router = new Router()
    if (await isLogin(accessToken, accessSecret)) {
      router.push(ROUTE.HOME)
      this.$store.dispatch(ACTION.LOGIN, {
        accessToken: accessToken,
        accessSecret: accessSecret
      })
    } else {
      router.push(ROUTE.LOGIN)
    }
  }
}
</script>

<style lang="scss">
@import url(//fonts.googleapis.com/css?family=Lato:300);
@import url(//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic);
@import url(//fonts.googleapis.com/icon?family=Material+Icons);

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: content-box;
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  margin-bottom: 0;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  text-align: center;

  &:disabled {
    outline: none;
    border: none;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font-weight: 700;
}

p {
  margin: 0;
}
</style>
