const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Direct inline function to avoid undefined controller error
router.get('/', auth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Dashboard route working perfectly"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;