import Hapi from '@hapi/hapi'

const PORT = Number(process.env.PORT) || 3000

const HOSTNAME = process.env.HOSTNAME || 'localhost'

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOSTNAME,
  })
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Привет от Хапи'
    },
  })
  await server.start()
  console.log('Хапи готов:', server.info.uri)
}

init()
