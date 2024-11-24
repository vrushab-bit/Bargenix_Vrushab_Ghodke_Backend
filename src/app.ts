import express, { urlencoded, json, Request, Response } from 'express'
import AuthRoutes from './routes/AuthRoutes'
import CouponRoutes from './routes/CouponRoutes'
import { limiter } from './services/rateLimit'

export default function createServer() {
  const app = express()
  app.use(limiter)
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use('/api/auth', AuthRoutes)
  app.use('/api/coupon', CouponRoutes)

  app.get('/health', async (req: Request, res: Response) => {
    const healthStatus = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }
    res.status(200).send(healthStatus)
  })

  return app
}
