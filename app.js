const express = require('express')
const createRoomRouter = require('./routes/room-router')
const cors = require('cors')
const createUserRouter = require('./routes/user-router')
const {
  handleCustomErrors,
  handleServerErrors,
} = require('./controllers/errorsController')

const createExpressApp = (store) => {
  const app = express()
  app.use(express.json())
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

  /**
   * Express Router
   */
  const roomRouter = createRoomRouter(store)
  const userRouter = createUserRouter(store)
  app.use('/room', roomRouter)
  app.use('/user', userRouter)

  app.all('/*', (req, res) => {
    res.status(404).send({ message: 'Path not found' })
  })

  app.use(handleCustomErrors)
  app.use(handleServerErrors)

  return app
}

module.exports = createExpressApp
