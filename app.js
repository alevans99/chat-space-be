const express = require('express')
const apiRouter = require('./routes/api-router')
const cors = require('cors')
const app = express()
const ENV = process.env.NODE_ENV || 'development'

const corsConfig =
  ENV !== 'production'
    ? {
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200,
      }
    : {}
app.use(cors(corsConfig))
app.use(express.json())
app.use('/api', apiRouter)

//Return error for non-supported routes
app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Path not found' })
})

module.exports = app
