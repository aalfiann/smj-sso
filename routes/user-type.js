'use strict'

const express = require('express')
const router = express.Router()
const { UserType } = require('../models/user-type')
const helper = require('../lib/helper')

router.post('/user-type/list', async (req, res, next) => {
  // authenticate
  // list all user type
  const user = await UserType.findAll()
  return res.json({
    status: true,
    message: 'List type data user.',
    response: user
  })
})

router.post('/user-type/add', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.user_type)) {
    // check name is exists
    const user = await UserType.findOne({ where: { user_type: req.body.user_type } })
    if (user === null) {
      const newuser = await UserType.create({ user_type: req.body.user_type })
      if (newuser) {
        result = {
          status: true,
          message: 'Add user type success',
          response: newuser
        }
      } else {
        return res.json({
          status: false,
          message: 'Fail to add user type'
        })
      }
    } else {
      return res.json({
        status: false,
        message: 'User type already exists'
      })
    }
  }
  res.json(result)
})

router.post('/user-type/update', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.user_type) && !helper.isEmptyString(req.body.user_type_id)) {
    const update = await UserType.update({ user_type: req.body.user_type }, { where: { id: req.body.user_type_id } })
    if (update) {
      result = {
        status: true,
        message: 'Update user type success',
        response: update
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to update user type'
      })
    }
  } else {
    return res.json({
      status: false,
      message: 'Invalid parameter'
    })
  }
  res.json(result)
})

router.post('/user-type/delete', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.user_type_id)) {
    const deleteuser = await UserType.destroy({ where: { id: req.body.user_type_id } })
    if (deleteuser) {
      result = {
        status: true,
        message: 'Delete user type success',
        response: deleteuser
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to delete user type'
      })
    }
  } else {
    return res.json({
      status: false,
      message: 'Invalid parameter'
    })
  }
  res.json(result)
})

module.exports = router
