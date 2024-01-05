import User from '../models/userModels.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from "bcryptjs";
import createToken from '../utils/token.js'

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
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({username, email, password: hashedPassword})

    try {
        await newUser.save()
        createToken(res, newUser._id);
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