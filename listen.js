const createExpressApp = require('./app')
const createSocketServer = require('./socketServer')
const { MemoryStore } = require('./store/memoryStore')
const store = new MemoryStore()
const { PORT = 9090 } = process.env

const app = createExpressApp(store)
const socketServer = createSocketServer(app, store)
const listenCallback = () => {
  console.log(`Listening on port: ${PORT}`)
}

socketServer.listen(PORT, listenCallback)
