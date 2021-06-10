'use strict'

const Cacheman = require('recacheman')
const config = require('../config')
const session = new Cacheman('session', {
  engine: 'memory', // we can use session with redis for later
  ttl: config.session.maxAge
})

module.exports = {
  session
}
