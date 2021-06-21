'use strict'

const { db, Sequelize } = require('../lib/connection')

const UserType = db.define('user-type', {
  user_type: {
    type: Sequelize.STRING
  }
})

module.exports = {
  UserType,
  db
}
