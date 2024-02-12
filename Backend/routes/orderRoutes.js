import express from "express";
const router = express.Router();
import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import { createOrder, markOrderAsPaid, markOrderAsDelivered, getAllOrders, getUserOrder, countTotalOrders, calculateTotalSalesByDate, findOrderById, calculateTotalSales } from "../controllers/orderControllers.js";

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authAdmin, getAllOrders);

router.route('/mine').get(authenticateUser, getUserOrder)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(calculateTotalSales)
router.route('/total-sales-by-date').get(calculateTotalSalesByDate)
router.route('/:id').get(authenticateUser, findOrderById)
router.route('/:id/pay').put(authenticateUser, markOrderAsPaid)
router.route('/:id/delivery').put(authenticateUser, authAdmin, markOrderAsDelivered)

export default router;
