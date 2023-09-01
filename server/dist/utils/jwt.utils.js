"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const private_key = process.env.PRIVATE_KEY;
const public_key = process.env.PUBLIC_KEY;
const signJWT = (object, options) => {
    return jsonwebtoken_1.default.sign(object, private_key, {
        ...(options && options),
        algorithm: 'RS256'
    });
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, public_key);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        };
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.utils.js.map