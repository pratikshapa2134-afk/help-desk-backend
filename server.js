const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Help Desk Backend is running successfully!" });
});

// Direct Inline Dashboard Route (To bypass the file error completely)
const auth = require('./middleware/auth');
app.get('/api/dashboard', auth, (req, res) => {
  res.status(200).json({ success: true, message: "Dashboard works perfectly!" });
});

// Other Routes
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/conversations', conversationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});