const SeminarHall = require('../models/SeminarHall');

// Add a seminar hall to a college
exports.addSeminarHall = async (req, res) => {
    const { name, capacity, amenities, availability } = req.body;
    const collegeId = req.params.collegeId;

    try {
        const seminarHall = new SeminarHall({
            name,
            capacity,
            amenities,
            availability,
            collegeId
        });

        await seminarHall.save();
        res.status(201).json(seminarHall);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

// Get seminar halls by college
exports.getSeminarHalls = async (req, res) => {
    const collegeId = req.params.collegeId;

    try {
        const seminarHalls = await SeminarHall.find({ collegeId });
        res.status(200).json(seminarHalls);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};
