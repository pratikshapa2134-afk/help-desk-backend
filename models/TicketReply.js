const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isInternalNote: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('TicketReply', replySchema);