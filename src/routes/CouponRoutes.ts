import { Router } from 'express'
import requireAuth from '../middleware/requireAuth'
import { generateCoupon, validateCoupon } from '../controllers/CouponController'

const CouponRoutes = Router()

CouponRoutes.post('/generate', requireAuth, generateCoupon)
CouponRoutes.post('/validate', requireAuth, validateCoupon)

export default CouponRoutes
