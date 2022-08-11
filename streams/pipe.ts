import fs from 'fs'

const rs = fs.createReadStream('/dev/random')

rs.pipe(process.stdout)
