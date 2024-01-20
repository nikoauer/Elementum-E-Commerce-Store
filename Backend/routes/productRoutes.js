import express from "express";
const router = express.Router();
router.use(express.json());

import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkId.js";

import {
    addProduct,
    updateProductDetails
} from "../controllers/productController.js"

router.route('/').post(authenticateUser, authAdmin, addProduct);

router.route('/:id').put(authenticateUser, authAdmin, updateProductDetails)

export default router;