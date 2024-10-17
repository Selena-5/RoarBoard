const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ test: "This is a test"});
})

module.exports = router;