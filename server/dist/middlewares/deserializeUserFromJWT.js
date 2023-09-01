"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_js_1 = require("../utils/jwt.utils.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const deserializeUserFromJWT = async (req, res, next) => {
    const accessToken = req?.cookies?.accessToken;
    const refreshToken = req?.cookies?.refreshToken;
    if (!accessToken)
        return next();
    const { decoded, expired } = (0, jwt_utils_js_1.verifyJWT)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
};
exports.default = deserializeUserFromJWT;
//# sourceMappingURL=deserializeUserFromJWT.js.map