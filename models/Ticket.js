const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  status: { type: String, enum: ['Open', 'Assigned', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed'], default: 'Open' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);