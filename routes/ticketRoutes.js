const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create Ticket
router.post('/create', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully', newTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customer assignedAgent', 'name email role');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard Analytics Counters
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: 'Open' });
    const inProgress = await Ticket.countDocuments({ status: 'In Progress' });
    const resolved = await Ticket.countDocuments({ status: 'Resolved' });
    const closed = await Ticket.countDocuments({ status: 'Closed' });
    const critical = await Ticket.countDocuments({ priority: 'Critical' });

    res.json({
      totalTickets,
      openTickets,
      inProgress,
      resolved,
      closed,
      critical
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;