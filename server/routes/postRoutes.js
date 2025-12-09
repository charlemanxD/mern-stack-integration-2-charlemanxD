const express = require('express');
const router = express.Router();

// Post Controllers
const { getAllPosts, getPostById, createPost, 
    updatePostById, deletePostById } = require('../controllers/postControllers');

// TODO - add Auth middleware when it is created for JWT token 

// -------------- Post Routes --------------

// 1. @route GET /api/posts
// @desc FETCH all the posts (Main feed)
router.get('/', getAllPosts);

// 2.  @route GET /api/posts/:id
// @desc Fetch/Get a specific blog post
router.get('/', getPostById);

// 3. @route POST /api/posts
// @desc CREATE a new post
router.post('/', createPost);

// 4.  @route PUT /api/posts/:id
// @desc Update an existing blog post
router.put('/', updatePostById);

// 5.  @route DELETE /api/posts/:id
// @desc Delete a blog post
router.delete('/', deletePostById);


module.exports = router;