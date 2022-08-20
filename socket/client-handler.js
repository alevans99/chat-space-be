module.exports = (io, client, store) => {
  client.on('join-space', (data) => {
    const username = data.username
    const room = data.room
    const clientId = data.clientId

    if (store.rooms[room] !== undefined) {
      const clientIndex = store.rooms[room].users.findIndex((user) => {
        return user.clientId === clientId
      })

      if (clientIndex === -1) {
        //Add the client to the room requested
        store.rooms[room].users.push({ username, clientId })
      }

      const currentUsers = []
      const clients = []

      store.rooms[room].users.forEach((user) => {
        currentUsers.push(user.username)
        clients.push(user.clientId)
      })
      client.join(room)

      //Send a list of all current users in the room
      io.to(room).emit('join-space', { currentUsers })
    }
  })

  client.on('message', ({ text, room, senderName, timestamp }) => {
    io.to(room).emit('message', {text, senderName, senderId: client.id, timestamp})
  })
}
