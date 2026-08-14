const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ msg: 'Ticket create route working' })
})

router.get('/', (req, res) => {
  res.json({ msg: 'Get all tickets working' })
})

module.exports = router;