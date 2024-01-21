import express from "express";
const router = express.Router();
router.use(express.json());

import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import checkID from "../middlewares/checkId.js";

import {
  addProduct,
  updateProductDetails,
  deleteProduct,
  fetchProductById,
  getAllProducts,
  fetchallProducts,
  addReview,
  getTopProducts,
} from "../controllers/productController.js";

router
  .route("/")
  .post(authenticateUser, authAdmin, addProduct)
  .get(getAllProducts);

router.route('/allproducts').get(fetchallProducts)
router.route('/:id/reviews').post(authenticateUser, checkID, addReview)

router.get('/top', getTopProducts)

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticateUser, authAdmin, updateProductDetails)
  .delete(authenticateUser, authAdmin, deleteProduct);

export default router;
