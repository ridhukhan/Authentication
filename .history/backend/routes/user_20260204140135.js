import express from "express"
import { loginUser, myprofile, refreshToken, registerUser,verifyOtp,verifyUser } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router()
router.post("/register",registerUser)
router.post("/verify/:token", verifyUser);
router.post("/login",loginUser)
router.post("/verify",verifyOtp)
router.get("/me",isAuth,myprofile)
router.post("/refresh",refreshToken)
export default router;