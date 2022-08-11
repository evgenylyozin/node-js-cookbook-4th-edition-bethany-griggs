import fs from 'fs/promises'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'test.txt')

fs.writeFile(filePath, 'привет, неблокирующий код')
  .then(() => {
    console.log('Записали файл в асинхронном режиме')
    return fs.readFile(filePath)
  })
  .then((data) => {
    console.log('Данные, записанные в файл: ', data.toString())
  })
  .then(() => {
    return fs.rm(filePath)
  })
  .then(() => {
    console.log('Файл удалён в асинхронном режиме')
  })
  .catch((reason) => {
    console.error(`Что-то пошло не так, причина отказа: `, reason)
  })
  .finally(() => {
    console.info('Это блок finally')
  })
