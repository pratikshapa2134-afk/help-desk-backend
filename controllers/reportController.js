const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Get Dashboard & Report Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments({});
    const openTickets = await Ticket.countDocuments({ status: 'Open' });
    const inProgressTickets = await Ticket.countDocuments({ status: 'In Progress' });
    const resolvedTickets = await Ticket.countDocuments({ status: 'Resolved' });
    const closedTickets = await Ticket.countDocuments({ status: 'Closed' });
    const criticalTickets = await Ticket.countDocuments({ priority: 'Critical' });
    
    const totalCustomers = await User.countDocuments({ role: 'Customer' });
    const totalAgents = await User.countDocuments({ role: 'Support Agent' });

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      criticalTickets,
      totalCustomers,
      totalAgents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };