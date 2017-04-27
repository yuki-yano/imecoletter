/* @flow */
/**
 * This file is used specifically and only for development. It enables the use of ES6+
 * features for the main process and installs `electron-debug` & `vue-devtools`. There
 * shouldn't be any need to modify this file, but it can be used to extend your
 * development environment.
 */

/* eslint-disable no-console */

// Set babel `env` and install `babel-register`
process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'main'

require('babel-register')({
  ignore: /node_modules/
})

// Require `main` process to boot app
require('./index')
