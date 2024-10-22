import express from "express"
import { getCoupon, validateCoupon } from "../controllers/couponController.js"
import { protectRoute } from "../middlewares/authMiddleware.js"


const router =  express.Router()



router.get("/",protectRoute , getCoupon)
router.post("/validate",protectRoute , validateCoupon)



export default router