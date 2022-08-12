const app = require('../app')
const io = require('socket.io-client')

/**
 * Allows you to poll the socket connection to get confirmation when
 * client is connected/disconnected.
 * @param {*} socket - Client Socket you want to poll
 * @param {*} connected - Boolean to check whether connected/disconected
 * @param {*} state - Number of attempts before timeout error
 * @returns Resolves once state matches the required state.
 */
const checkClientConnectionToSocket = (socket, connected, attempts) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (socket.connected === connected && connected !== undefined) {
        resolve()
      } else if (attempts === 0) {
        socket.disconnect()
        reject(new Error('Timeout'))
      } else {
        checkClientConnectionToSocket(socket, connected, attempts--)
          .then(resolve)
          .catch(reject)
      }
    }, 5)
  })
}

/**
 * Creates a new client socket and waits until connection confirmation
 * before returning the client and the message.
 * @returns - An object containing the socket.io client and the connection message.
 */
async function createClient() {
  const clientSocket = new io('http://localhost:3001')
  let connectionMessage = ''
  clientSocket.on('connected', (message) => {
    connectionMessage = message
  })
  await checkClientConnectionToSocket(clientSocket, true, 3)
  return { clientSocket, connectionMessage }
}

describe('Socket.io', () => {
  beforeEach(() => {
    app.listen(3001)
  })
  afterEach(() => {
    app.close()
  })

  it('Should send a success message when connected to the socket', async () => {
    let client
    try {
      client = await createClient()
      client.clientSocket.disconnect()
      await checkClientConnectionToSocket(client.clientSocket, false, 3)
      return expect(client.connectionMessage).toBe('Success')
    } catch (error) {
      return expect(client.connectionMessage).toBe('Success')
    }
  })
})
