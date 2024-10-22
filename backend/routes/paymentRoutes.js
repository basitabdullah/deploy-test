import {Router} from "express"
import { checkoutSuccess, createCheckoutSession } from "../controllers/paymentController.js"
 import {protectRoute} from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/create/checkout/session",protectRoute,createCheckoutSession)
router.post("/checkout-success", protectRoute, checkoutSuccess);

export default router