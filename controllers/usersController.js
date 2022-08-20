exports.getUserStatus = (store) => {
    return async (req, res, next) => {
      const { user, roomName } = req.body
      try {


        const userIndex = store.rooms[roomName].users.findIndex((roomUser) => {
          return roomUser.username === user
        })
  
        res.status(200).send({ status: userIndex !== -1 })
      } catch (error) {
        next(error)
      }
    }
  }
  