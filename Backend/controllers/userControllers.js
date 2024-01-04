import User from '../models/userModels.js'
import asyncHandler from '../middlewares/asyncHandler.js';

const createUser = asyncHandler(async (req, res) => {
    res.send("Hello World")
})

export { createUser }