const express = require('express');
const router = express.Router();
const { addSeminarHall, getSeminarHalls } = require('../controllers/seminarHallController');
const { authenticateJWT, adminOnly } = require('../middlewares/authMiddleware');

// Admin adds a seminar hall to a college
router.post('/:collegeId', authenticateJWT, adminOnly, addSeminarHall);

// Get all seminar halls under a specific college (open to everyone, or restrict if needed)
router.get('/:collegeId', getSeminarHalls);

module.exports = router;
