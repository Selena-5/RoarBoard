const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Access the token from cookies
    if (!token) {
        console.log("No token found."); // Log if no token is present
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, 'qt8UD81mYZ', (err, user) => { // Use the correct secret key
        if (err) {
            console.log("Token verification failed:", err); // Log any verification errors
            return res.sendStatus(403); // Invalid token
        }
        req.userId = user.userId; // Set user ID from token
        next(); // Proceed to the next middleware or route handler
    });
}
module.exports = authenticateToken;
