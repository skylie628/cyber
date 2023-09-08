"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deactivateUser = exports.findUser = exports.validatePassword = exports.createUser = void 0;
const user_model_js_1 = require("../models/user.model.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const createUser = async (input) => {
    try {
        console.log(input);
        const user = await user_model_js_1.UserModel.create(input);
        return lodash_1.default.omit(user.toJSON(), "password");
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.createUser = createUser;
const validatePassword = async ({ _id, email, password, }) => {
    let user;
    if (_id) {
        user = await user_model_js_1.UserModel.findOne({ _id });
    }
    else {
        user = await user_model_js_1.UserModel.findOne({ email });
    }
    if (!user)
        return false;
    const isValid = await user.comparePassword(password);
    console.log(user, "  ", isValid);
    if (!isValid)
        return false;
    return lodash_1.default.omit(user.toJSON(), "password");
};
exports.validatePassword = validatePassword;
const findUser = async (query) => {
    // using lean after find to optimize query
    return user_model_js_1.UserModel.findOne(query).lean();
};
exports.findUser = findUser;
const deactivateUser = async ({ _id, password, }) => {
    const user = await validatePassword({ _id, password });
    if (!user) {
        return false;
    }
    await user_model_js_1.UserModel.deleteOne({ _id });
    return true;
};
exports.deactivateUser = deactivateUser;
const updateUser = async (data, rs) => {
    let user = await user_model_js_1.UserModel.findOne({ _id: rs.locals.user._id });
    if (!user)
        return rs.status(400).send("User not found.");
    if (data.query.type === "password") {
        const isValid = await bcrypt_1.default.compare(data.body.passwordConfirmation, user.password);
        if (!isValid) {
            return rs.status(401).send("Wrong confirmation password.");
        }
        user.password = data.body.newPassword;
    }
    else if (data.query.type === "avatar") {
        const base64Data = data.body.avatar_url;
        user.avatar = base64Data;
    }
    else {
        user.name = data.body.name;
        user.email = data.body.email;
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.service.js.map