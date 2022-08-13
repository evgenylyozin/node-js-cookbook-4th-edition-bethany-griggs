import express from 'express'
// Настроим роутер

const router = express.Router()

router.get('/', (req, res) => {
  const title = 'Экспресс'
  res.send(`
    <html>
      <head>
        <title> ${title} </title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <h1> ${title} </h1>
        <p> Добро пожаловать в ${title} </p>
      </body>
    </html>
`)
})

export default router