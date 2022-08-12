const express = require('express')
const createApiRouter = require('./routes/api-router')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
app.use(express.json())
const socketServer = http.createServer(app)
const ENV = process.env.NODE_ENV || 'development'

/**
 * CORS
 */
const corsConfig =
  ENV !== 'production'
    ? {
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200,
      }
    : {}

app.use(cors(corsConfig))

const io = new Server(socketServer, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
})

/**
 * Socket.io
 */

io.on('connection', (socket) => {
  socket.emit('connected', 'Success')
})

/**
 * Express Router
 */
const apiRouter = createApiRouter()

app.use('/api', apiRouter)

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Path not found' })
})

module.exports = socketServer
