import fs from 'fs'
import { Transform } from 'stream'

const rs = fs.createReadStream('/dev/random', { encoding: 'base64' })

const Upper = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  },
})
rs.pipe(Upper).pipe(process.stdout)
