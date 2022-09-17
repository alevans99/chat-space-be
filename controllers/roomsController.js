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

      //Remove empty unused rooms at new room creation.
      Object.keys(store.rooms).forEach((roomName) => {
        const currentRoom = store.rooms[roomName]
        if (
          currentRoom.users.length === 0 &&
          DateTime.fromISO(currentRoom.createdTimestamp).diffNow().toMillis() <
            -10000
        ) {
          store.deleteEmptyRoom(roomName)
        }
      })

      //Limit number of rooms to 100 at a time
      if (Object.keys(store.rooms).length < 100) {
        store.rooms[newRoomName] = {
          createdTimestamp: DateTime.now().toISO(),
          users: [],
        }
        res.status(200).send({
          newRoomName,
          message: 'success',
          roomCount: store.rooms[newRoomName].users.length,
        })
      } else {
        const error = Error('Too Many Room Requests')
        error.status = 503
        throw error
      }
    } catch (error) {
      next(error)
    }
  }
}

exports.getRoomStatus = (store) => {
  return async (req, res, next) => {
    const { roomName } = req.params
    try {
      res.status(200).send({ status: store.rooms[roomName] !== undefined })
    } catch (error) {
      next(error)
    }
  }
}
