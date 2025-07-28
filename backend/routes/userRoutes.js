import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
