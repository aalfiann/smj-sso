'use strict'

const config = {
  port: process.env.PORT || 4000, // Port Server (default is 4000)
  session: {
    maxAge: 3600 // 1 hour
  },
  database: {
    name: 'sso_db',
    user: 'root',
    pass: '',
    host: 'localhost',
    port: 3306,
    logging: true
  }
}

module.exports = config
