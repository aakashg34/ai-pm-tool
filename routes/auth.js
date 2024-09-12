const express = require('express');
// const { registerUser, loginUser } = require('../controller/authController');
const { registerUser, loginUser } = require('../controller/authcontroller');
// equire('../controller/authController');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
