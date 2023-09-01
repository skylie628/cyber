"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserMongoSchema = new mongoose_1.default.Schema({
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    avatar: String,
}, {
    timestamps: true,
});
UserMongoSchema.pre('save', async function (next) {
    let user = this;
    if (user.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hashSync(user.password, salt);
    user.password = hash;
    return next();
});
UserMongoSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return await bcrypt_1.default.compare(candidatePassword, user.password).catch(e => { return false; });
};
//# sourceMappingURL=user.model.js.map