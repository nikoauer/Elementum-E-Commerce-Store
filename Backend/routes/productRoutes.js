import express from "express";
const router = express.Router();
import formidable from 'express-formidable'

import { authAdmin, authenticateUser } from "../middlewares/authMiddleware";
import checkID from "../middlewares/checkId";


export default router;