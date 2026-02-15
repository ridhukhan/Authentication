import express from "express"
import { adminController, getAllUsers, getUserById, loginUser, logoutUser, myprofile, refreshCSRF, 
    refreshToken, registerUser,verifyOtp,verifyUser } from "../controllers/user.js";
import { authorizedAdmin, isAuth } from "../middlewares/isAuth.js";
import { verifyCSRFToken } from "../config/csrfMiddleware.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router()

// Auth routes
router.post("/register", registerUser)
router.post("/verify/:token", verifyUser)
router.post("/login", loginUser)
router.post("/verify", verifyOtp)
router.post("/refresh", refreshToken)
router.post("/logout", isAuth, verifyCSRFToken, logoutUser)
router.post("/refresh-csrf", isAuth, refreshCSRF)

// ✅ Specific routes FIRST (এগুলো আগে রাখতে হবে)
router.get("/me", isAuth, myprofile)
router.get("/admin", isAuth, authorizedAdmin, adminController)
router.get("/users", isAuth, getAllUsers)
router.get("/profile/:id",isAuth,getUserById)
// ✅ Message routes (specific path)
router.post("/send/:id", isAuth, sendMessage)

// ✅ Generic /:id route LAST এ রাখো (এটা সবার শেষে)
router.get("/:id", isAuth, getMessage)

export default router;