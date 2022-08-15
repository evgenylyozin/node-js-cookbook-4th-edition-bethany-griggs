import { NextFunction, Request, Response } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Запрос получен:', req.method, req.url)
  next()
}

export default logger
