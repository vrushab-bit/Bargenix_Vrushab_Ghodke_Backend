import express, { urlencoded, json, Request, Response } from 'express'
import AuthRoutes from './routes/AuthRoutes'
import CouponRoutes from './routes/CouponRoutes'

export default function createServer() {
  const app = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use('/api/auth', AuthRoutes)
  app.use('/api/coupon', CouponRoutes)

  app.get('/health', async (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' })
  })

  return app
}
