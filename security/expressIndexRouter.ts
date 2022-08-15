import express from 'express'
// Настроим роутер

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Экспресс с ejs',
  })
})

router.post('/', (req, res) => {
  console.log('Сервер получил пост запрос со следующими данными:', req.body)
  res.render('index', {
    title: 'Пост запрос на Экспресс с ejs',
  })
})

export default router
