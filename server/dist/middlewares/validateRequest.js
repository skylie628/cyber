"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    console.log("validate");
    return (rq, rs, next) => {
        try {
            schema.parse({
                body: rq.body,
                query: rq.query,
                params: rq.params,
            });
            next();
        }
        catch (e) {
            return rs.status(400).json({
                message: "Incorrect form inputs",
                errors: e.errors,
            });
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map