'use strict'

const debug = require('debug')('Platziverse:api-routes')
const express = require('express')
const db = require('platziverse-db')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const conf = require('../platziverse-config')
const { authConfig } = require('../utils')

const config = conf({setup: false})

const api = asyncify(express.Router())

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      debug('Connecting to DB')
      services = await db(config)
    } catch (e) {
      return next(e)
    }

    Agent = services.Agent
    Metric = services.Metric
  }
  next()
})

api.get('/agents', auth(authConfig),async (req, res, next) => {
  debug('A request has come to /agents')

  const { user } = req
  console.log(user)
  if (!user || !user.username) {
    console.log('user: ' + user)
    console.log('username: ' + user.user.username)
    return res.send({ message: 'hola'})
  }

  let agents = []
  try {
    if (user.admin) {
      agents = await Agent.findConnected()
    }else {
      agents = await Agent.findByUsername(user.user.username)
    }
  } catch (e) {
    next(e)
  }

  res.send(agents)
})

api.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /agent/${uuid}`)
  let agent

  try {
    agent = await Agent.findByUuid(uuid)
  } catch (e) {
    next(e)
  }

  if (!agent) {
    return next(new Error(`Agent not found with uuid ${uuid}`))
  }
  res.send(agent)
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /metrics/${uuid}`)
  let metrics = []

  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch (e) {
    next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid: ${uuid}`))
  }

  res.send(metrics)
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params

  let metrics = []

  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (e) {
    next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics (${type}) not found for agent with uuid: ${uuid}`))
  }

  res.send({ metrics })
})

module.exports = api
