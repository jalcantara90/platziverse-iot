'use strict'

module.exports = function config (configExtra) {
  const config = {
    database: process.env.DB_NAME || 'platziverse_iot',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    hostname: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggin: s => debug(s),
    setup: true
  }
  
  function extend (obj, values) {
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
  }

  if (configExtra) {
    return extend(config, configExtra)
  }

  return config
}
