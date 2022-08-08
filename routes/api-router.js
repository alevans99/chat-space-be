const apiRouter = require('express').Router()

apiRouter
  .route('/')
  .get(async (req, res) => {
    res.status(200).send({ message: 'Connected to the API' })
  })
  .all((req, res) => {
    res.status(405).send({ message: 'Method Not Allowed' })
  })

module.exports = apiRouter
