module.exports = (io, client, store) => {
  client.on('join-space', (data) => {
    const username = data.username
    const room = data.room
    const clientId = data.clientId

    if (store.doesRoomExist(room)) {
      store.addUserToRoom(room, clientId, username)
      client.join(room)
      io.to(room).emit('join-space', {
        newUser: { username, clientId },
        currentUsers: store.getCurrentUsers(room),
      })
    }
  })

  client.on('message', ({ text, room, senderName, timestamp }) => {
    io.to(room).emit('message', {
      text,
      senderName,
      senderId: client.id,
      timestamp,
    })
  })

  client.on('leave-space', ({ room }) => {
    //Get room for client:
    client.leave(room)
    //Remove client from local store
    store.removeClientFromRoom(room, client.id)
    //Broadcast leave to the rest of the clients in the room
    io.to(room).emit('leave-space', { clientId: client.id })
  })

  client.on('disconnecting', () => {
    //Get room for client:
    let room = null
    client.rooms.forEach((item) => {
      if (item !== client.id) {
        room = item
      }
    })
    client.leave(room)
    //Remove client from local store
    store.removeClientFromRoom(room, client.id)
    //Broadcast leave to the rest of the clients in the room
    io.to(room).emit('leave-space', { clientId: client.id })
  })

  client.on('typing', ({room, typing}) => {
    //Broadcast typing boolean to the rest of the clients in the room
    console.log('client: ', client.id, ' typing: ', typing)
    io.to(room).emit('typing', { clientId: client.id, typing })
  })
}
