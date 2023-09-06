import { UserDocument, UserModel } from "../models/user.model.js";
import { DocumentDefinition } from "mongoose";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserUpdateType } from "../schemas/user.schema.js";
import { FilterQuery } from "mongoose";
import pgk, { filter } from "lodash";
import { string } from "zod";
import {
  ConfirmPasswordType,
  AvatarType,
  InfoType,
} from "../schemas/user.schema.js";
const createUser = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword" | "avatar">
  >
) => {
  try {
    const user = await UserModel.create(input);
    return pgk.omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};
const validatePassword = async ({
  _id,
  email,
  password,
}: {
  _id?: string;
  email?: string;
  password: string;
}) => {
  let user;
  if (_id) {
    user = await UserModel.findOne({ _id });
  } else {
    user = await UserModel.findOne({ email });
  }
  if (!user) return false;
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return pgk.omit(user.toJSON(), "password");
};

const findUser = async (
  query: FilterQuery<UserDocument>
): Promise<UserDocument> => {
  // using lean after find to optimize query
  return UserModel.findOne(query).lean();
};
const deactivateUser = async ({
  _id,
  password,
}: {
  _id: string;
  password: string;
}) => {
  const user = await validatePassword({ _id, password });
  if (!user) {
    return false;
  }
  await UserModel.deleteOne({ _id });
  return true;
};
const updateUser = async (
  data: Request<{}, {}, UserUpdateType["body"]>,
  rs: Response
) => {
  let user = await UserModel.findOne({ _id: rs.locals.user._id });
  if (!user) return rs.status(400).send("User not found.");
  if (data.query.type === "password") {
    const isValid = await bcrypt.compare(
      (data.body as ConfirmPasswordType["body"]).confirmPassword,
      user.password
    );
    if (!isValid) {
      return rs.status(401).send("Wrong confirmation password.");
    }
    user.password = (data.body as ConfirmPasswordType["body"]).newPassword;
  } else if (data.query.type === "avatar") {
    const base64Data = (data.body as AvatarType["body"]).avatar_url;
    user.avatar = base64Data!;
  } else {
    user.name = (data.body as InfoType["body"]).name!;
    user.email = (data.body as InfoType["body"]).email!;
  }
};
export { createUser, validatePassword, findUser, deactivateUser, updateUser };
