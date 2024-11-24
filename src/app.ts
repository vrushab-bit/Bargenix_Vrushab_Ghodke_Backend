import express, { urlencoded, json, Request, Response } from 'express'

export default function createServer() {
  const app = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' })
  })

  return app
}
