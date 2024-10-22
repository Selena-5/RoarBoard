// ./server/routes/api/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../server/db'); // Import the database connection

const router = express.Router();
const secret = 'qt8UD81mYZ'; // Secret key for JWT Signing

// User Registration Endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // SQL query to insert user
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  connection.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
  });
});

// User Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // SQL query to find user by email
  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Creating JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username }, // Include username
      secret,
      { expiresIn: '1h' } // This is the time it takes for a cookie / token to expire
    );

    // Set JWT token in an HTTP-only cookie to avoid exploitation
    res.cookie('token', token, {
      httpOnly: true, // Prevents access to the cookie via JavaScript -> Attacks
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    // Login successful
    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

// Logout Endpoint (clears the cookie after logging out)
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logged out successfully' });
});

// Protected Route to verify JWT
router.get('/protected', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    // Respond with user information instead of just a message
    res.json({
      message: 'You are authorized!',
      user: {
        id: decoded.userId,  // Ensure keys match what was signed in the token ( secret i believe )
        email: decoded.email,
        username: decoded.username
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// Check JWT token for protected routes
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    req.user = jwt.verify(token, secret); // Attach decoded token directly to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protecting the 'Get All Users' route
router.get('/', verifyToken, (req, res) => {
  const query = 'SELECT id, username, email, created_at FROM users';

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

module.exports = router;
