'use strict'

const express = require('express')
const router = express.Router()
const { BuildingType } = require('../models/building-type')
const helper = require('../lib/helper')

router.post('/building-type/list', async (req, res, next) => {
  // authenticate
  // list all building
  const building = await BuildingType.findAll()
  return res.json({
    status: true,
    message: 'List type data building.',
    response: building
  })
})

router.post('/building-type/add', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.building_type)) {
    // check name is exists
    const building = await BuildingType.findOne({ where: { building_type: req.body.building_type } })
    if (building === null) {
      const newbuilding = await BuildingType.create({ building_type: req.body.building_type })
      if (newbuilding) {
        result = {
          status: true,
          message: 'Add building type success',
          response: newbuilding
        }
      } else {
        return res.json({
          status: false,
          message: 'Fail to add building type'
        })
      }
    } else {
      return res.json({
        status: false,
        message: 'Building type already exists'
      })
    }
  }
  res.json(result)
})

router.post('/building-type/update', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.building_type) && !helper.isEmptyString(req.body.building_type_id)) {
    const update = await BuildingType.update({ building_type: req.body.building_type }, { where: { id: req.body.building_type_id } })
    if (update) {
      result = {
        status: true,
        message: 'Update building type success',
        response: update
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to update building type'
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

router.post('/building-type/delete', async (req, res, next) => {
  // authenticate
  let result = ''
  if (!helper.isEmptyString(req.body.building_type_id)) {
    const deletebuilding = await BuildingType.destroy({ where: { id: req.body.building_type_id } })
    if (deletebuilding) {
      result = {
        status: true,
        message: 'Delete building type success',
        response: deletebuilding
      }
    } else {
      return res.json({
        status: false,
        message: 'Fail to delete building type'
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
