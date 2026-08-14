const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { 
    type: String, 
    unique: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
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
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedAgent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  conversation: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { 
  timestamps: true // हे स्वयंचलितपणे Created Date आणि Updated Date मॅनेज करते 
});

// Auto generate unique Ticket ID (e.g., TICK-1001)
ticketSchema.pre('save', async function(next) {
  if (!this.ticketId) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketId = `TICK-${1000 + count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);