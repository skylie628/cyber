"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateHandler = exports.userQueryHandler = exports.userDeactivateHandler = exports.signOutHandler = exports.signInHandler = exports.signUpHandler = void 0;
const user_service_js_1 = require("../services/user.service.js");
const user_model_js_1 = require("../models/user.model.js");
const jwt_utils_js_1 = require("../utils/jwt.utils.js");
const lodash_1 = __importDefault(require("lodash"));
const signUpHandler = async (req, res) => {
    try {
        console.log("body la2", req.body);
        const user = await user_model_js_1.UserModel.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send(`User with email ${user.email} already exists`);
        // Create user
        const newUser = await (0, user_service_js_1.createUser)(req.body);
        const accessToken = (0, jwt_utils_js_1.signJWT)({ ...newUser }, { expiresIn: "15m" });
        const refreshToken = (0, jwt_utils_js_1.signJWT)({ ...newUser }, { expiresIn: "1y" });
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
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
exports.signUpHandler = signUpHandler;
const signInHandler = async (req, res) => {
    try {
        const user = await (0, user_service_js_1.validatePassword)(req.body);
        if (!user) {
            return res.status(400).send("invalid email or password");
        }
        const accessToken = (0, jwt_utils_js_1.signJWT)({ ...user, avatar: lodash_1.default }, { expiresIn: "15m" }); // 15mins
        const refreshToken = (0, jwt_utils_js_1.signJWT)({ ...user, avatar: lodash_1.default }, { expiresIn: "1y" }); //1 year
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
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
exports.signInHandler = signInHandler;
const signOutHandler = (req, res) => {
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
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
exports.signOutHandler = signOutHandler;
const userDeactivateHandler = async (req, res) => {
    try {
        const success = await (0, user_service_js_1.deactivateUser)({
            _id: res.locals.user._id,
            password: req.body.password,
        });
        if (!success)
            return res.status(401).send("Wrong confirmation password.");
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
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.userDeactivateHandler = userDeactivateHandler;
const userUpdateHandler = async (req, res) => {
    try {
        const rst = await (0, user_service_js_1.updateUser)(req, res);
        return rst;
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
exports.userUpdateHandler = userUpdateHandler;
const userQueryHandler = async (req, res) => {
    try {
        const user = await user_model_js_1.UserModel.findOne({ _id: res.locals.user._id });
        if (!user)
            return res.status(404).send("User not found.");
        return res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.userQueryHandler = userQueryHandler;
//# sourceMappingURL=user.controller.js.map