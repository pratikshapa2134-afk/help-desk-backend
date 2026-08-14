const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create Ticket (Customer)
router.post('/create', async (req, res) => {
  try {
    const { subject, description, category, priority, customer } = req.body;
    const newTicket = new Ticket({
      subject,
      description,
      category,
      priority: priority || 'Medium',
      customer
    });
    await newTicket.save();
    res.status(201).json({ success: true, message: "Ticket created successfully!", ticket: newTicket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get All Tickets (For Admin / Agent / Customer filter)
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customer', 'name email').populate('assignedAgent', 'name email');
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Assign Ticket (Admin)
router.put('/assign/:id', async (req, res) => {
  try {
    const { agentId } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id, 
      { assignedAgent: agentId, status: 'Assigned' }, 
      { new: true }
    );
    res.status(200).json({ success: true, ticket: updatedTicket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Reply / Conversation Inside Ticket
router.post('/reply/:id', async (req, res) => {
  try {
    const { sender, message } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.conversations.push({ sender, message });
    await ticket.save();
    res.status(200).json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;