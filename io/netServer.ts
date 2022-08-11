import net from 'net'

const HOSTNAME = 'localhost'
const PORT = 3000

net
  .createServer((socket) => {
    console.log('Клиент законнектился')
    socket.on('data', (data) => {
      console.log(`Сервер получил данные с клиента: ${data.toString()}`)
      socket.write(`Привет клиенту от сервера`)
    })
  })
  .listen(PORT, HOSTNAME)
