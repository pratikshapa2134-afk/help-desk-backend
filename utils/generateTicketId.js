// Generate unique Ticket ID e.g. TICK-584920
const generateTicketId = () => {
    return 'TICK-' + Math.floor(100000 + Math.random() * 900000);
  };
  
  module.exports = generateTicketId;