const categoriesController = require("../controllers/categoriesController");

const router = require("express").Router();

router.post("/", categoriesController.createCategory);
router.get("/", categoriesController.getAllCategories);

module.exports = router;
