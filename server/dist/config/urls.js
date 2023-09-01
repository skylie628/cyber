"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5000,
    mongo: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@muvize.vmwoe7d.mongodb.net/?retryWrites=true&w=majority`
};
//# sourceMappingURL=urls.js.map