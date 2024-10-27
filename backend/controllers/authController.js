import { encryptPassword, User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

const setCookies = async (res, token) => {
  res.cookie("jwtAccessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    sameSite: "None",
  }); // storing cookie
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exists!",
      });
    }

    const encrypedPassword = await encryptPassword(password);

    user = await User.create({ name, email, password: encrypedPassword });

    //generate token
    const token = await generateToken(user._id);
    //store in cookie
    setCookies(res, token);

    res.status(200).json({
      message: "Created Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found!",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Email or password!",
      });
    }
    //generate token
    const token = await generateToken(user._id);

    //set cookie
    setCookies(res, token);

    res.status(200).json({
      message: "Logged In Successfully!",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwtAccessToken");
    res.status(200).json({
      message: "Logged Out Successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(401);
  }
};
