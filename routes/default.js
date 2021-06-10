'use strict'

const express = require('express')
const router = express.Router()
const helper = require('../lib/helper')
const password = require('../lib/password')
const { v4: uuidv4 } = require('uuid')
const { User } = require('../models/user')
const { Service } = require('../models/service')
const { session } = require('../lib/session')
const config = require('../config')

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
      const findUser = await User.findOne({ where: { email: req.body.email } })
      if (findUser === null) {
        // hash password
        const hash = await password.generate(req.body.password)
        // generate client id and secret
        const userId = uuidv4()
        const clientId = helper.randomString(32)
        const clientSecret = helper.randomString(43)
        // save to db
        const newuser = await User.create({
          id: userId,
          email: req.body.email,
          hash: hash,
          status: 'active'
        })
        if (newuser) {
          if (!helper.isEmptyString(req.body.service_name) && !helper.isEmptyString(req.body.service_callback_url)) {
            const newservice = await Service.create({
              id: uuidv4(),
              service_name: req.body.service_name,
              service_callback_url: req.body.service_callback_url,
              client_id: clientId,
              client_secret: clientSecret
            })
            if (newservice) {
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
              status: true,
              message: 'Register success'
            })
          }
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
  res.render('login', { client_id: req.query.client_id, message: '' })
})

router.post('/login', async (req, res, next) => {
  try {
    if (!helper.isEmptyString(req.body.email) && !helper.isEmptyString(req.body.password)) {
      // check email
      const findUser = await User.findOne({ where: { email: req.body.email } })
      if (findUser !== null) {
        // verify password
        const verifyPass = await password.compare(req.body.password, findUser.hash)
        if (verifyPass) {
          // check user status active or banned
          if (findUser.status === 'banned') {
            return res.render('login', { client_id: req.query.client_id, message: 'Invalid credentials' })
          }
          // generate code
          const code = helper.randomString(21)
          await session.set(code, { code: code, email: req.body.email, user_id: findUser.id, status: findUser.status }, 120)
          // redirect to service callback url with code
          const redir = await Service.findOne({ where: { client_id: req.query.client_id } })
          if (redir !== null) {
            res.redirect(helper.appendUrlParam(redir.service_callback_url, 'code', code))
          } else {
            res.render('login', { client_id: req.query.client_id, message: 'Invalid credentials' })
          }
        } else {
          res.render('login', { client_id: req.query.client_id, message: 'Wrong Email or Password' })
        }
      } else {
        res.render('login', { client_id: req.query.client_id, message: 'Wrong Email or Password' })
      }
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
      if (req.body.grant_type === 'authorization_code') {
        // check expires session code
        const recode = await session.get(req.body.code)
        if (recode) {
          // check client_id and client_secret
          const findService = await Service.findOne({ where: { client_id: req.body.client_id, client_secret: req.body.client_secret } })
          if (findService !== null) {
            // generate new access_token
            const accessToken = helper.randomString(32)
            // save access_token to session for 1 hour
            await session.set(accessToken, { access_token: accessToken, email: recode.email, user_id: recode.user_id, status: recode.status })
            // clear session code
            await session.del(req.body.code)
            return res.json({
              status: true,
              message: 'Successful get token',
              response: {
                access_token: accessToken,
                expires_in: config.session.maxAge
              }
            })
          }
        } else {
          return res.status(400).json({
            status: false,
            message: 'Session expired'
          })
        }
      }
      res.status(400).json({
        status: false,
        message: 'Bad Request'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/profile', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' })
  }
  const data = await session.get(req.headers.authorization.replace('Bearer ', ''))
  if (data) {
    res.json({
      status: true,
      message: 'Succesful get data profile',
      response: {
        user_id: data.user_id,
        email: data.email,
        status: data.status
      }
    })
  } else {
    res.status(400).json({
      status: false,
      message: 'Bad Request'
    })
  }
})

module.exports = router
