/* @flow */
import { app, BrowserWindow, Menu, shell, ipcMain } from 'electron'
import twitterAPI from 'node-twitter-api'
import Config from 'electron-config'

import type Twit from 'twit'

import appEnv from '../../../env'

// Install `electron-debug` with `devtron`
if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: true })
} else {
  require('electron-debug')()
}

let mainWindow: ?BrowserWindow
const mainUrl: string = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

const twitter = new twitterAPI({
  consumerKey: appEnv.TWITTER_KEY,
  consumerSecret: appEnv.TWITTER_SECRET,
  callback: 'https://www.google.co.jp/'
})

function loginDialog (ev) {
  twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
    const loginUrl: string = twitter.getAuthUrl(requestToken)
    const loginWindow = new BrowserWindow({width: 800, height: 600})
    loginWindow.webContents.on('will-navigate', (event, loginUrl) => {
      let matched: string
      if (matched = loginUrl.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessSecret) => {
          // エラー時は何故かここに来ない
          const config = new Config()
          config.set('twitter_access_token', accessToken)
          config.set('twitter_access_secret', accessSecret)
          config.set('is_login', true)
          ev.sender.send('twitter-login-success', accessToken, accessSecret)
        })
      }
      event.preventDefault()
      // 仕方ないので絶対failを飛ばす
      ev.sender.send('twitter-login-fail')
      loginWindow.close()
    })
    loginWindow.loadURL(loginUrl)
  })
}

async function createWindow () {
  // main
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1280,
    minWidth: 320,
    'web-preferences': {'web-security': false}
  })

  mainWindow.loadURL(mainUrl)

  mainWindow.on('closed', () => {
    app.quit()
  })

  ipcMain.on('twitter-login', (ev) => {
    loginDialog(ev)
  })
  
  const config = new Config()
  const accessToken: ?string = config.get('twitter_access_token')
  const accessSecret: ?string = config.get('twitter_access_secret')

  // debug
  const installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch((err) => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })

  const menu = Menu.buildFromTemplate([ { submenu: [ { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } } ] }, { label: 'Tools', submenu: [ { label: 'Open DevTools', click () { mainWindow.openDevTools() } } ] } ])
  Menu.setApplicationMenu(menu)
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
