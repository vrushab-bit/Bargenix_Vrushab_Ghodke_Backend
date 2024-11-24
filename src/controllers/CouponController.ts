import { Response } from 'express'
import { CustomRequest } from '../middleware/requireAuth'
import prisma from '../services/db'
import { generateCouponSchema } from '../schemas/generateCouponSchema'
import { ValidationError } from 'yup'

export const generateCoupon = async (req: CustomRequest, res: Response) => {
  try {
    const validatedData = await generateCouponSchema.validate(req.body)
    const { productId, discountVal } = validatedData
    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' })
      return
    }

    const user = await prisma.user.findUnique({
      where: { id: req.id }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    const coupons = await prisma.coupon.findMany({
      where: {
        productId: product.id,
        userId: user.id,
        status: 'ACTIVE',
        expirationDate: { gt: new Date() } // Add condition to check if coupon is expired
      }
    })

    if (coupons.length > 0) {
      res.status(400).json({ message: 'Coupon already generated' })
      return
    }

    const coupon = await prisma.coupon.create({
      data: {
        productId: product.id,
        userId: user.id,
        discountValue: discountVal,
        expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        couponId: `COUPON-${Math.floor(10000000 + Math.random() * 9000)}`,
        status: 'ACTIVE'
      }
    })

    res.status(200).json({
      message: 'Coupon generated',
      data: {
        couponId: coupon.couponId
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

export const validateCoupon = async (req: CustomRequest, res: Response) => {
  try {
    const { couponId } = req.body
    if (!couponId) {
      res.status(400).json({ message: 'Coupon ID is required' })
      return
    }

    const coupon = await prisma.coupon.findUnique({
      where: { couponId }
    })

    if (!coupon) {
      res.status(404).json({ message: 'Coupon not found' })
      return
    }

    if (coupon.status === 'INACTIVE') {
      res.status(400).json({ message: 'Coupon is inactive' })
      return
    }

    if (coupon.expirationDate < new Date()) {
      res.status(400).json({ message: 'Coupon is expired' })
      return
    }

    if (coupon.userId !== req.id) {
      res.status(400).json({ message: 'Coupon does not belong to user' })
      return
    }

    res.status(200).json({
      message: 'Coupon is valid',
      data: {
        couponId: coupon.couponId,
        discountValue: coupon.discountValue,
        expirationDate: coupon.expirationDate,
        status: coupon.status,
        productId: coupon.productId
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' })
    return
  }
}
