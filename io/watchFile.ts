import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'test.txt')
fs.writeFileSync(filePath, 'Начальные данные')
fs.watchFile(filePath, (curr) => {
  console.info('Файл изменён.')
  console.info(`Текущий размер файла: ${curr.size}`)
})
process.on('SIGINT', () => {
  console.log('Удаляю тестовый файл.')
  fs.rmSync(filePath)
  console.log('Файл удалён.')
  process.exit(0)
})
