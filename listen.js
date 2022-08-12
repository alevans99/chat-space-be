const app = require('./app')
const { PORT = 9090 } = process.env

const listenCallback = () => {
  console.log(`Listening on port: ${PORT}`)
}

app.listen(PORT, listenCallback)
