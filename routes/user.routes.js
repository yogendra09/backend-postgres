import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/user", isAuthenticated, userController.currentUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", isAuthenticated, userController.logout);

export default router;