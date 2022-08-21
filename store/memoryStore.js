class MemoryStore {
    constructor(){
        this.rooms = {}
    }

    removeUserFromRoom(room, user){
        if (this.rooms[room] !== undefined){
            const userIndex = this.rooms[room].users.findIndex((existingUser) => {
                return existingUser.username === user
            })
            if (userIndex !== -1){
                this.rooms[room].users.splice(userIndex, 1)
            }
        }
    }

    removeClientFromRoom(room, clientId){
        if (this.rooms[room] !== undefined){
            const userIndex = this.rooms[room].users.findIndex((existingUser) => {
                return existingUser.clientId === clientId
            })
            if (userIndex !== -1){
                this.rooms[room].users.splice(userIndex, 1)
            }
        }
    }

    addUserToRoom(room ,clientId, username){
        if (this.rooms[room] !== undefined){
            const clientIndex = this.rooms[room].users.findIndex((user) => {
                return user.clientId === clientId
              })
        
              if (clientIndex === -1) {
                //Add the client to the room requested
                this.rooms[room].users.push({ username, clientId })
              }
        
        }
    }

    doesRoomExist(room){
        return  this.rooms[room] !== undefined
    }

    getCurrentUsers(room){
        return this.rooms[room].users
    }
}


module.exports = {MemoryStore}