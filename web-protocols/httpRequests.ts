import http from 'http'

// GET Request
// http.get('http://example.com', (res) => {
//   res.pipe(process.stdout)
// })

// POST request
const payload = `{
  "key": "value",
  "key2": "value"
}`

const options = {
  method: 'POST',
  hostname: 'postman-echo.com',
  path: '/post',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
}

const req = http.request(options, (res) => {
  process.stdout.write('Статус код:' + res.statusCode + '\n')
  process.stdout.write('Весь ответ:\n')
  res.pipe(process.stdout)
})

try {
  req.end(payload)
} catch (e) {
  console.log(e)
}
