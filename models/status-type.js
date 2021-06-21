'use strict'

const { db, Sequelize } = require('../lib/connection')

const StatusType = db.define('status-type', {
  status_type: {
    type: Sequelize.STRING
  }
})

module.exports = {
  StatusType,
  db
}
