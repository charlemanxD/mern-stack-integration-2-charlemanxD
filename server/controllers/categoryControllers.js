const Category = require('../models/Category');

// 1. @route GET /api/categories
// @desc Get all categories
// Access Public (Does not  Require JWT TOKEN)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        if (!categories) {
            return res.status(404).json({ msg: 'No category found.' });
        }

        // Backend response to frontend if Get category successfull
        res.json(categories)
    } catch (error) {
        // Console log if Get all categories FAILS
        console.error('Error fetching categories:', error.message);

        // Backend response to frontend if  Get all categories FAILS
        res.status(500).json({ msg: 'Server error. Could not fetch all categories. Try again later' });
    }
};

// 2.  @route POST /api/categories
// @desc Create a new category
// Access Private (Require JWT TOKEN & Auth Middleware)
exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name });
        // Save category
        const savedCategory = await newCategory.save();

        // Backend resposne to Frontend with new category
        res.status(200).json(savedCategory);
    } catch (error) {
        // Console log if Post creation FAILS
        console.error('Error creating new a category:', error.message);
        //Backend response to  Frontend, if Post creation FAILS
        res.status(500).send('Server error. Could not create a new category');
    }
};

