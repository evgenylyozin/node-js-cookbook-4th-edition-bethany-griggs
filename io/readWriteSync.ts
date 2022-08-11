import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'test.txt')

fs.writeFileSync(filePath, 'привет, блокирующий код')

const contents = fs.readFileSync(filePath)

console.log(`Файл записан в синхронном режиме, его содержимое: ${contents}`)

fs.rmSync(filePath)

console.log(`Файл удалён в синхронном режиме`)