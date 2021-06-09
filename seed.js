'use strict'

const { db } = require('./models/user')
const seed = async () => {
  await db.sync({ force: true })
  db.close()
}

seed()
