const logger = async (ctx: any, next: any) => {
  console.log('Запрос получен:', ctx.req.method, ctx.req.url)
  await next()
}

export default logger
