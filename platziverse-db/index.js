'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 1000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  // Así definimos que un Agente tiene n métricas
  AgentModel.hasMany(MetricModel)
  // Así definimos que una métrica pertenece a un Agente
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate() // este método comprueba que la base de datos se conecte correctamente

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
