import { signup, login } from "../services/authService.js";

// Signup Controller
export const signupController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await signup(email, password, username);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// Login Controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.json({ success: true, user, token });
  } catch (err) {
    next(err);
  }
};

