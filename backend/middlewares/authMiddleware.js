import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
//if a person has a token , only then can he access the routes
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwtAccessToken;
    if (!token) {
      return res.status(401).json({
        message: "You are not logged In, Unauthorized!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized- User not found!" });
    }
    res.json(userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "admin") {
      return next();
    } else {
      return res.status(401).json({
        message: "Not authorized,only admins can access this route!",
      });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
