import net from 'net'

const HOSTNAME = 'localhost'
const PORT = 3000

const socket = net.connect(PORT, HOSTNAME)

socket.write('Привет серверу от клиента')
socket.on('data', (data) => {
  console.log(`Клиент получил данные с сервера: ${data.toString()}`)
})
