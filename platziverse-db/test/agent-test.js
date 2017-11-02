'use strict'

const test = require('ava')

let config = {
  logging: function () {}
}

let db = null
// test('make it pass', t => {
//   t.pass()
// })
test.beforeEach(async () => {
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent Service should exist')
})
