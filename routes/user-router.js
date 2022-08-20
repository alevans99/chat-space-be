
const apiRouter = require('express').Router()
const {  getUserStatus } = require('../controllers/usersController')

const createRouter = (store) => {
  const router = apiRouter

  router
  .route('/')
  .post(getUserStatus(store))
  .all((req, res) => {
    res.status(405).send({ message: 'Method Not Allowed' })
  })

  return router
}

module.exports = createRouter

