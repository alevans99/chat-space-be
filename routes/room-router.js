const apiRouter = require('express').Router()
const { createNewRoomId, getUserStatus } = require('../controllers/roomsController')
const createRouter = (store) => {
  const router = apiRouter

  router.route('/').all((req, res) => {
    res.status(405).send({ message: 'Method Not Allowed' })
  })

  router
    .route('/create')
    .post(createNewRoomId(store))
    .all((req, res) => {
      res.status(405).send({ message: 'Method Not Allowed' })
    })

  router
    .route('/:roomName/:user')
    .get(getUserStatus(store))
    .all((req, res) => {
      res.status(405).send({ message: 'Method Not Allowed' })
    })
  return router
}

module.exports = createRouter
