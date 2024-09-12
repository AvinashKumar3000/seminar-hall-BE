const College = require('../models/College');

// Add a new college
exports.addCollege = async (req, res) => {
    const { name, location } = req.body;

    try {
        const college = new College({ name, location, admins: [req.user.id] });
        await college.save();
        res.status(201).json(college);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

// Get all colleges
exports.getColleges = async (req, res) => {
    try {
        const colleges = await College.find().populate('admins').populate('seminarHalls');
        res.status(200).json(colleges);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};
