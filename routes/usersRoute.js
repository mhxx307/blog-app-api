const usersController = require("../controllers/usersController");

const router = require("express").Router();

router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
router.get("/:id", usersController.getUser);

module.exports = router;
