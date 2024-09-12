const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { masterOnly } = require('../middlewares/authMiddleware');

// Signup route
router.post('/signup', signup);

router.post('/createAdmin', masterOnly, signup);

// Login route
router.post('/login', login);

module.exports = router;
