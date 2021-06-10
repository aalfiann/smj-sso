'use strict'

const { db, Sequelize } = require('../lib/connection')

const Service = db.define('service', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
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
  Service,
  db
}
