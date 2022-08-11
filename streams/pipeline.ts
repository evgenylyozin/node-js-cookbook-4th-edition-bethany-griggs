import fs from 'fs'
import { Transform, pipeline } from 'stream'

const rs = fs.createReadStream('/dev/random', { encoding: 'base64' })

const Upper = new Transform({
  transform(chunk, encoding, callback) {
    const processedData = chunk.toString().toUpperCase()
    callback(null, processedData)
  },
})

pipeline(rs, Upper, process.stdout, (err) => {
  if (err) {
    console.log('pipeline failed')
  }
})
