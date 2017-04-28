/* @flow */
import type { ImageTweet, Image, Label } from 'types/imageTweet'

export type AuthState = {|
  login: boolean,
  access_token: ?string,
  access_secret: ?string
|}

export type TweetsState = {|
  imageTweets: Array<ImageTweet>,
  loading: boolean,
  refreshing: boolean
|}

export type SearchState = {|
  labels: Array<Label>
|}

export type ModalState = {|
  image: ?Image
|}

export type SettingsState = {|
  autoReload: number,
  imageCount: number
|}

export type DebugState = {|
  saveMode: boolean
|}
