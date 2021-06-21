'use strict'

const { db, Sequelize } = require('../lib/connection')

const BuildingType = db.define('building-type', {
  building_type: {
    type: Sequelize.STRING
  }
})

module.exports = {
  BuildingType,
  db
}
