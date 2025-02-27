const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Profile route
router.get('/profile', authMiddleware, (req, res) => {
    const user = req.user; // User info attached by authMiddleware
    res.json({ user: { id: user.id, displayName: user.displayName, email: user.email } });
});

module.exports = router;
