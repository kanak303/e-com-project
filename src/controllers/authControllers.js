import jwt from "jsonwebtoken";
import { signup, login } from "../services/authService.js";

// Helper token
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

// Signup Controller
export const signupController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await signup(email, password, username);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

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

// Login Controller
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
