/* @flow */
import Twitter from 'twit'
import type Twit from 'twit'

import * as ACTION from 'vuex/action-types'
import * as MUTATION from 'vuex/mutation-types'

import appEnv from '../../../../env'

export default {
  [ACTION.LOGIN]: async ({ commit }, { accessToken, accessSecret }) => {
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
        commit(MUTATION.LOGOUT)
      } else {
        commit(MUTATION.LOGIN, { accessToken, accessSecret })
      }
    } catch (e) {
      commit(MUTATION.LOGOUT)
    }
  },
  [ACTION.LOGOUT] ({ commit }: { commit: Function }) {
    commit(MUTATION.LOGOUT)
  }
}
