const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Signup User
exports.signup = async (req, res) => {
    const { name, email, reg_id, contacts, password, collegeId, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, reg_id, contacts, password, collegeId, role });
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};
