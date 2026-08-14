const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// GET /api/tickets/stats - Dashboard sathi
router.get('/stats', async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const open = await Ticket.countDocuments({ status: 'Open' });
    const inProgress = await Ticket.countDocuments({ status: 'In Progress' });
    const critical = await Ticket.countDocuments({ priority: 'Critical' });
    const resolved = await Ticket.countDocuments({ status: 'Resolved' });
    
    res.json({ 
      success: true,
      total, 
      open, 
      inProgress, 
      critical, 
      resolved 
    });
  } catch(err) {
    res.status(500).json({ success: false, msg: err.message })
  }
});

// GET All Tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customer assignedAgent')
    res.json(tickets)
  } catch(err) {
    res.status(500).json({ msg: err.message })
  }
})

// POST Create Ticket
router.post('/', async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body)
    res.status(201).json(ticket)
  } catch(err) {
    res.status(400).json({ msg: err.message })
  }
})

module.exports = router;