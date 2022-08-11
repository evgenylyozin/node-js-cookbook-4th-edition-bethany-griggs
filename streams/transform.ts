import fs from 'fs'
import { Transform } from 'stream'

const rs = fs.createReadStream('/dev/random', { encoding: 'base64' })

const Upper = new Transform({
  transform(chunk, encoding, callback) {
    const processedData = chunk.toString().toUpperCase()
    callback(null, processedData)
  },
})
rs.pipe(Upper).pipe(process.stdout)
