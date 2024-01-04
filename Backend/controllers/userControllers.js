import User from '../models/userModels.js'
import asyncHandler from '../middlewares/asyncHandler.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        throw Error("Please fill in all the information")
    }

    if (!emailRegex.test(email)) {
        res.status(400).send("Invalid email format");
        return;
    }

    const existingUser = await User.findOne({email})
    if(existingUser) {
        res.status(400).send("User already exists with this email");
    }

    const newUser = new User({username, email, password})

    try {
        await newUser.save()
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    } catch (error) {
        res.status(400)
        throw new Error("user data not valid!")
    }
})

export { createUser }