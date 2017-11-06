'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const chalk = require('chalk')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

// Socket.io / webSockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  socket.on('agent/message', payload => {
    console.log(payload)
  })

  setInterval(() => {
    socket.emit('agent/message', { agent: 'xxx-yyy'})
  }, 2000)
})


function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtExeption', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[Platziverse-Web]')} server listening on port ${port}`)
})
