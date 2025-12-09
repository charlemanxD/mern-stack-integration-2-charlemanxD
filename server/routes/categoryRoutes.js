const express = require('express');
const router = express.Router();

// Post Controllers
const catergoryControllers = require('../controllers/categoryControllers');

// TODO - add Auth middleware when it is created for JWT token 

// 6.  @route GET /api/categories
// @desc Get all categories
router.get('/', catergoryControllers.getAllCategories);

// 7.  @route POST /api/categories
// @desc Create a new category
router.post('/', catergoryControllers.createCategory);

module.exports = router;