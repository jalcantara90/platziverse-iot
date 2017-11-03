'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const metricFixtures = require('./fixtures/metric')
// const agentFixture = require('./fixtures/agent')

let config = {
  logging: function () {}
}

// let single = Object.assign({}, metricFixtures.single)
// let type = 'TEMP'
let uuid = 'yyy-yyy-yyy'
let MetricStub = null
let db = null
let sandbox = null

let AgentStub = { hasMany: sinon.spy() }

// let uuidArgs = {
//   where: {
//     uuid
//   }
// }

// let typeUuidArgs = {
//   attributes: [ 'id', 'type', 'value', 'createdAt' ],
//   where: {
//     type
//   },
//   limit: 20,
//   order: [[ 'createdAt', 'DESC' ]],
//   include: [{
//     attributes: [],
//     model: AgentStub,
//     where: {
//       uuid
//     }
//   }],
//   raw: true
// }

// let metricArgs = {
//   attributes: ['type'],
//   group: [ 'type' ],
//   include: [{
//     attributes: [],
//     model: AgentStub,
//     where: {
//       uuid
//     }
//   }],
//   raw: true
// }

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  MetricStub = {
    belongsTo: sandbox.spy()
  }

  // Metric findAll stub
  MetricStub.findAll = sandbox.stub()
  MetricStub.findAll.withArgs(uuid).returns(Promise.resolve(metricFixtures.byAgentUuid(uuid)))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })
  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('Metric', t => {
  t.truthy(db.Metric, 'Agent Service should exist')
})

// test.serial('Metric#findByAgentUuid', async t => {
//   let metric = await db.Metric.findByAgentUuid(uuid)

//   t.true(MetricStub.findAll.called, 'findAll shoud be called')
//   t.true(MetricStub.findAll.calledOnce, 'findAll should be called once')
//   t.true(MetricStub.findAll.calledWith(metricArgs), 'findAll should be called with specified args')
//   // t.is(metric.length, metricFixtures.byAgentUuid('yyy-yyy-yyy').length, 'should have the same length')
//   t.deepEqual(metric, metricFixtures.byAgentUuid(uuid))
// })
