import express from "express";
import {
  signupController,
  loginController,
  forgotPasswordController,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

export default router;
