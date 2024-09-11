const express = require('express');
const router = express.Router();
const { bookSeminarHall, getStudentBookings } = require('../controllers/bookingController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

// Student books a seminar hall
router.post('/book', authenticateJWT, bookSeminarHall);

// Get all bookings for the authenticated student
router.get('/my-bookings', authenticateJWT, getStudentBookings);

module.exports = router;
