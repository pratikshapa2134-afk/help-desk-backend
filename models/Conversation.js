const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  attachment: { type: String }, // URL for the screenshot/file
}, { timestamps: true }); // This automatically adds 'createdAt'

module.exports = mongoose.model('Conversation', conversationSchema);