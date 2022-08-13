import express from 'express'
// Настроим роутер

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Экспресс с ejs',
  })
})

export default router
