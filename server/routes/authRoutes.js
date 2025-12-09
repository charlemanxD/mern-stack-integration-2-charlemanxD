const express = require('express');
const router = express.Router();

// Auth Controllers
const { registerUser } = require('../controllers/authController');

// -------------- Auth Routes --------------

// 1.  @route POST /api/auth/register
// @desc REGISTER a new user
router.post('/register', registerUser);

// 2.  @route POST /api/auth/login
// @desc LOGIN a user
// router.post('/login', authControllers.loginUser);

module.exports = router;