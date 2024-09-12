const Booking = require('../models/Booking');
const SeminarHall = require('../models/SeminarHall');

// Book a seminar hall
exports.bookSeminarHall = async (req, res) => {
    const { seminarHallId, date, timeSlot } = req.body;
    const studentId = req.user.id;

    try {
        // Ensure the seminar hall is available
        const seminarHall = await SeminarHall.findById(seminarHallId);

        const booking = new Booking({
            studentId,
            seminarHallId,
            collegeId: seminarHall.collegeId,
            date,
            timeSlot,
            status: 'pending'
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

// Get bookings for a student
exports.getStudentBookings = async (req, res) => {
    const studentId = req.user.id;

    try {
        const bookings = await Booking.find({ studentId }).populate('seminarHallId');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};
