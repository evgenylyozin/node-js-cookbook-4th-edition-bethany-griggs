import { Readable } from 'stream'

async function* generator() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
}

const rs = Readable.from(generator())

rs.on('data', (data) => {
  console.log(data)
})

rs.once('end', () => {
  console.log('Стрим завершен')
})
