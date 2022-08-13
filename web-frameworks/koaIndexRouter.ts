import Router from 'koa-router'

const router = new Router()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'Koa.js',
  }
  await ctx.render('index')
})

export default router
