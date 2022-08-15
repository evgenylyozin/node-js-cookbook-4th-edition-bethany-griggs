import express from 'express'
import path from 'path'
import indexRouter from './expressIndexRouter'
import logger from './expressMiddleware'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 3333

const app = express()

app.set('views', path.resolve(process.cwd(), 'web-frameworks/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.resolve(process.cwd(), 'web-frameworks/public')))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(logger)

app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log('Экспресс сервер готов и слушает на порту ', PORT)
})
