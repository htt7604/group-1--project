// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa route
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;
