import Router from 'koa-router'

const router = new Router()

router.get('/', async function (ctx) {
  const title = 'Koa.js'
  ctx.body = `

<html>
<head>
<title> ${title} </title>
<link rel="stylesheet" href="styles.css"></head>
<body>
<h1> ${title} </h1>
<p> Привет, ${title} </p>
</body>
</html>
`
})

export default router
