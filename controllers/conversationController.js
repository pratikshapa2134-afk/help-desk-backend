const Conversation = require('../models/Conversation');

// Add a reply
exports.addReply = async (req, res) => {
  try {
    res.status(200).json({ message: "Reply added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get conversation
exports.getConversation = async (req, res) => {
  try {
    res.status(200).json({ message: "Conversation fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};