const TicketReply = require('../models/TicketReply');
const Ticket = require('../models/Ticket');

// Add Reply or Internal Note to a Ticket
const addReply = async (req, res) => {
  try {
    const { message, isInternalNote } = req.body;
    const ticketId = req.params.id;

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Customers cannot create internal notes
    let internalNoteValue = false;
    if (req.user.role === 'Super Admin' || req.user.role === 'Support Agent') {
      internalNoteValue = isInternalNote || false;
    }

    const reply = await TicketReply.create({
      ticket: ticketId,
      sender: req.user._id,
      message,
      isInternalNote: internalNoteValue
    });

    const populatedReply = await reply.populate('sender', 'name email role');
    res.status(201).json(populatedReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Replies for a Specific Ticket
const getTicketReplies = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Filter out internal notes if the user is a Customer
    let query = { ticket: ticketId };
    if (req.user.role === 'Customer') {
      query.isInternalNote = false;
    }

    const replies = await TicketReply.find(query).populate('sender', 'name email role').sort({ createdAt: 1 });
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReply, getTicketReplies };