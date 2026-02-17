import express from "express"
import { adminController, frogotPassword, getAllUsers, getUserById, loginUser, logoutUser, myprofile, refreshCSRF, 
    refreshToken, registerUser,resetPassword,verifyOtp,verifyUser } from "../controllers/user.js";
import { authorizedAdmin, isAuth } from "../middlewares/isAuth.js";
import { verifyCSRFToken } from "../config/csrfMiddleware.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router()

router.post("/register", registerUser)
router.post("/verify/:token", verifyUser)
router.post("/login", loginUser)
router.post("/verify", verifyOtp)
router.post("/refresh", refreshToken)
router.post("/logout", isAuth, verifyCSRFToken, logoutUser)
router.post("/refresh-csrf", isAuth, refreshCSRF)
router.get("/me", isAuth, myprofile)
router.post("/forgot-password",frogotPassword)
router.post("/reset-password/:token",resetPassword)
router.get("/admin", isAuth, authorizedAdmin, adminController)
router.get("/users", isAuth, getAllUsers)
router.get("/profile/:id",isAuth,getUserById)
router.post("/send/:id", isAuth, sendMessage)

router.get("/:id", isAuth, getMessage)

export default router;