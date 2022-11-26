const Post = require("../models/Post");
const User = require("../models/User");

const postsController = {
    createPost: async (req, res) => {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updatePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(500).json(updatedPost);
            } else {
                res.status(401).json("You can update only your post");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deletePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                await post.delete();
                res.status(500).json("Post has been deleted");
            } else {
                res.status(401).json("You can delete only your post");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllPosts: async (req, res) => {
        const username = req.query.user;
        const categoryName = req.query.cat;
        try {
            let posts;
            if (username) {
                posts = await Post.find({ username });
            } else if (categoryName) {
                posts = await Post.find({
                    categories: {
                        $in: [categoryName],
                    },
                });
            } else {
                posts = await Post.find();
            }
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = postsController;
