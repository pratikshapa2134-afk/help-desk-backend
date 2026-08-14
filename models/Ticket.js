const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Ticket ID sathi

const ticketSchema = new mongoose.Schema({
  ticketId: { 
    type: String, 
    default: () => `TKT-${uuidv4().split('-')[0].toUpperCase()}`, // Auto Generated
    unique: true 
  },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // IT, HR, Finance etc
  
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], // Screenshot nusar
    default: 'Medium' 
  },
  
  status: { 
    type: String, 
    enum: ['Open', 'Assigned', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed'], // Screenshot nusar
    default: 'Open' 
  },
  
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  
}, { timestamps: true }); // CreatedDate + UpdatedDate auto

module.exports = mongoose.model('Ticket', ticketSchema);