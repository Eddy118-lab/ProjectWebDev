const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 25,
        maxlength: 255
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilePicture: {
        type: String,
        default: 'https://example.com/default-profile-pic.png'
    },
    bio: {
        type: String,
        maxlength: 160
    },
    dateOfBirth: {
        type: Date
    },
    location: {
        city: { type: String, maxlength: 100 },
        country: { type: String, maxlength: 100 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para actualizar `updatedAt`
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);
