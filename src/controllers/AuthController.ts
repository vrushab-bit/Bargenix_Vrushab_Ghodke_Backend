import { Request, Response } from 'express'
import { signupSchema } from '../schemas/signupSchema'
import { ValidationError } from 'yup'
import bcrypt from 'bcrypt'
import prisma from '../services/db'
import { loginSchema } from '../schemas/loginSchema'
import jwt from 'jsonwebtoken'

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = await signupSchema.validate(req.body)
    const { name, email, password } = validatedData

    const passwordHash = await bcrypt.hash(password, 10)

    const result = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: passwordHash
      }
    })

    if (!result) {
      res.status(500).json({ error: 'Registration failed' })
      return
    }

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Registration failed' })
    return
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = await loginSchema.validate(req.body)
    const { email, password } = validatedData

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: 'JWT secret is not defined' })
      return
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(200).json({
      message: 'Login successful',
      data: {
        email: user.email,
        name: user.name,
        token
      }
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Registration failed' })
    return
  }
}
