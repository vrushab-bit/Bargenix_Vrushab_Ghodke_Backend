import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface CustomRequest extends Request {
  id?: string
}

interface DecodedToken {
  id: string
}
const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      res.status(401).send({ error: 'Authentication failed.' })
      return
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).send({ error: 'Internal server error.' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
    req.id = decoded.id

    next()
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed.' })
  }
}

export default auth
