const Ticket = require('../models/Ticket');
const User = require('../models/User');

const getDashboardData = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalTickets,
      totalUsers,
      message: "Dashboard data fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getDashboardData };