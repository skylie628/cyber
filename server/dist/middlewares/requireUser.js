"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const requireUser = (req, res, next) => {
    const user = res.locals?.user;
    if (!user)
        return res.status(403).send("Not authorized.");
    return next();
};
exports.requireUser = requireUser;
//# sourceMappingURL=requireUser.js.map