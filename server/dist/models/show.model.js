"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ShowSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    title: String,
    name: String,
    poster_path: String,
    backdrop_path: String,
    media_type: String,
    season_number: Number,
    id: { type: String, required: true },
    status: String,
    isFavorited: Boolean,
    score: Number,
}, {
    timestamps: true,
});
const ShowModel = mongoose_1.default.model("Show", ShowSchema);
exports.ShowModel = ShowModel;
//# sourceMappingURL=show.model.js.map