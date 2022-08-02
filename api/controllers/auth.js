import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";
export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      // username: req.body.username,
      // email: req.body.email,
      ...req.body,
      password: hash,

    });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // return next(createError(404, "User not found!"));
      res.status(404).json("User not found!");
      return;
    }
    const isPasswordCor = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCor) {
      //   return next(createError(400, "Wrong password or username!"));
      res.status(400).json("Invalid username or password!");
      return;
    }
    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},"sdfsdf")
    const { password, isAdmin, ...otherDeatails } = user._doc;
    res.cookie("access_token",token,{
        httpOnly:true,
    }).status(200).json({details:{ ...otherDeatails},isAdmin });
  } catch (err) {
    next(err);
  }
};
