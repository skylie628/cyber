import {
  AvatarType,
  ConfirmPasswordType,
  InfoType,
  UserDeactivateType,
  UserSignInType,
  UserType,
  UserUpdateType,
} from "../schemas/user.schema.js";
import {
  createUser,
  deactivateUser,
  findUser,
  validatePassword,
  updateUser,
} from "../services/user.service.js";
import { Request, Response } from "express";
import { UserDocument, UserModel } from "../models/user.model.js";
import { signJWT, verifyJWT } from "../utils/jwt.utils.js";
import _ from "lodash";
import { Types } from "mongoose";
import bcrypt from "bcrypt";

const signUpHandler = async (
  req: Request<{}, {}, UserType["body"]>,
  res: Response
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send(`User with email ${user.email} already exists`);
    // Create user
    const newUser = await createUser(req.body);
    const accessToken = signJWT({ ...newUser }, { expiresIn: "15m" });
    const refreshToken = signJWT({ ...newUser }, { expiresIn: "1y" });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    return res.send(newUser);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};

const signInHandler = async (
  req: Request<{}, {}, UserSignInType["body"]>,
  res: Response
) => {
  try {
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(400).send("invalid email or password");
    }
    const accessToken = signJWT({ ...user, avatar: _ }, { expiresIn: "15m" }); // 15mins
    const refreshToken = signJWT({ ...user, avatar: _ }, { expiresIn: "1y" }); //1 year
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    return res.status(200).send(user);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};

const signOutHandler = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    return res.send("Sign out successfully.");
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};
const userDeactivateHandler = async (
  req: Request<{}, {}, UserDeactivateType["body"]>,
  res: Response
) => {
  try {
    const success = await deactivateUser({
      _id: res.locals.user._id,
      password: req.body.password,
    });
    if (!success) return res.status(401).send("Wrong confirmation password.");
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      //maxAge: 1000000,
      //signed: true
      domain: process.env.DOMAIN,
    });
    return res.send("Deactivate user successfully.");
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
const userUpdateHandler = async (
  req: Request<{}, {}, UserUpdateType["body"]>,
  res: Response
) => {
  try {
    const rst = await updateUser(req, res);
    return rst;
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};
const userQueryHandler = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: res.locals.user._id });
    if (!user) return res.status(404).send("User not found.");
    return res.status(200).send(user);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
export {
  signUpHandler,
  signInHandler,
  signOutHandler,
  userDeactivateHandler,
  userQueryHandler,
  userUpdateHandler,
};
