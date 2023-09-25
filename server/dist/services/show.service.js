"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findShow = exports.deleteShow = exports.findShowOrShows = exports.updateShow = exports.createShow = void 0;
const show_model_1 = require("../models/show.model");
const createShow = async (input) => {
    return show_model_1.ShowModel.create(input);
};
exports.createShow = createShow;
const findShow = async (query, options = { lean: true }) => {
    return show_model_1.ShowModel.findOne(query, {}, options);
};
exports.findShow = findShow;
const findShowOrShows = async (query, options = { lean: true }) => {
    return show_model_1.ShowModel.find(query, {}, options);
};
exports.findShowOrShows = findShowOrShows;
const updateShow = async (query, update, options) => {
    return show_model_1.ShowModel.findOneAndUpdate(query, update, options);
};
exports.updateShow = updateShow;
const deleteShow = async (query) => {
    return show_model_1.ShowModel.deleteOne(query);
};
exports.deleteShow = deleteShow;
//# sourceMappingURL=show.service.js.map