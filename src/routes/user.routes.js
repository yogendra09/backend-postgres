const router = require("express").Router();
const { authenticate } = require("../middlewares/authenticate.js");
const userController = require("../controllers/user.controller.js");

router.post("/user", authenticate, userController.currentUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", authenticate, userController.logout);

module.exports = router;