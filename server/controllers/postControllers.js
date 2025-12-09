const Post = require('../models/Post');

// 1.  @route GET /api/posts
// @desc Fetch/Get all blog posts
// Access Public (Does not  Require JWT TOKEN)
exports.getAllPosts = async (req, res) => {
    try {
        // Fetch all posts, sorted in descending order(Newest - oldest)
        const posts = await Post.find({})
                        .sort({ createdAt: -1 });

        // Backend response to Frontend with 'All Posts'
        res.json(posts);
    } catch (error) {
        // Console log if Get all posts FAILS
        console.error('Error getting all posts:', error.message);
        // Backend response to Frondent if Get all posts FAILS
        res.status(500).send('Server error. Could not retrieve posts.');
    }
};

// 2.  @route GET /api/posts/:id
// @desc Fetch/Get a specific blog post
// Access Public (Does not  Require JWT TOKEN)
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
        return res.status(404).json({ msg: 'Post not found.' });
        }
        // Backend response to Frontend with 'Post'
        res.json(post);

    } catch (error) {
        // Console log if post does not exist
        console.error('Error fetching this post:', error.message);

        // response if id isInvalid
        if (error.kind === 'objectId') {
            res.status(500).json('Server error. Could not retrieve the post.')
        }
    }
};


// 3. @route POST /api/posts
// @desc Create a new post
// Access Private (Require JWT TOKEN & Auth Middleware)
exports.createPost = async (req, res) => { 
    const { title, content, featuredImage, slug, excerpt, 
        author, category, tags, viewCount } = req.body; // Get data from request body

    try {
        // Post creation
        const newPost = new Post({ 
            title,
            content,
            featuredImage,
            slug,
            excerpt,
            author,
            category,
            tags,
            viewCount,
        });

        const savedPost = await newPost.save(); // Save new Post to DB

        // Backend response to FrontEnd with newPost data
        res.status(201).json({
            id: savedPost._id,
            title: savedPost.title,
            content: savedPost.content,
            image: savedPost.featuredImage,
            slug: savedPost.slug,
            excerpt: savedPost.excerpt,
            poster: savedPost.author,
            category: savedPost.category,
            tags: savedPost.tags,
            viewCount: savedPost.viewCount
        });

    } catch (error) {
        // Console log if Post creation FAILS
        console.error('Error creating new post:', error.message);
        //Backend respnse to  Frontend, if Post creation FAILS
        res.status(500).send('Server error. Could not create new Post.');
    }
};

// 4.  @route PUT /api/posts/:id
// @desc Update an existing blog post
// Access Private (Require JWT TOKEN & Auth Middleware)
exports.updatePostById = async (req, res) => {
    try {
        const { id } =req.params; // Get post ID from URL parameters
        const updates = req.body; // Get updated data from request body

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ mgs: 'No post to be updated found.' });
        }

        // Backend response to Frontend with 'updated Post'
        res.status(200).json(updatedPost);
        
    } catch (error) {
        // Console log if Post update FAILS
        console.error('Error updating post:', error.message);

        // Backend response to frontend if post update FAILS
        res.status(500).json({ msg: 'Server error. Could not update the post.' });
    }
}

// 5.  @route DELETE /api/posts/:id
// @desc Delete a blog post
// Access Private (Require JWT TOKEN & Auth Middleware)
exports.deletePostById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ msg: 'No post to be deleted found.' });
        }

        // Backend response to Frontend if deletion successful
        res.status(204).json({ msg: `${deletedPost} deleted successfully`});
    } catch (error) {
        // Console log if Post deletion FAILS
        console.error('Error deleting post:', error.message);

        // Backend response to frontend if post deletion FAILS
        res.status(500).send({ msg: 'Server error. Could not delete the post. Try again later.' });
    }

};