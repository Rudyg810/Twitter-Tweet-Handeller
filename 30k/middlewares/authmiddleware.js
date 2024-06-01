const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

const middlewares = {};

// Middleware to extract user ID from JWT token
middlewares.extractUserId = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decodedToken = jwt.verify(token, 'HGFHGEAD1212432432');
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// Middleware to require user authentication
middlewares.requireSignin = async (req, res, next) => {
    try {
        const { authorization: token } = req.headers;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, 'HGFHGEAD1212432432');
        req.user = decoded;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// Middleware to check if user is an admin
middlewares.admincheck = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user || user.role !== 1) {
            return res.status(403).json({ success: false, message: "Forbidden: Admin authentication failed" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// Middleware to require user address
middlewares.addressRequired = (req, res, next) => {
    if (!req.user || !req.user.address) {
        return res.status(400).json({ success: false, message: "Address is required" });
    }
    next();
};

module.exports = middlewares;
