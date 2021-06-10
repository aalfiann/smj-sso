'use strict'

const { db, Sequelize } = require('../lib/connection')

const User = db.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
})

module.exports = {
  User,
  db
}
