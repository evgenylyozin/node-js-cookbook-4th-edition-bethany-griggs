import fs from 'fs'
import { Transform } from 'stream'

const rs = fs.createReadStream('/dev/random')

const Decoder = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  },
})
rs.pipe(Decoder).pipe(process.stdout)
