const mongoose = require('mongoose');

const seminarHallSchema = new mongoose.Schema({
    name: { type: String, required: true },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    capacity: { type: Number, required: true },
    amenities: [{ type: String }],
    pricePerHour: { type: Number, required: true },
    availability: [
        {
            date: { type: Date },
            timeSlots: [{ type: String }]  // Example: ["09:00-11:00", "11:00-13:00"]
        }
    ]
});

module.exports = mongoose.model('SeminarHall', seminarHallSchema);
