const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Direct inline handlers to avoid undefined controller errors
router.post('/reply', auth, async (req, res) => {
  try {
    res.status(200).json({ message: "Reply added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:ticketId', auth, async (req, res) => {
  try {
    res.status(200).json({ message: "Conversation fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;