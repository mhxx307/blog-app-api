const postsController = require("../controllers/postsController");

const router = require("express").Router();

// CREATE POST
router.post("/", postsController.createPost);

// UPDATE POST
router.put("/:id", postsController.updatePost);

// DELETE POST
router.delete("/:id", postsController.deletePost);

// GET POST
router.get("/:id", postsController.getPost);

// GET ALL POSTS
router.get("/", postsController.getAllPosts);

module.exports = router;
