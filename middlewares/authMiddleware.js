const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    // Get the token from the headers (usually stored in the 'Authorization' header)
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // The token is usually in the format "Bearer <token>"
        const token = authHeader.split(' ')[1];

        // Verify the token using the secret key
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            // Attach the user payload to the request object
            req.user = user;
            next();  // Continue to the next middleware/route handler
        });
    } else {
        res.status(401).json({ message: 'Authorization token not provided' });
    }
};

// Admin role authorization middleware (to ensure user is admin)
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();  // Proceed if user is admin
    } else {
        res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
};

module.exports = { authenticateJWT, adminOnly };
