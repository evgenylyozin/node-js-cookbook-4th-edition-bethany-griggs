import ws from 'ws'

const server = new ws.Server({
  port: 3000,
})

server.on('listening', () => {
  console.log('Сервер готов и слушает на порту 3000')
})
server.on('connection', (socket) => {
  console.log('К серверу подключился клиент')
  socket.on('message', (message) => {
    const stringifiedMesage = message.toString()
    console.log(`Сервер получил сообщение: ${stringifiedMesage}`)
    if (stringifiedMesage === 'Привет от клиента!') {
      socket.send('Привет от сервера!')
    }
  })
})
