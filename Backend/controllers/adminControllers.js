import User from '../models/userModels.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from "bcryptjs";
import createToken from '../utils/token.js'

//Get all users if Admin
const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.json(users)
})

//Delete a user by a specific ID
const deleteUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error('Cannot delete this user as they are an Administrator')
        }
        await User.deleteOne({_id: user._id})
        res.json({ message: "This user has been deleted"})
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export { getAllUsers, deleteUserById }