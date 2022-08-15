import { Router } from 'express'
const router = Router()

declare module 'express-session' {
  interface SessionData {
    user: { name: any } | null
  }
}

router.get('/login', (req, res, next) => {
  res.render('login', { fail: false })
  next()
})

router.post('/login', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/')
    next()
    return
  }

  if (req.body.username === 'Евгений' && req.body.password === '12345') {
    req.session.user = { name: req.body.username }
    res.redirect('/')
    next()
    return
  }
  res.render('login', { fail: true })
  next()
})

router.get('/logout', (req, res, next) => {
  req.session.user = null

  res.redirect('/')
})

export default router
