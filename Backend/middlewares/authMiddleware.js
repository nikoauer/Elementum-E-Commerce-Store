import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';
import asyncHandler from './asyncHandler.js';

const authenticateUser = asyncHandler (async (req, res, next) => {
    let token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            return next();
        } catch (error) {
            console.error("Authentication error:", error);
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ error: "Token expired. Please log in again." });
            } else if (error.name === "JsonWebTokenError") {
                res.status(401).json({ error: "Invalid token. Please log in again." });
            } else {
                res.status(401).json({ error: "Not authorized, token failed" });
            }
        }
    } else {
        res.status(401).json({ error: "Not authorized, there is no token" });
    }
})

const authAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("Does not have authorization as an admin")
    }
}

export { authenticateUser, authAdmin };