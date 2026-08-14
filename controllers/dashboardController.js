const Ticket = require('../models/Ticket');

exports.getDashboardStats = async (req, res) => {
  try {
    const { role, id } = req.user;
    let stats = {};

    if (role === 'Admin') {
      stats = {
        totalTickets: await Ticket.countDocuments(),
        openTickets: await Ticket.countDocuments({ status: 'Open' }),
        inProgress: await Ticket.countDocuments({ status: 'In Progress' }),
        resolved: await Ticket.countDocuments({ status: 'Resolved' }),
        critical: await Ticket.countDocuments({ priority: 'Critical' })
      };
    } else if (role === 'Support Agent') {
      stats = {
        assignedTickets: await Ticket.countDocuments({ assignedAgent: id }),
        pendingTickets: await Ticket.countDocuments({ assignedAgent: id, status: { $ne: 'Resolved' } }),
        resolvedToday: await Ticket.countDocuments({ 
            assignedAgent: id, 
            status: 'Resolved',
            updatedAt: { $gte: new Date().setHours(0,0,0,0) } 
        })
      };
    } else { // Customer
      stats = {
        myTickets: await Ticket.countDocuments({ customer: id }),
        openTickets: await Ticket.countDocuments({ customer: id, status: 'Open' })
      };
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};