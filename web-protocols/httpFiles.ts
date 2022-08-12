import http from 'http'
import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

const form = fs.readFileSync(
  path.join(process.cwd(), '/web-protocols/fileForm.html')
)

const HOSTNAME = process.env.HOSTNAME || 'localhost'

const PORT = Number(process.env.PORT) || 3000

http
  .createServer((req, res) => {
    if (req.url === '/form' && req.method === 'GET') {
      return formHandler(res)
    }
    if (req.url === '/form' && req.method === 'POST') {
      return formPostHandler(req, res)
    }
    return error(res, 404)
  })
  .listen(PORT, HOSTNAME, undefined, () => {
    console.log(
      'Сервер запущен и ожидает запросов по адресу ',
      HOSTNAME + ':' + PORT
    )
  })

// Хендлеры
const error = (res: http.ServerResponse, code: number) => {
  res.statusCode = code
  return res.end(`
  {
    "error":"${http.STATUS_CODES[code]}"
  }`)
}
const formHandler = (res: http.ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  return res.end(form)
}
const formPostHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const formData = formidable({
    multiples: true,
    uploadDir: './uploads',
  })
  formData.parse(req, (err, fields, files) => {
    console.log(fields, files)
    if (err) {
      return err
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    return res.end(JSON.stringify({ fields, files }))
  })
}
