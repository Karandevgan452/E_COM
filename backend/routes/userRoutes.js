import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { updateUserProfile } from "../controllers/userController.js";
import { ForgotPassWord, ResetPassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
// password reset routes
router.post("/forgot-password", ForgotPassWord);
router.put("/reset-password/:token", ResetPassword);

export default router;
