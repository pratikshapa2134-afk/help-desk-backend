const Ticket = require('../models/Ticket');

// नवीन तिकीट तयार करणे
const createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;

    const ticket = await Ticket.create({
      subject,
      description,
      category,
      priority: priority || 'Medium',
      customer: req.user._id // ऑथेंटिकेटेड युजरची आयडी
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// डॅशबोर्डसाठी सर्व स्टॅटिस्टिक्स (काउंट्स) मिळवणे
const getDashboardStats = async (req, res) => {
  try {
    let query = {};
    
    // जर युजर कस्टमर असेल तर फक्त त्याच्याच तिकीट्स मोजा, 
    // पण जर Admin किंवा Agent असेल तर सर्वांचे मोजा
    if (req.user.role === 'Customer') {
      query.customer = req.user._id;
    }

    const totalTickets = await Ticket.countDocuments(query);
    const openTickets = await Ticket.countDocuments({ ...query, status: 'Open' });
    const inProgress = await Ticket.countDocuments({ ...query, status: 'In Progress' });
    const critical = await Ticket.countDocuments({ ...query, priority: 'Critical' });
    const resolved = await Ticket.countDocuments({ ...query, status: 'Resolved' });

    res.json({
      totalTickets,
      openTickets,
      inProgress,
      critical,
      resolved
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getDashboardStats
};