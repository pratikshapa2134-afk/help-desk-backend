const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignTicket = async (req, res) => {
  try {
    res.status(200).json({ message: "Assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};