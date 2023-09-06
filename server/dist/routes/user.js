"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../controllers/user.controller.js");
const requireUser_js_1 = require("../middlewares/requireUser.js");
const validateRequest_js_1 = require("../middlewares/validateRequest.js");
const user_schema_js_1 = require("../schemas/user.schema.js");
const user = express_1.default.Router();
user.route("/").get(requireUser_js_1.requireUser, user_controller_js_1.userQueryHandler);
user.post("/SignUp", (0, validateRequest_js_1.validateRequest)(user_schema_js_1.UserSchema), user_controller_js_1.signUpHandler);
user.post("/SignIn", (0, validateRequest_js_1.validateRequest)(user_schema_js_1.UserSignInSchema), user_controller_js_1.signInHandler);
user.get("/SignOut", requireUser_js_1.requireUser, user_controller_js_1.signOutHandler);
user.delete("/", requireUser_js_1.requireUser, user_controller_js_1.userDeactivateHandler);
user.patch("/", requireUser_js_1.requireUser, (0, validateRequest_js_1.validateRequest)(user_schema_js_1.UserUpdateSchema), user_controller_js_1.userUpdateHandler);
exports.default = user;
//# sourceMappingURL=user.js.map