import express from 'express'
import { register , login, logout, allUsers, getProfile } from '../controllers/authController.js'
import { adminRoute, protectRoute } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/all",protectRoute,adminRoute,allUsers)
router.get("/profile",protectRoute,getProfile)



export default router