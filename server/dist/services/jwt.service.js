"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reIssueAccessToken = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const reIssueAccessToken = async ({ refreshToken, }) => {
    const { decoded } = (0, jwt_utils_1.verifyJWT)(refreshToken);
    if (!decoded) {
        return false;
    }
};
exports.reIssueAccessToken = reIssueAccessToken;
//# sourceMappingURL=jwt.service.js.map