const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // cors add
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: 'https://help-desk-frontend-11.vercel.app' // Fakt tujha frontend
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connect
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Help Desk Backend is running successfully!" });
});

// Direct Dashboard Route
app.get('/api/dashboard', (req, res) => {
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