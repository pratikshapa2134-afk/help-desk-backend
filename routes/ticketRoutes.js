const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create Ticket
router.post('/', async (req, res) => {
  const ticket = await Ticket.create(req.body)
  res.status(201).json(ticket)
})

// Get All Tickets
router.get('/', async (req, res) => {
  const tickets = await Ticket.find().populate('customer assignedAgent')
  res.json(tickets)
})

module.exports = router;