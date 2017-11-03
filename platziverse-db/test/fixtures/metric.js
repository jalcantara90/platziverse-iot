'use strict'

const agentFixtures = require('./agent')

const metric = {
  id: 1,
  agentId: 'yyy-yyy-yyy',
  type: 'CPU',
  value: '30%',
  createdAt: new Date(),
  updatedAt: new Date()
}

const metrics = [
  metric,
  extend(metric, {id: 2, agentId: 'yyy-yyy-yyy', type: 'TEMP', value: '28'}),
  extend(metric, {id: 3, agentId: 'yyy-yyy-yyw'}),
  extend(metric, {id: 4, agentId: 'yyy-yyy-yyy', type: 'TEMP', value: '25'})
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: metric,
  all: metrics,
  byAgentUuid: id => metrics.filter(metric => metric.agentId === id),
  byTypeAgentUuid: (type, uuid) => metrics.filter(metric => metric.agentId === uuid).filter(metric => metric.type === type)
}
