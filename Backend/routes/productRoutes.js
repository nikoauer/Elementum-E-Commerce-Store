import express from "express";
const router = express.Router();
router.use(express.json());

import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkId.js";

import {
  addProduct,
  updateProductDetails,
  deleteProduct,
  getAllProducts
} from "../controllers/productController.js";

router.route("/").post(authenticateUser, authAdmin, addProduct).get(getAllProducts)

router.route("/:id").put(authenticateUser, authAdmin, updateProductDetails).delete(authenticateUser, authAdmin, deleteProduct)

export default router;
