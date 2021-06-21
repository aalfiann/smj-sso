'use strict'

const express = require('express')
const app = express()
const path = require('path')
const config = require('./config')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'eta')
app.set('views', path.join(__dirname, 'views'))

// routes
app.use(require('./routes/default.js'))
app.use(require('./routes/status-type.js'))
app.use(require('./routes/building-type.js'))
app.use(require('./routes/user-type.js'))
app.use(require('./routes/data-roles.js'))

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`)
})
