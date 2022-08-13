import path from 'path'
import fastify from 'fastify'

const app = fastify()
const PORT = Number(process.env.PORT) || 3000

app.get('/', async (request, reply) => {
  return {
    message: 'Привет от фастифая',
  }
})

const startServer = async () => {
  try {
    await app.listen({
      port: PORT,
    })
    console.log(`Фастифай готов и слушает на порту 3000`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
