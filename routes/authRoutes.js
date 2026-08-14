const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ msg: 'Register route working' })
})

router.post('/login', (req, res) => {
  res.json({ msg: 'Login route working' })
})

module.exports = router;