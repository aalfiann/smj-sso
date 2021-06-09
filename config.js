'use strict'

const config = {
  port: process.env.PORT || 3000, // Port Server (default is 3000)
  session: {
    maxAge: 3600000, // 1 hour
    secret: 'secret for session'
  },
  database: {
    name: 'sso_db',
    user: 'root',
    pass: '',
    host: 'localhost'
  }
}

module.exports = config
