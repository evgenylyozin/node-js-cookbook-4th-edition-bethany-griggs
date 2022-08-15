import express from 'express'
import path from 'path'
import indexRouter from './expressIndexRouter'
import authRouter from './expressAuthRouter'
import logger from './expressMiddleware'
import bodyParser from 'body-parser'
import session from 'express-session'

const PORT = process.env.PORT || 3333

const app = express()

app.set('views', path.resolve(process.cwd(), 'security/views'))
app.set('view engine', 'ejs')

app.use(
  session({
    name: 'SESSIONID',
    secret: 'Node Cookbook',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.static(path.resolve(process.cwd(), 'security/public')))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(logger)

app.use('/auth', authRouter)
app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log('Экспресс сервер готов и слушает на порту ', PORT)
})
