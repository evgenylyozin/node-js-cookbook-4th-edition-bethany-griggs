import express from 'express'
import path from 'path'
import indexRouter from './expressIndexRouter'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.resolve(process.cwd(), 'web-frameworks/public')))
app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log('Экспресс сервер готов и слушает на порту ', PORT)
})
