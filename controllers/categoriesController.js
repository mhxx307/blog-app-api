const Category = require("../models/Category");

const categoriesController = {
    createCategory: async (req, res) => {
        const newCategory = new Category(req.body);
        try {
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = categoriesController;
