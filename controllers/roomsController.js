const { randomRoomGenerator } = require('../randomiser/random-room-generator')
const { DateTime } = require('luxon')
/**
 * This passes back a controller which creates a new room name and
 * adds the user who requested its creation.
 * @param {*} store - The memory store instance to access list of rooms
 * @returns A callback which returns the new room name when sucessful
 */
exports.createNewRoomId = (store) => {
  return async (req, res, next) => {
    try {
      const newRoomName = randomRoomGenerator()
      const username = req.body.username
      const clientId = req.body.clientId

      store.rooms[newRoomName] = {
        createdTimestamp: DateTime.now().toISO(),
        users: [{ username, clientId }],
      }
      res.status(200).send({ newRoomName, message: 'success' })
    } catch (error) {
      next(error)
    }
  }
}
