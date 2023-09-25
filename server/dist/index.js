"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const urls_js_1 = __importDefault(require("./config/urls.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const show_js_1 = __importDefault(require("./routes/show.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const deserializeUser_js_1 = __importDefault(require("./middlewares/deserializeUser.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(urls_js_1.default.mongo)
    .then(() => {
    try {
        app.listen(urls_js_1.default.port, () => {
            console.log(`[server]: Server is running at http://localhost:${urls_js_1.default.port}`);
        });
    }
    catch (e) {
        console.log("Can't connect to the server. " + e.message);
    }
})
    .catch((e) => {
    console.log("err is ", e.message);
});
app.use(express_1.default.json({ limit: "30mb" }));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
    origin: process.env.CLIENT,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(deserializeUser_js_1.default);
// ROUTES
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/show", show_js_1.default);
//# sourceMappingURL=index.js.map