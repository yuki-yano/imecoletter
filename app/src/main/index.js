/* @flow */
import { app, BrowserWindow, shell, ipcMain } from 'electron'
import twitterAPI from 'node-twitter-api'
import Twitter from 'twit'
import Config from 'electron-config'

import type Twit from 'twit'

import appEnv from '../../../env'

let mainWindow: ?BrowserWindow
const mainUrl: string = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

const twitter = new twitterAPI({
  consumerKey: appEnv.TWITTER_KEY,
  consumerSecret: appEnv.TWITTER_SECRET,
  callback: 'https://www.google.co.jp/'
})

async function isLogin (accessToken: ?string, accessSecret: ?string): Promise<boolean> {
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
    const result = await client.get('account/verify_credentials', { skip_status: true })
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

async function createWindow () {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1280,
    minWidth: 320,
    'web-preferences': {'web-security': false}
  })

  mainWindow.loadURL(mainUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  const config = new Config()
  const accessToken: ?string = config.get('twitter_access_token')
  const accessSecret: ?string = config.get('twitter_access_secret')

  if (!(await isLogin(accessToken, accessSecret))) {
    twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
      const loginUrl: string = twitter.getAuthUrl(requestToken)
      const loginWindow = new BrowserWindow({width: 800, height: 600})
      loginWindow.webContents.on('will-navigate', (event, loginUrl) => {
        let matched: string
        if (matched = loginUrl.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
          twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessSecret) => {
            config.set('twitter_access_token', accessToken)
            config.set('twitter_access_secret', accessSecret)
          })
        }
        event.preventDefault()
        mainWindow.loadURL(mainUrl)
        loginWindow.close()
      })
      loginWindow.loadURL(loginUrl)
    })
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
