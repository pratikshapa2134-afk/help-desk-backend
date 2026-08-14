const express = require('express');
const router = express.Router();

// Route for creating a ticket (Matches frontend /api/tickets/create)
router.post('/create', (req, res) => {
  res.status(200).json({ success: true, message: "Ticket created successfully!" });
});

// General post route
router.post('/', (req, res) => {
  res.status(200).json({ success: true, message: "Ticket post route working!" });
});

// Get all tickets route
router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Get all tickets working!" });
});

module.exports = router;