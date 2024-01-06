import User from '../models/userModels.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from "bcryptjs";
import createToken from '../utils/token.js'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Creates a new user
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

//Logins in an existing user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    let isValidPassword = false;

    if (existingUser) {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }

    if (isValidPassword) {
        createToken(res, existingUser._id);

        res.status(201).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        });

        return;
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

//Logouts out the current user
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Successfully logged out"})

})

//Get all users
const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.json(users)
})

//Get current user profile
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error ("User not found")
    }
})

export { createUser, loginUser, logoutUser, getAllUsers, getUserProfile }