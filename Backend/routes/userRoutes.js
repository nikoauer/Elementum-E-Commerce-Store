import express from "express";
import {createUser, loginUser, logoutUser, getAllUsers} from "../controllers/userControllers.js";
import { authAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route('/').post(createUser).get(authenticateUser, authAdmin, getAllUsers)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

export default router;