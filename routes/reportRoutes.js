const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/stats').get(protect, authorize('Super Admin'), getDashboardStats);

module.exports = router;