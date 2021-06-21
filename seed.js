'use strict'

const { db } = require('./lib/connection')
const { User } = require('./models/user')
const { Service } = require('./models/service')
const { StatusType } = require('./models/status-type')
const { BuildingType } = require('./models/building-type')
const { UserType } = require('./models/user-type')
const { DataRoles } = require('./models/data-roles')
const seed = async () => {
  await User.sync({ force: true })
  await Service.sync({ force: true })
  await StatusType.sync({ force: true })
  await BuildingType.sync({ force: true })
  await UserType.sync({ force: true })
  await DataRoles.sync({ force: true })
  db.close()
}

seed()
