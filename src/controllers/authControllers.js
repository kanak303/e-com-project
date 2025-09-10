import jwt from "jsonwebtoken";
import { signup, login } from "../services/authService.js";
import { sendTemplateMail } from "../utils/utilsEmail.js";
import User from "../models/userModel.js";

// Helper tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET || "refreshSecret123",
    { expiresIn: "7d" }
  );
};

// Signup
export const signupController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await signup(email, password, username);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log("nodemailer is working");

    // Send welcome email
    await sendTemplateMail(user.email, "welcome", {
      username: user.username,
      subject: "Welcome to ShopEasy ",
    });

    res.status(201).json({
      success: true,
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// Login
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      success: true,
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// Forgot Password
export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "resetSecret",
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log('user.email', user.email)
    // Send reset password email
    await sendTemplateMail(user.email, "resetPassword", {
      username: user.username,
      subject: "Reset Your Password ",
      resetLink,
    });

  
    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (err) {
    next(err);
  }
};
