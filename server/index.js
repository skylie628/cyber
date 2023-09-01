"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const urls_js_1 = __importDefault(require("./config/urls.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(urls_js_1.default.mongo)
    .then(() => {
    try {
        app.listen(urls_js_1.default.port, () => {
            console.log(`[server]: Server is running at http://localhost:${urls_js_1.default.port}`);
        });
    }
    catch (e) {
        console.log("Can't connect to the server. " + e.message);
    }
});
