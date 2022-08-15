import express from 'express'
// Настроим роутер

const router = express.Router()


  router.get('/', (req, res) => {
    const user = req.session.user
    res.render('index', { user })
  })

router.post('/', (req, res) => {
  console.log('Сервер получил пост запрос со следующими данными:', req.body)
  res.render('index', {
    title: 'Пост запрос на Экспресс с ejs',
  })
})

export default router
