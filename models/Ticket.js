const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], 
    default: 'Medium' 
  },
  status: { 
    type: String, 
    enum: ['Open', 'Assigned', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed'], 
    default: 'Open' 
  },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  conversations: [conversationSchema]
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);