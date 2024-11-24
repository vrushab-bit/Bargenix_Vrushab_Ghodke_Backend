import { object, string } from 'yup'

export const signupSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required()
})
