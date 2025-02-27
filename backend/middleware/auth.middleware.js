const jwt = require('jsonwebtoken');
const User = require('../models/User.model'); // Replace with your actual User model

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await User.findById(decoded.id); // Fetch user from the database

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
