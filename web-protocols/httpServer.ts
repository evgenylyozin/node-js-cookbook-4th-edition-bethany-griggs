import http, { ClientRequest } from 'http'
import fs from 'fs'
import path from 'path'

const form = fs.readFileSync(
  path.join(process.cwd(), '/web-protocols/form.html')
)

const HOSTNAME = process.env.HOSTNAME || 'localhost'

const PORT = Number(process.env.PORT) || 3000

http
  .createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    // if (req.method !== 'GET') {
    //   return error(res, 405)
    // }
    if (req.url === '/todo') {
      return todo(res)
    }
    if (req.url === '/form' && req.method === 'GET') {
      return formHandler(res)
    }
    if (req.url === '/form' && req.method === 'POST') {
      return formPostHandler(req, res)
    }
    if (req.url === '/') {
      return index(res)
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

const todo = (res: http.ServerResponse) => {
  return res.end('[{id:1,desc:"таск 1"}]')
}
const formHandler = (res: http.ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  return res.end(form)
}
const formPostHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  if (req.headers['content-type'] !== 'multipart/form-data') {
    error(res, 415)
  }
  let input = ''
  req.on('data', (chunk) => {
    input += chunk.toString()
  })
  req.on('end', () => {
    console.log('Получили с клиента данные: ', input)
    res.end(http.STATUS_CODES[200])
  })
}
const index = (res: http.ServerResponse) => {
  return res.end('{name:"todo сервер"}')
}
