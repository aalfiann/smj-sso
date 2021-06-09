'use strict'

const express = require('express')
const router = express.Router()
const helper = require('../lib/helper')
const password = require('../lib/password')
const { v4: uuidv4 } = require('uuid')
const { db, User } = require('../models/user')

router.get('/', (req, res) => {
  res.render('index', {})
})

router.get('/register', (req, res) => {
  res.render('register', {})
})

router.post('/register', async (req, res, next) => {
  try {
    if (!helper.isEmptyString(req.body.email) && !helper.isEmptyString(req.body.password)) {
      // check available email
      const findEmail = await User.findOne({ where: { email: req.body.email } })
      if (findEmail === null) {
        // hash password
        const hash = await password.generate(req.body.password)
        // generate client id and secret
        const clientId = uuidv4()
        const clientSecret = helper.randomString(43)
        // save to db
        const newuser = await User.create({
          email: req.body.email,
          hash: hash,
          service_name: req.body.service_name,
          service_callback_url: req.body.service_callback_url,
          client_id: clientId,
          client_secret: clientSecret
        })
        if (newuser) {
          // success
          res.json({
            status: true,
            message: 'Register success',
            response: {
              client_id: clientId,
              client_secret: clientSecret
            }
          })
        } else {
          // fail
          res.status(400).json({
            status: false,
            message: 'Register failed'
          })
        }
      } else {
        res.json({
          status: false,
          message: 'User email already exists'
        })
      }
      db.close()
    } else {
      res.status(400).json({
        status: false,
        message: 'Bad Request'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/login', (req, res) => {
  res.render('login', {})
})

router.post('/login', async (req, res, next) => {
  try {
    if (!helper.isEmptyString(req.body.email) && !helper.isEmptyString(req.body.password)) {
      // check email
      // verify password
      // generate code
      // redirect to service callback url with code
    } else {
      res.status(400).json({
        status: false,
        message: 'Bad Request'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/token', async (req, res, next) => {
  try {
    if (!helper.isEmptyString(req.body.grant_type) &&
      !helper.isEmptyString(req.body.code) &&
      !helper.isEmptyString(req.body.client_id) &&
      !helper.isEmptyString(req.body.client_secret)) {
      // grant_type value must be "authorization_code"
      // check expires session code
      // check client_id and client_secret
      // generate access_token
      // save access_token to session for 1 hour
      // clear session code
      // res.json({
      //   status: true,
      //   message: 'Successful get token',
      //   response: {
      //     access_token: 'RsT5OjbzRn430zqMLgV3Ia',
      //     expires_in: 3600
      //   }
      // })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/profile', (req, res) => {
  //
})

module.exports = router
