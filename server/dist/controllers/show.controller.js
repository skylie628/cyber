"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultipleShowsHandler = exports.getShowHandler = exports.deleteShowHandler = exports.updateShowHandler = void 0;
const show_service_js_1 = require("../services/show.service.js");
const updateShowHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const update = req.body;
        let show = await (0, show_service_js_1.findShow)({ user, id });
        if (!show) {
            show = await (0, show_service_js_1.createShow)({ ...update, user, id });
            return res.send(show);
        }
        show = await (0, show_service_js_1.updateShow)({ user, id }, update, { new: true });
        return res.send(show);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.updateShowHandler = updateShowHandler;
const getShowHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const show = (0, show_service_js_1.findShow)({ user, id });
        if (!show) {
            return res.status(404).send(`Show with id ${id} not found.`);
        }
        return res.send(show);
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
exports.getShowHandler = getShowHandler;
const getMultipleShowsHandler = (req, res) => {
    try {
        const user = res.locals.user._id;
        const shows = (0, show_service_js_1.findShowOrShows)({ user });
        if (!shows) {
            res.status(404).send("No show found.");
        }
        res.send(shows);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
exports.getMultipleShowsHandler = getMultipleShowsHandler;
const deleteShowHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const rst = await (0, show_service_js_1.deleteShow)({ user, id });
        if (rst) {
            res.send("Delete successfully.");
        }
        else {
            res.status(404).send("show not found");
        }
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
};
exports.deleteShowHandler = deleteShowHandler;
//# sourceMappingURL=show.controller.js.map