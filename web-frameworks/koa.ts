import path from 'path'
import koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import index from './koaIndexRouter'
import views from 'koa-views'
import logger from './koaMiddleware'

const router = new Router()
const PORT = process.env.PORT || 3000

const app = new koa()

app.use(serve(path.resolve(process.cwd(), 'web-frameworks/public')))
app.use(
  views(path.resolve(process.cwd(), 'web-frameworks/views'), {
    extension: 'ejs',
  })
)
app.use(logger)

router.use('/', index.routes())
app.use(router.routes())
app.listen(PORT, () => {
  console.log('Коа сервер готов и слушает на порту ', PORT)
})
