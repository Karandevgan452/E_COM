import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// Create new order
router.route("/").post(protect, addOrderItems);

// Get logged-in user's orders
router.route("/myorders").get(protect, getMyOrders);

// Get order by ID
router.route("/:id").get(protect, getOrderById);

// Update order to paid
router.route("/:id/pay").put(protect, updateOrderToPaid);

// Update order to delivered (admin only)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

// Get all orders (admin only)
router.route("/").get(protect, admin, getAllOrders);

export default router;
