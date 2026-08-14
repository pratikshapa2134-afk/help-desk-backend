const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes'); // Assuming you have this
const ticketRoutes = require('./routes/ticketRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Help Desk Backend is Running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});