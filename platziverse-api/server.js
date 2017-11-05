'use strict'

const http = require('http')
const debug = require('debug')('Platziverse:api-server')
const chalk = require('chalk')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

// Express errorHandler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/nor found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncauhtExeption', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('--> [Platziverse-API]')} server listening on port ${port}`)
})
