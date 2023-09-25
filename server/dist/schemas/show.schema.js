"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowGetSchema = exports.ShowUpdateSchema = exports.ShowDeleteSchema = exports.ShowSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: zod_1.z.object({
        user: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        poster_path: zod_1.z.string().optional(),
        backdrop_path: zod_1.z.string().optional(),
        media_type: zod_1.z.string().optional(),
        season_number: zod_1.z.number().optional(),
        id: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        isFavorited: zod_1.z.boolean().optional(),
        score: zod_1.z.number().optional(),
    }),
};
const params = {
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Item Id is required" }),
    }),
};
const ShowSchema = zod_1.z.object({
    ...payload,
});
exports.ShowSchema = ShowSchema;
const ShowGetSchema = zod_1.z.object({
    ...params,
});
exports.ShowGetSchema = ShowGetSchema;
const ShowDeleteSchema = zod_1.z.object({
    ...params,
});
exports.ShowDeleteSchema = ShowDeleteSchema;
const ShowUpdateSchema = zod_1.z.object({
    ...payload,
    ...params,
});
exports.ShowUpdateSchema = ShowUpdateSchema;
//# sourceMappingURL=show.schema.js.map