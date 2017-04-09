/* @flow */
import Home from 'components/Home'
import Login from 'components/Login'

import * as ROUTE from 'constants/route'

export default [
  {
    path: `/${ROUTE.HOME}`,
    name: 'home-page',
    component: Home
  },
  {
    path: `/${ROUTE.LOGIN}`,
    name: 'login-page',
    component: Login
  },
  {
    path: '*',
    redirect: '/'
  }
]
