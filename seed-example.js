'use strict'

const password = require('./lib/password')
const { v4: uuidv4 } = require('uuid')
const { db } = require('./lib/connection')
const { User } = require('./models/user')
const { Service } = require('./models/service')
const seed = async () => {
  await User.sync({ force: true })
  await User.bulkCreate([{
    id: uuidv4(),
    email: 'admin1@example.com',
    hash: await password.generate('123456'),
    status: 'active'
  }, {
    id: uuidv4(),
    email: 'admin2@example.com',
    hash: await password.generate('654321'),
    status: 'banned'
  }])
  await Service.sync({ force: true })
  await Service.create({
    id: uuidv4(),
    service_name: 'app example',
    service_callback_url: 'http://localhost:3000/cb',
    client_id: '60mwt1txtlnvadtjy5pkwtfwos78im67',
    client_secret: 'kxiykbx9b4ibjd1ofhbg6qg3u4hshui22e8zrp0bqdw'
  })
  db.close()
}

seed()
