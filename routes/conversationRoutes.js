const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addReply, getConversation } = require('../controllers/conversationController');

router.post('/reply', auth, addReply);
router.get('/:ticketId', auth, getConversation);

module.exports = router;