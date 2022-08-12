import ws from 'ws'

const socket = new ws('ws://localhost:3000')

socket.on('open', () => {
  console.log('Сокет законнектился к серверу')
  socket.send('Привет от клиента!')
})
socket.on('close', () => {
  console.log('Сокет отключен от сервера')
})
socket.on('message', (message) => {
  console.log(`Получены данные от сервера: ${message}`)
})
