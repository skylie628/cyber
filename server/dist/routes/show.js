"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const show_controller_js_1 = require("../controllers/show.controller.js");
const requireUser_js_1 = require("../middlewares/requireUser.js");
const validateRequest_js_1 = require("../middlewares/validateRequest.js");
const show_schema_js_1 = require("../schemas/show.schema.js");
const router = express_1.default.Router();
router
    .route("/:id")
    .get(requireUser_js_1.requireUser, (0, validateRequest_js_1.validateRequest)(show_schema_js_1.ShowGetSchema), show_controller_js_1.getShowHandler);
router.route("/").get(requireUser_js_1.requireUser, show_controller_js_1.getMultipleShowsHandler);
router.put("/:id", requireUser_js_1.requireUser, (0, validateRequest_js_1.validateRequest)(show_schema_js_1.ShowUpdateSchema), show_controller_js_1.updateShowHandler);
router.delete("/:id", requireUser_js_1.requireUser, (0, validateRequest_js_1.validateRequest)(show_schema_js_1.ShowDeleteSchema), show_controller_js_1.deleteShowHandler);
exports.default = router;
//# sourceMappingURL=show.js.map