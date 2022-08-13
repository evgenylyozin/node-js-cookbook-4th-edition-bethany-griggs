import express from 'express'
import path from 'path'
import indexRouter from './expressIndexRouter'
import logger from './expressMiddleware'

const PORT = process.env.PORT || 3000

const app = express()

app.set('views', path.resolve(process.cwd(), 'web-frameworks/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.resolve(process.cwd(), 'web-frameworks/public')))

app.use(logger)

app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log('Экспресс сервер готов и слушает на порту ', PORT)
})
