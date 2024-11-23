const express = require('express');
const router = express.Router();
const db = require('../../server/db');
const authenticateToken = require('../../middleware/authenticateToken');
// Endpoint to create a new club
router.post('/create', authenticateToken, (req, res) => {
    console.log('POST /create endpoint hit', req.body);
    console.log('User ID from token:', req.userId); // Check if userId is present
    const { name, description } = req.body;
    const created_by = req.userId;
    console.log('Received data:', { name, description, created_by });

    const query = 'INSERT INTO clubs (name, description, created_by) VALUES (?, ?, ?)';
    db.query(query, [name, description, created_by], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database insertion error' });
        }
        res.status(201).json({ message: 'Club created successfully', clubId: result.insertId });
    });
});


// Endpoint to get clubs with creator details
router.get('/details/:clubId', (req, res) => {
    const clubId = req.params.clubId;
    const query = `
        SELECT clubs.name AS club_name, clubs.description, users.username AS created_by
        FROM clubs
        JOIN users ON clubs.created_by = users.id
        WHERE clubs.id = ?
    `;
    db.query(query, [clubId], (err, results) => {
        if (err) {
            console.error('Error fetching club details:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Endpoint to get clubs created by a user
router.get('/created/:userId', authenticateToken, (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM clubs WHERE created_by = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching created clubs:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


module.exports = router;
