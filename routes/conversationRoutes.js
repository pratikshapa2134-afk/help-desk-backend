const express = require('express');
const router = express.Router();

// Sadhya dummy routes
router.post('/', (req, res) => {
  res.json({ msg: 'Conversation create working' })
})

router.get('/:id', (req, res) => {
  res.json({ msg: 'Get conversation working' })
})

module.exports = router;