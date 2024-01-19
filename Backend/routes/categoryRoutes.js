import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listofCategories,
  readCategory,
} from "../controllers/categoryControllers.js";

import { authenticateUser, authAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticateUser, authAdmin, createCategory);
router.route("/:categoryId").put(authenticateUser, authAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticateUser, authAdmin, deleteCategory);
router.route("/categories").get(listofCategories);
router.route("/:id").get(readCategory);

export default router;
