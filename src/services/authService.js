import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Signup
export const signup = async (email, password, username) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({ email, username, password: hashedPassword });
  return user;
};

// Login
export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  return user;
};

