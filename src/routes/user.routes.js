import express from "express";
import { auth } from "../middlewares/auth.js";
import { createUser, validateUser, updateUserData } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", validateUser);
router.post("/register", createUser);
router.post("/update/:userId", auth, updateUserData);

const userRoutes = router;

export default userRoutes;
