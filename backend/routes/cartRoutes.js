import express from "express"
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController.js"
import { protectRoute } from "../middlewares/authMiddleware.js"



const router = express.Router()


router.post("/",protectRoute,addToCart)
router.get("/",protectRoute,getCartProducts)
router.delete("/",protectRoute,removeAllFromCart)
router.put("/:id",protectRoute,updateQuantity)


export default router