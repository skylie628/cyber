"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_service_js_1 = require("../services/jwt.service.js");
const jwt_utils_js_1 = require("../utils/jwt.utils.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const deserializeUser = async (req, res, next) => {
    const accessToken = req?.cookies?.accessToken;
    const refreshToken = req?.cookies?.refreshToken;
    if (!accessToken)
        return next();
    const { decoded, expired } = (0, jwt_utils_js_1.verifyJWT)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await (0, jwt_service_js_1.reIssueAccessToken)(refreshToken);
        if (newAccessToken) {
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                domain: process.env.DOMAIN,
            });
            const { decoded } = (0, jwt_utils_js_1.verifyJWT)(newAccessToken);
            res.locals.user = decoded;
            return next();
        }
    }
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
    return res.status(404).send("Invalid access token or refresh token");
};
exports.default = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map