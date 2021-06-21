'use strict'

const { db, Sequelize } = require('../lib/connection')

const DataRoles = db.define('data-roles', {
  name: {
    type: Sequelize.STRING
  },
  parent_name: {
    type: Sequelize.STRING
  },
  path: {
    type: Sequelize.STRING
  }
})

module.exports = {
  DataRoles,
  db
}
