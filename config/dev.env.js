'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://szarch:60447/api"',
  STATIC_URL: '"http://szarch:60447/content"',
})
