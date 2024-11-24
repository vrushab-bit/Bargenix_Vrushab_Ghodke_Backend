import { object, string, number } from 'yup'

export const generateCouponSchema = object({
  productId: string().required(),
  discountVal: number().required()
})
