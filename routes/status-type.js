'use strict'

const express = require('express')
const router = express.Router()
const { StatusType } = require('../models/status-type')
const helper = require('../lib/helper')

router.post('/status-type/list', async (req, res, next) => {
  // authenticate
  // list all status
  const status = await StatusType.findAll()
  return res.json({
    status: true,
    message: 'List data status type.',
    response: status
  })
})

router.post('/status-type/add', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.status_type)) {
    // check name is exists
    const status = await StatusType.findOne({ where: { status_type: req.body.status_type } })
    if (status === null) {
      const newstatus = await StatusType.create({ status_type: req.body.status_type })
      if (newstatus) {
        result = {
          status: true,
          message: 'Add status type success',
          response: newstatus
        }
      } else {
        return res.json({
          status: false,
          message: 'Fail to add status type'
        })
      }
    } else {
      return res.json({
        status: false,
        message: 'Status type already exists'
      })
    }
  }
  res.json(result)
})

router.post('/status-type/update', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.status_type) && !helper.isEmptyString(req.body.status_type_id)) {
    const updatestatus = await StatusType.update({ status_type: req.body.status_type }, { where: { id: req.body.status_type_id } })
    if (updatestatus) {
      result = {
        status: true,
        message: 'Update status type success',
        response: updatestatus
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to update status type'
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

router.post('/status-type/delete', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.status_type_id)) {
    const deletestatus = await StatusType.destroy({ where: { id: req.body.status_type_id } })
    if (deletestatus) {
      result = {
        status: true,
        message: 'Delete status type success',
        response: deletestatus
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to delete status type'
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
