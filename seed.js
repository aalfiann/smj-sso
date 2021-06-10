'use strict'

const { db } = require('./lib/connection')
const { User } = require('./models/user')
const { Service } = require('./models/service')
const seed = async () => {
  await User.sync({ force: true })
  await Service.sync({ force: true })
  db.close()
}

seed()
