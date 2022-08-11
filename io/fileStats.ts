import fs from 'fs'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'file.txt')

const writeStream = fs.createWriteStream(filePath)

const writeLargeFile = (
  numOfBytes: number,
  ws: fs.WriteStream,
  path: string
) => {
  if (numOfBytes < 20) {
    ws.end('', () => {
      console.log('Файл успешно записан')
      const fileData = fs.statSync(path)

      console.log('Информация о записанном файле:\n', fileData)

      fs.rmSync(path)

      console.log('Файл удалён')
    })
    return
  }
  const written = ws.write('Lorem ipsum dolores\n')
  if (!written) {
    ws.once('drain', () => {
      writeLargeFile(numOfBytes - 20, ws, path)
    })
  } else {
    writeLargeFile(numOfBytes - 20, ws, path)
  }
}

writeLargeFile(2000000000, writeStream, filePath)
