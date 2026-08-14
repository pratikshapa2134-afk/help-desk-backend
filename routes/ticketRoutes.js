const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create Ticket (Customer)
router.post('/create', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully', newTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Tickets (Admin / Agent / Customer specific)
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customer assignedAgent', 'name email role');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign Ticket & Change Priority/Status (Admin)
router.put('/:id/update', async (req, res) => {
  try {
    const { assignedAgent, priority, status } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedAgent, priority, status },
      { new: true }
    );
    res.json({ message: 'Ticket updated successfully', updatedTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reply / Conversation Inside Ticket
router.post('/:id/reply', async (req, res) => {
  try {
    const { sender, message } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    ticket.conversation.push({ sender, message });
    await ticket.save();
    res.json({ message: 'Reply added successfully', ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard Analytics Counters (Admin / Agent / Customer)
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