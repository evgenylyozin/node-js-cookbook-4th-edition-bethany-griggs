import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'test.txt')

fs.writeFile(filePath, 'привет, неблокирующий код', (err) => {
  if (err) {
    process.stderr.write(`${err.message}\n`)
  } else {
    process.stdout.write('Файл успешно записан в асинхронном режиме\n')
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        process.stderr.write(`${err.message}\n`)
      } else {
        process.stdout.write(`Контент файла: ${data.toString()}\n`)
        fs.rm(filePath, (err) => {
          if (err) {
            console.error(err.message)
          } else {
            console.log('Файл был удалён в асинхронном режиме')
          }
        })
      }
    })
  }
})
