import express from "express";
const router = express.Router();
router.use(express.json());

import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkId.js";

import {
    addProduct
} from "../controllers/productController.js"

router.route('/').post(authenticateUser, authAdmin, addProduct);

export default router;