class MemoryStore {
  constructor() {
    this.rooms = {}
  }

  removeUserFromRoom(room, user) {
    if (this.rooms[room] !== undefined) {
      const userIndex = this.rooms[room].users.findIndex((existingUser) => {
        return existingUser.username === user
      })
      if (userIndex !== -1) {
        this.rooms[room].users.splice(userIndex, 1)
        this.deleteEmptyRoom(room)
      }
    }
  }

  removeClientFromRoom(room, clientId) {
    if (this.rooms[room] !== undefined) {
      const userIndex = this.rooms[room].users.findIndex((existingUser) => {
        return existingUser.clientId === clientId
      })
      if (userIndex !== -1) {
        this.rooms[room].users.splice(userIndex, 1)
        this.deleteEmptyRoom(room)
      }
    }
  }

  addUserToRoom(room, clientId, username) {
    if (this.rooms[room] !== undefined) {
      const clientIndex = this.rooms[room].users.findIndex((user) => {
        return user.clientId === clientId
      })

      if (clientIndex === -1) {
        //Add the client to the room requested
        this.rooms[room].users.push({ username, clientId, typing: false })
      }
    }
    console.log(this.rooms)
  }

  doesRoomExist(room) {
    return this.rooms[room] !== undefined
  }

  getCurrentUsers(room) {
    return this.rooms[room].users
  }
  deleteEmptyRoom(room) {
    if (this.rooms[room] !== undefined && this.rooms[room].users.length === 0) {
      delete this.rooms[room]
    }
  }
}

module.exports = { MemoryStore }
