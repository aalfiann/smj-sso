'use strict'

const express = require('express')
const router = express.Router()
const { DataRoles } = require('../models/data-roles')
const helper = require('../lib/helper')

router.post('/data-roles/list', async (req, res, next) => {
  // authenticate
  // list all data roles
  const roles = await DataRoles.findAll()
  return res.json({
    status: true,
    message: 'List data roles.',
    response: roles
  })
})

router.post('/data-roles/add', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.name) &&
    !helper.isEmptyString(req.body.parent_name) &&
    !helper.isEmptyString(req.body.path
    )) {
    // check path is exists
    const roles = await DataRoles.findOne({ where: { path: req.body.path } })
    if (roles === null) {
      const newroles = await DataRoles.create({
        name: req.body.name,
        parent_name: req.body.parent_name,
        path: req.body.path
      })
      if (newroles) {
        result = {
          status: true,
          message: 'Add data roles success',
          response: newroles
        }
      } else {
        return res.json({
          status: false,
          message: 'Fail to add data roles'
        })
      }
    } else {
      return res.json({
        status: false,
        message: 'Data roles already exists'
      })
    }
  }
  res.json(result)
})

router.post('/data-roles/update', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.roles_id)) {
    const update = await DataRoles.update({
      name: req.body.name,
      parent_name: req.body.parent_name,
      path: req.body.path
    }, { where: { id: req.body.roles_id } })
    if (update) {
      result = {
        status: true,
        message: 'Update data roles success',
        response: update
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to update data roles'
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

router.post('/data-roles/delete', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.roles_id)) {
    const deleteroles = await DataRoles.destroy({ where: { id: req.body.roles_id } })
    if (deleteroles) {
      result = {
        status: true,
        message: 'Delete data roles success',
        response: deleteroles
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to delete data roles'
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
