const http = require('http')
const { Server } = require('socket.io')

/**
 * Socket.io
 */

const createSocketServer = (expressApp, store) => {
  const socketServer = http.createServer(expressApp)
  const io = new Server(socketServer, {
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (client) => {
    console.log('Client connected ', client.id)
    client.emit('connected', 'Success')
    require('./socket/client-handler')(io, client, store)
    client.on('disconnect', () => {
      console.log('Client Disconnected: ')
    })
  })
  return socketServer
}

module.exports = createSocketServer
