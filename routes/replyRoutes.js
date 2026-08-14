const express = require('express');
const router = express.Router();
const { addReply, getTicketReplies } = require('../controllers/replyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:id')
  .get(protect, getTicketReplies)
  .post(protect, addReply);

module.exports = router;