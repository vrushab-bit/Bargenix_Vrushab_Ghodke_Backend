import express, { urlencoded, json, Request, Response } from 'express'
import AuthRoutes from './routes/AuthRoutes'

export default function createServer() {
  const app = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use('/api/auth', AuthRoutes)

  app.get('/health', async (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' })
  })

  return app
}
