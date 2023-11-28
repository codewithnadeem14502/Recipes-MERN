import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModal } from "../models/users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  const useremail = await UserModal.findOne({ email });
  const userusername = await UserModal.findOne({ username });
  if (useremail) {
    return res.json({ message: "Email already exists" });
  }
  if (userusername) {
    return res.json({ message: "Username already exists" });
  }
  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = new UserModal({ email, username, password: hashpassword });
  await newUser.save();

  res.json({ message: "User Registered Sucessfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModal.findOne({ username });

  if (!user) {
    return res.json({ message: "User Don't Exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, userID: user._id, message: "Login Sucessfully" });
});

export { router as userRouter };
