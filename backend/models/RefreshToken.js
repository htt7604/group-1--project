// const mongoose = require('mongoose');

// const refreshTokenSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   token: { type: String, required: true, unique: true },
//   expiresAt: { type: Date, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('RefreshToken', refreshTokenSchema);

// backend/models/RefreshToken.js
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);