import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'file.txt')

const writeStream = fs.createWriteStream(filePath)

const writeLargeFile = (
  numOfBytes: number,
  ws: fs.WriteStream,
  path: string,
  onFullyWrittenCallback: any
) => {
  if (numOfBytes < 20) {
    ws.end('', () => {
      console.log('Файл успешно записан')
      console.log('Начинаем читать данные')
      setTimeout(() => {
        onFullyWrittenCallback(path)
      }, 5000)
    })
    return true
  }
  const written = ws.write('Lorem ipsum dolores\n')
  if (!written) {
    ws.once('drain', () => {
      writeLargeFile(numOfBytes - 20, ws, path, onFullyWrittenCallback)
    })
  } else {
    writeLargeFile(numOfBytes - 20, ws, path, onFullyWrittenCallback)
  }
}

const readBigFileCallback = async (path: string) => {
  // Прочитаем огромный файл
  const readStream = fs.createReadStream(path, {
    highWaterMark: 20,
  })

  let counter = 1
  for await (const chunk of readStream) {
    // Репортим в консоль только каждый 500 000-й кусочек данных
    // данные идут по 20 байт, то есть репорт ~ каждые 10 мегабайт
    counter++
    if (counter % 500000 === 0) {
      console.log(`Кусочек данных: ${chunk.toString()}`)
      console.log(
        `Текущий процесс занимает`,
        Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        'MB'
      )
    }
  }

  console.log('Весь файл прочитан!')
  console.log(
    `Всего данных прочитано: ${Math.round((counter * 20) / 1024 / 1024)}MB`
  )
  console.log('Пытаемся удалить файл')
  fs.rmSync(path)

  console.log('Файл удалён')
}

// Запишем файл размером ~200mb
writeLargeFile(200000000, writeStream, filePath, readBigFileCallback)
