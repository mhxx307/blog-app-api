const usersController = require("../controllers/usersController");

const router = required("express").Router();

router.get("/update", usersController.updateUser);

module.exports = router;
