import express from "express";
const router = express.Router();
import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders, getUserOrder } from "../controllers/orderControllers.js";

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authAdmin, getAllOrders);

router.route('/mine').get(authenticateUser, getUserOrder)

export default router;
