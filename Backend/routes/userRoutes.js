import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateCurrentUser
} from "../controllers/userControllers.js";
import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticateUser, authAdmin, getAllUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(authenticateUser, getUserProfile).put(authenticateUser, updateCurrentUser);

export default router;
