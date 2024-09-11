const express = require('express');
const router = express.Router();
const { addCollege, getColleges } = require('../controllers/collegeController');
const { authenticateJWT, adminOnly } = require('../middlewares/authMiddleware');

// Admin adds a new college
router.post('/', authenticateJWT, adminOnly, addCollege);

// Get all colleges (open to everyone, or restrict if needed)
router.get('/', getColleges);

module.exports = router;
