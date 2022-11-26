const router = require("express").Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
