'use strict'

const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const config = require('./config')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: config.session.secret,
  cookie: { maxAge: config.session.maxAge },
  resave: true,
  saveUninitialized: true
}))

app.set('view engine', 'eta')
app.set('views', path.join(__dirname, 'views'))

// routes
app.use(require('./routes/default.js'))

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`)
})
