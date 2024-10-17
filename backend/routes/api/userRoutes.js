// ./server/routes/api/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../../server/db'); // Import the database connection

const router = express.Router();

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

    // Login successful
    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

// Get All Users Endpoint
router.get('/', (req, res) => {
  const query = 'SELECT id, username, email, created_at FROM users';

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

module.exports = router;
