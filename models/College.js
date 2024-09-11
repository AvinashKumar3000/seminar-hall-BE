const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Admins managing this college
    seminarHalls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SeminarHall' }]
});

module.exports = mongoose.model('College', collegeSchema);
