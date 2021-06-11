'use strict'

const config = require('../config')
const { Sequelize } = require('sequelize')

const db = new Sequelize(config.database.name, config.database.user, config.database.pass, {
  host: config.database.host,
  port: config.database.port,
  dialect: 'mysql',
  logging: config.database.logging
})

module.exports = {
  db,
  Sequelize
}
