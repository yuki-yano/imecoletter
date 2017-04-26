/* @flow */
import type { User } from 'types/user'

export type ImageUrl = {|
  base: string,
  small: string,
  medium: string,
  large: string,
  original: string
|};

export type Label = {|
  name: string,
  score: number,
  rand: number
|}

export type Image = {|
  url: ImageUrl,
  labels: Array<Label>,
  rand: number
|}

export type ImageTweet = {|
  id: string,
  user: User,
  text: string,
  date: string,
  images: Array<Image>,
  retweet: number,
  retweet_user: ?User,
  retweeted: boolean,
  fav: number,
  faved: boolean,
  rand: number
|}
