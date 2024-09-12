const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    reg_id: { type: String, required: true, unique: true },
    contacts: { type: [{ type: String }], required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'student', 'master'], required: true },
    collegeId: { type: String, ref: 'College' },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] // For students
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password verification
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
