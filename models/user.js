'use strict'

const config = require('../config')
const { Sequelize } = require('sequelize')
const db = new Sequelize(config.database.name, config.database.user, config.database.pass, {
  host: config.database.host,
  dialect: 'mysql'
})

const User = db.define('user', {
  email: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING
  },
  service_name: {
    type: Sequelize.STRING
  },
  service_callback_url: {
    type: Sequelize.STRING
  },
  client_id: {
    type: Sequelize.STRING
  },
  client_secret: {
    type: Sequelize.STRING
  }
})

module.exports = {
  User,
  db
}
