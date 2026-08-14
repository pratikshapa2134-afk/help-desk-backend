const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simple safe route
router.get('/', auth, (req, res) => {
  res.status(200).json({ message: "Dashboard works!" });
});

module.exports = router;