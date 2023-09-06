import express from "express";
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
  userDeactivateHandler,
  userQueryHandler,
  userUpdateHandler,
} from "../controllers/user.controller.js";
import { requireUser } from "../middlewares/requireUser.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  UserSchema,
  UserSignInSchema,
  UserUpdateSchema,
} from "../schemas/user.schema.js";
const user = express.Router();
user.route("/").get(requireUser, userQueryHandler);
user.post("/SignUp", validateRequest(UserSchema), signUpHandler);
user.post("/SignIn", validateRequest(UserSignInSchema), signInHandler);
user.get("/SignOut", requireUser, signOutHandler);

user.delete("/", requireUser, userDeactivateHandler);

user.patch(
  "/",
  requireUser,
  validateRequest(UserUpdateSchema),
  userUpdateHandler
);

export default user;
