// routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Định nghĩa route
// router.get('/', userController.getUsers);
// router.post('/', userController.createUser);

// module.exports = router;


// const mongoose = require('mongoose');


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên là bắt buộc']
  },
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);

