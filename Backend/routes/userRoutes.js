import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateCurrentUser
} from "../controllers/userControllers.js";
import { getAllUsers, deleteUserById } from "../controllers/adminControllers.js";
import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

//User routes
router
  .route("/")
  .post(createUser)
  .get(authenticateUser, authAdmin, getAllUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(authenticateUser, getUserProfile).put(authenticateUser, updateCurrentUser);

//Admin Routes
router.route('/:id').delete(authenticateUser, authAdmin, deleteUserById)

export default router;
