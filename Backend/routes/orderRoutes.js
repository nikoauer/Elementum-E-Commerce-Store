import express from "express";
const router = express.Router();
import {authAdmin, authenticateUser} from '../middlewares/authMiddleware.js'
import {createOrder} from '../controllers/orderControllers.js'


router.route('/').post(authenticateUser, createOrder)

export default router